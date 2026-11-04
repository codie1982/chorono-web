import assert from 'node:assert/strict'

const origin = (process.argv[2] ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalOrigin = 'https://www.chorono.com'
const blogSlugs = ['make-animations-with-claude', 'make-animations-with-codex', 'animation-prompts-for-claude-and-codex']
const pages = ['/', '/getting-started', '/agent-skills', '/blog', ...blogSlugs.map(slug => `/blog/${slug}`)]
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]))

async function fetchChecked(path, type) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(20000) })
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`)
  assert.match(response.headers.get('content-type') ?? '', type, `${path}: incorrect content type`)
  return response
}

for (const path of pages) {
  const html = await (await fetchChecked(path, /text\/html/)).text()
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag))
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag))
  const expected = new URL(path, canonicalOrigin).href
  const isPost = path.startsWith('/blog/')
  const isHub = path === '/blog'
  const guideImage = path === '/' || isHub ? '/opengraph-image.png' : isPost ? `${path}.png` : `/guides${path}.png`
  assert.equal(new URL(links.find(link => link.rel === 'canonical')?.href).href, expected, `${path}: canonical`)
  assert.equal(new URL(metas.find(meta => meta.property === 'og:url')?.content).href, expected, `${path}: Open Graph URL`)
  assert.equal(metas.find(meta => meta.property === 'og:image')?.content, `${canonicalOrigin}${guideImage}`)
  assert.equal(metas.find(meta => meta.name === 'twitter:image')?.content, `${canonicalOrigin}${guideImage}`)
  assert.ok(metas.find(meta => meta.name === 'description')?.content.length > 80, `${path}: description`)
  assert.ok(!metas.some(meta => meta.name === 'robots' && meta.content.includes('noindex')), `${path}: unexpectedly noindex`)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: expected one main heading`)
  assert.ok(links.some(link => link.rel === 'icon' && link.href.startsWith('/favicon.ico')), `${path}: ICO link`)
  assert.ok(links.some(link => link.rel === 'icon' && link.href === '/icon.svg'), `${path}: SVG link`)
  assert.ok(links.some(link => link.rel === 'apple-touch-icon'), `${path}: Apple icon link`)
  assert.ok(links.some(link => link.rel === 'manifest'), `${path}: manifest link`)
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  assert.equal(scripts.length, 1, `${path}: expected one page-specific JSON-LD graph`)
  const schema = JSON.parse(scripts[0][1])
  assert.equal(schema['@context'], 'https://schema.org')
  assert.ok(schema['@graph'].some(item => item['@type'] === 'WebSite'))
  assert.ok(schema['@graph'].some(item => item['@type'] === 'SoftwareApplication'))
  const entities = new Map(schema['@graph'].map(item => [item['@id'], item]))
  assert.equal(entities.size, schema['@graph'].length, `${path}: duplicate entity IDs`)
  function checkReferences(value) {
    if (!value || typeof value !== 'object') return
    if (value['@id']) assert.ok(entities.has(value['@id']), `${path}: unresolved entity ${value['@id']}`)
    for (const child of Object.values(value)) {
      if (Array.isArray(child)) child.forEach(checkReferences)
      else checkReferences(child)
    }
  }
  schema['@graph'].forEach(checkReferences)
  const editor = entities.get(`${canonicalOrigin}/#software`)
  const runtime = entities.get(`${canonicalOrigin}/#runtime`)
  assert.ok(editor, 'Editor entity must exist')
  const webpage = entities.get(`${expected}#webpage`)
  assert.equal(webpage?.url, expected, `${path}: page-specific URL`)
  assert.equal(webpage.description, metas.find(meta => meta.name === 'description')?.content)
  assert.equal(entities.get(webpage.isPartOf['@id'])['@type'], 'WebSite')
  if (path === '/') {
    assert.ok(runtime && editor['@id'] !== runtime['@id'], 'Editor and runtime must remain distinct entities')
    assert.equal(runtime.name, '@chorono/runtime')
    assert.equal(runtime.installUrl, 'https://www.npmjs.com/package/@chorono/runtime')
    assert.ok(runtime.sameAs.includes('https://github.com/codie1982/chorono-runtime'))
    assert.equal(entities.get(webpage.mainEntity['@id'])['@type'], 'SoftwareApplication')
    assert.ok(!schema['@graph'].some(item => item['@type'] === 'TechArticle'))
    assert.ok(html.includes('ChronoPlayer, CanvasRenderAdapter') && !html.includes('ChoronoPlayer'), 'Runtime example must use the actual package API')
    assert.ok(html.includes('id="team"'), 'Author profile anchor must exist')
  } else if (isHub) {
    assert.equal(webpage['@type'], 'CollectionPage')
    assert.equal(runtime, undefined)
    const index = entities.get(webpage.mainEntity['@id'])
    assert.equal(index['@type'], 'ItemList')
    assert.equal(index.itemListElement.length, 3)
    assert.ok(!schema['@graph'].some(item => item['@type'] === 'BlogPosting'), 'Hub must describe its collection')
    for (const slug of blogSlugs) assert.ok(html.includes(`href="/blog/${slug}"`), `Hub must link to ${slug}`)
  } else {
    assert.equal(runtime, undefined, 'Runtime product belongs to its visible homepage section')
    const article = entities.get(webpage.mainEntity['@id'])
    assert.equal(article['@type'], isPost ? 'BlogPosting' : 'TechArticle')
    assert.equal(article.headline, decode(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)[1].replace(/<[^>]+>/g, '')))
    assert.deepEqual(article.articleSection, [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gs)].map(match => decode(match[1].replace(/<[^>]+>/g, ''))))
    if (isPost) {
      assert.match(article.datePublished, /^2026-11-04T\d{2}:\d{2}:\d{2}Z$/)
      assert.ok(Number.isFinite(Date.parse(article.datePublished)), 'Publication timestamp must be valid')
      assert.equal(article.dateModified, article.datePublished)
      assert.ok(html.includes(`<time dateTime="${article.datePublished}">`) || html.includes(`<time datetime="${article.datePublished}">`), `${path}: visible publication date`)
      assert.equal(metas.find(meta => meta.property === 'og:type')?.content, 'article')
      assert.equal(entities.get(article.isPartOf['@id'])['@type'], 'Blog')
      assert.ok(html.includes('aria-label="In this article"'))
      for (const slug of blogSlugs) if (path !== `/blog/${slug}`) assert.ok(html.includes(`href="/blog/${slug}"`), `${path}: related article ${slug}`)
    } else assert.ok(article.dependencies.length > 20)
    const author = entities.get(article.author['@id'])
    assert.equal(author['@type'], 'Organization')
    assert.equal(author.name, 'Chorono ekibi')
    assert.equal(author.url, `${canonicalOrigin}/#team`)
    assert.ok(html.includes('rel="author"') && html.includes('Chorono ekibi'), 'Verified author must be visible')
    assert.equal(entities.get(article.image['@id']).url, `${canonicalOrigin}${guideImage}`)
    assert.ok(html.includes(`src="${guideImage}"`), `${path}: article image must be visible`)
    assert.equal(article.mainEntityOfPage['@id'], webpage['@id'])
    const breadcrumb = entities.get(webpage.breadcrumb['@id'])
    assert.equal(breadcrumb['@type'], 'BreadcrumbList')
    assert.deepEqual(breadcrumb.itemListElement.map(item => item.position), isPost ? [1, 2, 3] : [1, 2])
    assert.equal(breadcrumb.itemListElement.at(-1).item, expected)
    assert.ok(html.includes('aria-label="Breadcrumb"'), `${path}: breadcrumb must be visible`)
  }
  assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'Do not invent reviews')
  for (const target of ['/getting-started', '/agent-skills', '/blog']) {
    assert.ok(html.includes(`href="${target}"`), `${path}: missing guide navigation ${target}`)
  }
  console.log(`PASS ${path}: metadata, canonical, JSON-LD, heading, icons and navigation`)
}

