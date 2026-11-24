export function showcaseArt(slug: string, alt: string) {
  return { src: `/animation-showcase/${slug}.jpg`, alt }
}

export const gameIllustrations = {
  'valley-gate': showcaseArt('valley-gate-2d', 'Side-view pixel art of a traveler approaching a stone gate above turquoise waterfalls.'),
  observatory: showcaseArt('moonlit-observatory-2d', 'Hand-painted 2D observatory with a brass mirror, a telescope and a beam of moonlight.'),
}
