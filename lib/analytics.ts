// Google Analytics Event Tracking
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// GA4 Event Types
export const events = {
  // Hero Section
  HERO_EDITOR_CLICK: 'hero_editor_button_click',
  HERO_NPM_CLICK: 'hero_npm_button_click',

  // Navigation
  VIEW_GITHUB: 'view_github',
  VIEW_DOCS: 'view_docs',
  VIEW_EXAMPLES: 'view_examples',
  VIEW_NPM: 'view_npm',

  // CTA Buttons
  CLICKED_EDITOR_BUTTON: 'clicked_editor_button',
  CLICKED_NPM_BUTTON: 'clicked_npm_button',
  CLICKED_ANDROID_LINK: 'clicked_android_link',

  // Engagement
  SCROLLED_TO_SECTION: 'scrolled_to_section',
  COPIED_CODE: 'copied_code',
  GITHUB_STAR_VIEW: 'github_star_view',
}

// Hero Button Events
export const trackHeroEditorClick = () => {
  trackEvent(events.HERO_EDITOR_CLICK, {
    button_location: 'hero_section',
    button_text: 'Get Chorono Editor',
    section: 'hero',
    timestamp: new Date().toISOString(),
  })
}

export const trackHeroNpmClick = () => {
  trackEvent(events.HERO_NPM_CLICK, {
    button_location: 'hero_section',
    button_text: 'View on NPM',
    section: 'hero',
    timestamp: new Date().toISOString(),
  })
}

// Generic Event Tracking
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    timestamp: new Date().toISOString(),
  })
}

export const trackExternalLink = (linkUrl: string, linkLabel?: string) => {
  const eventData: Record<string, string | boolean> = {
    link_url: linkUrl,
    timestamp: new Date().toISOString(),
  }
  if (linkLabel) {
    eventData.link_label = linkLabel
  }
  trackEvent('external_link_click', eventData)
}

export const trackCodeCopy = (codeType: string) => {
  trackEvent(events.COPIED_CODE, {
    code_type: codeType,
    timestamp: new Date().toISOString(),
  })
}

export const trackGitHubStarView = (stars: number) => {
  trackEvent(events.GITHUB_STAR_VIEW, {
    repository: 'chorono-editor',
    star_count: stars,
    timestamp: new Date().toISOString(),
  })
}