const robots = await (await fetchChecked('/robots.txt', /text\/plain/)).text()
assert.match(robots, /^Allow: \/$/m)
assert.match(robots, /^Disallow: \/api\/$/m)
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`))
assert.ok(!/^Disallow: \/$/m.test(robots), 'Public pages must remain crawlable')

const xml = await (await fetchChecked('/sitemap.xml', /(?:application|text)\/xml/)).text()
assert.ok(xml.includes('http://www.sitemaps.org/schemas/sitemap/0.9'))
assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort(), pages.map(path => new URL(path, canonicalOrigin).href).sort())
console.log('PASS robots.txt and sitemap.xml: public pages only, correct origin and content types')

const manifest = await (await fetchChecked('/manifest.webmanifest', /(?:manifest\+json|application\/json)/)).json()
assert.equal(manifest.name, 'Chorono Animator')
for (const item of [...manifest.icons, { src: '/apple-touch-icon.png', sizes: '180x180' }, { src: '/opengraph-image.png', sizes: '1200x630' }, { src: '/guides/getting-started.png', sizes: '1200x675' }, { src: '/guides/agent-skills.png', sizes: '1200x675' }, ...blogSlugs.map(slug => ({ src: `/blog/${slug}.png`, sizes: '1200x675' }))]) {
  const buffer = Buffer.from(await (await fetchChecked(item.src, /image\/png/)).arrayBuffer())
  assert.equal(buffer.subarray(1, 4).toString(), 'PNG', `${item.src}: PNG signature`)
  assert.equal(`${buffer.readUInt32BE(16)}x${buffer.readUInt32BE(20)}`, item.sizes, `${item.src}: dimensions`)
}
const ico = Buffer.from(await (await fetchChecked('/favicon.ico', /image\/(?:x-icon|vnd.microsoft.icon)/)).arrayBuffer())
assert.equal(ico.readUInt16LE(2), 1)
assert.equal(ico.readUInt16LE(4), 4)
await fetchChecked('/icon.svg', /image\/svg\+xml/)
console.log('PASS favicon, SVG, Apple/app icons, maskable icon and 1200×630 sharing image')
