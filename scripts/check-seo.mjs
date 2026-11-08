import assert from 'node:assert/strict'

const origin = (process.argv[2] ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const canonicalOrigin = 'https://www.chorono.com'
const blogSlugs = ['make-animations-with-claude', 'make-animations-with-codex', 'animation-prompts-for-claude-and-codex']
const useCases = {
  '/motion-graphics-software': { id: 'brief-to-motion', duration: 8000, layers: 18, tracks: 26 },
  '/text-animation': { id: 'make-it-clear', duration: 6000, layers: 7, tracks: 8 },
  '/kinetic-typography': { id: 'pause-then-move', duration: 8000, layers: 8, tracks: 10 },
}
const fundamentals = ['/keyframe-animation', '/animation-easing']
const pages = ['/', '/getting-started', '/agent-skills', '/blog', ...blogSlugs.map(slug => `/blog/${slug}`), ...Object.keys(useCases), ...fundamentals]
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
  const guideImage = fundamentals.includes(path) ? '/examples/ideas-in-motion.png' : useCases[path] ? `/examples/${useCases[path].id}.png` : path === '/' || isHub ? '/opengraph-image.png' : isPost ? `${path}.png` : `/guides${path}.png`
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
    for (const topic of Object.keys(useCases)) assert.ok(html.includes(`href="${topic}"`), `Homepage must expose ${topic}`)
    for (const topic of fundamentals) assert.ok(html.includes(`href="${topic}"`), `Homepage must expose ${topic}`)
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
      assert.ok(Number.isFinite(Date.parse(article.dateModified)) && Date.parse(article.dateModified) >= Date.parse(article.datePublished), 'Modification date must follow publication')
      if (article.dateModified !== article.datePublished) assert.ok(html.includes(`dateTime="${article.dateModified}"`) || html.includes(`datetime="${article.dateModified}"`), 'Updated date must be visible')
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
    if (path === '/agent-skills' || path === '/blog/make-animations-with-claude' || path === '/blog/make-animations-with-codex' || useCases[path] || fundamentals.includes(path)) {
      const exampleId = path === '/blog/make-animations-with-codex' ? 'codex-loading-loop' : useCases[path]?.id ?? 'ideas-in-motion'
      const example = entities.get((Array.isArray(article.hasPart) ? article.hasPart[0] : article.hasPart)?.['@id'])
      assert.equal(example?.['@type'], 'CreativeWork')
      const project = entities.get(example.encoding['@id'])
      assert.equal(project.encodingFormat, 'application/json')
      assert.equal(project.contentUrl, `${canonicalOrigin}/examples/${exampleId}.chorono.json`)
      assert.ok(html.includes(`href="/examples/${exampleId}.chorono.json"`) && html.includes(`download="${exampleId}.chorono.json"`), 'Editable project must be downloadable without JavaScript')
      assert.ok(html.includes(`src="/examples/${exampleId}.png"`) && html.includes('aria-label="Play animation"'), 'Example must have a visible poster and explicit playback control')
      assert.ok(!schema['@graph'].some(item => item['@type'] === 'VideoObject'), 'Canvas playback must not claim a video file')
      if (useCases[path]) {
        assert.ok(Number.isFinite(Date.parse(article.datePublished)), 'Example article needs a valid publication time')
        assert.ok(html.includes(`dateTime="${article.datePublished}"`) || html.includes(`datetime="${article.datePublished}"`), 'Publication date must be visible')
        assert.ok(Number.isFinite(Date.parse(article.dateModified)) && Date.parse(article.dateModified) >= Date.parse(article.datePublished), 'Editorial update must follow publication')
        assert.ok(html.includes(`dateTime="${article.dateModified}"`) || html.includes(`datetime="${article.dateModified}"`), 'Editorial update must match the visible date')
        assert.ok(html.includes('aria-label="Inspect animation moments"'), 'Case study needs inspectable timing cues')
        for (const topic of Object.keys(useCases)) assert.ok(html.includes(`href="${topic}"`), 'Related topic navigation must be available without JavaScript')
        const contents = html.match(/<nav\b[^>]*aria-label="On this page"[^>]*>(.*?)<\/nav>/s)
        if (contents) {
          const sectionIds = [...contents[1].matchAll(/href="#([^"]+)"/g)].map(match => match[1])
          assert.equal(sectionIds.length, article.articleSection.length, 'Contents must cover the article sections')
          for (const id of sectionIds) assert.ok(html.includes(`id="${id}"`), `Contents target #${id} must exist`)
        }
      }
    }
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

for (const expected of [{ id: 'ideas-in-motion', duration: 6000, layers: 7, tracks: 9 }, ...Object.values(useCases), { id: 'codex-loading-loop', duration: 4000, layers: 4, tracks: 3, width: 1024, height: 768 }]) {
const projectResponse = await fetchChecked(`/examples/${expected.id}.chorono.json`, /application\/json/)
const project = await projectResponse.json()
const exported = await (await fetchChecked(`/examples/${expected.id}.runtime.json`, /application\/json/)).json()
assert.deepEqual(exported.warnings, [], 'Runtime export must have no unresolved diagnostics')
assert.equal(project.composition.width, expected.width ?? 1200)
assert.equal(project.composition.height, expected.height ?? 675)
assert.equal(project.composition.durationMs, expected.duration)
assert.equal(project.layers.length, expected.layers)
assert.equal(project.timelines.length, 1)
assert.equal(project.timelines[0].tracks.length, expected.tracks)
assert.deepEqual(exported.runtime.composition, project.composition)
assert.deepEqual(exported.runtime.timelines, project.timelines, 'Preview must play the downloadable project timeline')
const layerIds = new Set(project.layers.map(layer => layer.id))
assert.equal(layerIds.size, project.layers.length, 'Editable layers must have unique IDs')
assert.ok(project.layers.every(layer => layer.name?.length > 3), 'Editable layers need meaningful names')
for (const track of project.timelines[0].tracks) {
  assert.ok(layerIds.has(track.target.split('.')[1]), 'Every animation track must target an existing editable layer')
  assert.ok(track.keyframes.every((key, index, all) => key.timeMs >= 0 && key.timeMs <= expected.duration && (!index || key.timeMs >= all[index - 1].timeMs)), 'Keyframes must remain within the scene and in order')
}
if (expected.id === 'codex-loading-loop') {
  assert.equal(project.timelines[0].loop, true)
  for (const track of project.timelines[0].tracks) assert.equal(track.keyframes[0].value, track.keyframes.at(-1).value, 'Loop endpoints must match')
}
assert.ok(!JSON.stringify(project).includes('blob:'), 'Portable example must not depend on local blob URLs')
console.log(`PASS ${expected.id}: portable project, matching runtime timeline, editable layers and valid keyframes`)
}

const manifest = await (await fetchChecked('/manifest.webmanifest', /(?:manifest\+json|application\/json)/)).json()
assert.equal(manifest.name, 'Chorono Animator')
for (const item of [...manifest.icons, { src: '/apple-touch-icon.png', sizes: '180x180' }, { src: '/opengraph-image.png', sizes: '1200x630' }, { src: '/guides/getting-started.png', sizes: '1200x675' }, { src: '/guides/agent-skills.png', sizes: '1200x675' }, { src: '/examples/ideas-in-motion.png', sizes: '1200x675' }, { src: '/examples/codex-loading-loop.png', sizes: '1024x768' }, ...Object.values(useCases).map(item => ({ src: `/examples/${item.id}.png`, sizes: '1200x675' })), ...blogSlugs.map(slug => ({ src: `/blog/${slug}.png`, sizes: '1200x675' }))]) {
  const buffer = Buffer.from(await (await fetchChecked(item.src, /image\/png/)).arrayBuffer())
  assert.equal(buffer.subarray(1, 4).toString(), 'PNG', `${item.src}: PNG signature`)
  assert.equal(`${buffer.readUInt32BE(16)}x${buffer.readUInt32BE(20)}`, item.sizes, `${item.src}: dimensions`)
}
const ico = Buffer.from(await (await fetchChecked('/favicon.ico', /image\/(?:x-icon|vnd.microsoft.icon)/)).arrayBuffer())
assert.equal(ico.readUInt16LE(2), 1)
assert.equal(ico.readUInt16LE(4), 4)
await fetchChecked('/icon.svg', /image\/svg\+xml/)
console.log('PASS favicon, SVG, Apple/app icons, maskable icon and 1200×630 sharing image')
