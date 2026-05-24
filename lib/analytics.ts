// Google Analytics Event Tracking
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// Event Types
export const events = {
  // Navigation
  VIEW_GITHUB: { name: 'view_github', category: 'navigation' },
  VIEW_DOCS: { name: 'view_docs', category: 'navigation' },
  VIEW_EXAMPLES: { name: 'view_examples', category: 'navigation' },
  VIEW_NPM: { name: 'view_npm', category: 'navigation' },

  // CTA Buttons
  CLICKED_EDITOR_BUTTON: { name: 'clicked_editor_button', category: 'cta' },
  CLICKED_NPM_BUTTON: { name: 'clicked_npm_button', category: 'cta' },
  CLICKED_ANDROID_LINK: { name: 'clicked_android_link', category: 'cta' },

  // Engagement
  SCROLLED_TO_SECTION: { name: 'scrolled_to_section', category: 'engagement' },
  COPIED_CODE: { name: 'copied_code', category: 'engagement' },
}

// Helper functions
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', { button_name: buttonName })
}

export const trackExternalLink = (linkUrl: string) => {
  trackEvent('external_link_click', { link_url: linkUrl })
}

export const trackCodeCopy = (codeType: string) => {
  trackEvent('code_copy', { code_type: codeType })
}
