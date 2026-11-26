/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The session API still returns browsers to this former page.
      { source: '/account', destination: '/', permanent: false },
      { source: '/agent-skills/examples', destination: '/animations/skills', permanent: true },
      { source: '/agent-skills/examples/small-wins', destination: '/animations/style-animations/small-wins', permanent: true },
      { source: '/animations/style-animations/one-bar-every-beat', destination: '/animations/one-bar-every-beat', permanent: true },
      { source: '/animations/freeform/three-dot-loading', destination: '/animations/three-dot-loading', permanent: true },
      { source: '/animations/style-animations/editable-title-card', destination: '/animations/editable-title-card', permanent: true },
      { source: '/animations/interactive-web/interactive-motion-crew', destination: '/animations/interactive-motion-crew', permanent: true },
    ]
  },
}

module.exports = nextConfig
