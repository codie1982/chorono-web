export const renderPath = '/chorono-render'
const renderGuideSlugs = ['architectural-visualization', '3d-architectural-walkthrough', 'pixel-streaming-hosting', 'real-estate-virtual-tour'] as const
type RenderGuideSlug = (typeof renderGuideSlugs)[number]

export const renderCover = {
  image: '/chorono-render/courtyard-arrival.jpg',
  imageAlt: 'Limestone pavilion with oak screens and olive trees viewed from the approach.',
  imageWidth: 1008,
  imageHeight: 672,
}

type Guide = {
  slug: RenderGuideSlug
  title: string
  description: string
  intro: string
  sections: ReadonlyArray<{ heading: string; paragraphs: readonly string[]; checklist?: readonly string[] }>
  sources?: ReadonlyArray<{ label: string; url: string }>
}

export const renderGuides = [
  {
    slug: 'architectural-visualization',
    title: 'Architectural visualization for client reviews',
    description: 'Choose still renders, walkthrough animation or interactive 3D based on the decision your client needs to make.',
    intro: 'Architectural visualization, often called archviz, helps people understand an unbuilt space. Start by deciding what the client needs to review. A single image can settle a material choice. A walkthrough can reveal how an entrance connects to the rest of the floor plan.',
    sections: [
      {
        heading: 'Match the deliverable to the review',
        paragraphs: [
          'Use a still render when the composition is part of the decision. A fixed camera makes it easier to compare two facade materials or check the effect of a change to one fixture.',
          'Use a pre-rendered walkthrough when the order of views matters. A short sequence can show how the street entrance leads to a courtyard, then reveal the living space from the doorway.',
          'Use interactive 3D when the client needs to choose the order of views, inspect a corner or switch between options in context. Real-time rendering lets the scene respond to a camera or material change during the session.',
        ],
      },
      {
        heading: 'Prepare one room before the whole building',
        paragraphs: [
          'Pick a room with a consequential decision, such as whether a timber screen gives enough privacy without blocking daylight. Name the camera stops and capture a reference frame for each one. A reviewer should be able to find the same wall or fixture after moving to the next view.',
          'Compare the result on the same browser and device that your client will use. Review texture clarity, how much of the room fits without moving the camera, and whether the controls work with touch.',
        ],
        checklist: ['One question for the client', 'Two comparable views or finishes', 'One browser check on a phone'],
      },
      {
        heading: 'Choose where the work happens',
        paragraphs: [
          'Rendering on a workstation or a render farm can produce finished image and video files. A 3D browser viewer downloads scene data and renders on the visitor’s device. Pixel streaming runs the scene on a remote GPU and delivers the frames to the browser while it accepts visitor input.',
          'If the visualization will only be reviewed in a short meeting, stills and a video may be enough. If clients return to compare alternatives on their own, test a small interactive scene and see which views they actually use.',
        ],
      },
    ],
    sources: [{ label: 'Epic Games · Pixel Streaming overview', url: 'https://dev.epicgames.com/documentation/unreal-engine/overview-of-pixel-streaming-in-unreal-engine' }],
  },
  {
    slug: '3d-architectural-walkthrough',
    title: 'How to build and embed a 3D architectural walkthrough',
    description: 'Plan an interactive architectural walkthrough, choose a browser delivery method and test the embed on a real project page.',
    intro: 'A 3D architectural walkthrough lets someone understand how rooms connect before visiting or building the property. Create a short route that answers one question, then test it in the page where the client will actually use it.',
    sections: [
      {
        heading: 'Plan camera stops around a decision',
        paragraphs: [
          'Start outside the building and connect the entry, a main room and the place that explains the design. For a compact pavilion, that could be the arrival, living room and terrace. Give the stops plain names so the visitor can jump back to a view.',
          'Use fixed stops when visitors should see a curated route. Free movement serves questions that require getting close to an object, looking around an awkward corner or comparing room dimensions.',
        ],
      },
      {
        heading: 'Pick the web delivery method',
        paragraphs: [
          'A video preserves a director’s route. Linked renders or panoramas let visitors choose viewpoints. A browser-rendered scene can provide free movement when the geometry and textures fit the visitor’s device. Pixel streaming can provide free movement while a remote machine runs the scene.',
          'If your provider supplies an embed, use the embed URL and instructions for that player. Give an iframe a descriptive title, reserve its aspect ratio and provide an ordinary link for opening the experience on its own page. Check what the host requires for permission, framing and full-screen behavior.',
        ],
      },
      {
        heading: 'Test the property page as a visitor',
        paragraphs: [
          'Start with the host page’s mobile layout and keyboard order. Check whether a visitor can reach every camera stop, return to the first view and continue to the project inquiry without getting trapped in the controls.',
          'Record the time from requesting the walkthrough to seeing a usable first view. Then observe which stops visitors select and whether they continue to the inquiry. Keep play, exploration and submitted inquiries as different measurements.',
        ],
        checklist: ['First usable view on phone and laptop', 'Named camera stops reachable by keyboard', 'Visible route to the project inquiry'],
      },
    ],
    sources: [
      { label: 'MDN · iframe element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe' },
      { label: 'Epic Games · Twinmotion Cloud presentations and panorama sets', url: 'https://www.twinmotion.com/twinmotion-cloud' },
    ],
  },
  {
    slug: 'pixel-streaming-hosting',
    title: 'Pixel streaming hosting for architectural projects',
    description: 'Learn how Unreal Engine Pixel Streaming and WebRTC deliver a scene, then size a hosting pilot around real sessions and costs.',
    intro: 'Pixel streaming hosting runs a scene on a remote machine. The browser displays the rendered frames and sends input back as the visitor moves or selects an option. In Unreal Engine Pixel Streaming, the player uses WebRTC to exchange the stream and input.',
    sections: [
      {
        heading: 'Follow a session from browser to GPU',
        paragraphs: [
          'The browser opens a player. A signaling service helps establish a WebRTC connection to the running application. The application renders and encodes frames, and the visitor’s input travels back to the scene. Some client networks require a TURN relay for the connection to work.',
          'For a presentation where one person controls the walkthrough, several stakeholders can watch the same view. If each visitor needs an independent camera or configuration, first check how the provider assigns application instances and GPU capacity.',
        ],
      },
      {
        heading: 'Estimate usage with a real scene',
        paragraphs: [
          'Budget for machine time, idle capacity, outgoing data and support. A ten-minute session at an average 6 Mb/s moves about 450 MB of video before protocol overhead. Actual data use depends on bitrate and time spent connected.',
          'Ask providers what they bill while a session is starting, idle or waiting for a visitor. Compare the first view and time to interactive under a cold start and with capacity already running. Record the region, scene build, resolution and viewer device for every comparison.',
        ],
      },
      {
        heading: 'Check the embed and session limits',
        paragraphs: [
          'Test the intended experience in the destination page. Try touch controls, keyboard navigation and a slow or restrictive network. Define the behavior visitors see when every instance is occupied, and decide how idle sessions close.',
          'Start with one real client scene and a known audience. Measure concurrent sessions during a review or launch before increasing reserved capacity.',
        ],
        checklist: ['Publish one packaged scene', 'Measure cold and warm starts', 'Check simultaneous independent visits and idle cost'],
      },
    ],
    sources: [
      { label: 'Epic Games · Unreal Engine Pixel Streaming overview', url: 'https://dev.epicgames.com/documentation/unreal-engine/overview-of-pixel-streaming-in-unreal-engine' },
      { label: 'MDN · WebRTC API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API' },
      { label: 'Arcware · Streaming minutes and concurrency', url: 'https://www.arcware.com/pricing' },
    ],
  },
  {
    slug: 'real-estate-virtual-tour',
    title: 'A real estate virtual tour for an unbuilt property',
    description: 'Compare virtual tour formats for off-plan property and test which views help buyers reach a project inquiry.',
    intro: 'An off-plan buyer wants to understand the layout, light and usable space. A real estate virtual tour can answer those questions before the building is ready to photograph. Tell visitors which details are indicative and show the features they can actually compare.',
    sections: [
      {
        heading: 'Use the source material you have',
        paragraphs: [
          'A photographed tour or spatial capture can document an existing property. For an unbuilt home, start from the approved model and create linked rendered views, panoramas or an interactive scene.',
          'Put illustrative finishes and furniture in the project caption. Identify the floor plan and unit type. If a view or material is optional, show the variant name when the visitor makes the selection.',
        ],
      },
      {
        heading: 'Design the tour for a listing page',
        paragraphs: [
          'Give the main listing an informative lead image and let the visitor open the interactive tour when ready. Start at a useful orientation point. Named stops for the living area, layout and terrace are easier to follow than unlabeled hotspots.',
          'Review the experience at mobile width. Visitors should be able to close the tour, return to the floor plan and reach the inquiry form in a predictable order. If the 3D viewer is slow or unavailable, the still views and floor plan can answer the immediate question.',
        ],
      },
      {
        heading: 'Measure what helps a buyer take the next step',
        paragraphs: [
          'Separate a tour open, a room selection and a submitted inquiry. A visitor who navigates several rooms may be learning about the property. A submitted inquiry supplies a stronger signal, especially when the buyer can name a unit or ask about a specific room.',
          'Start with one property page and keep the layout, offer and traffic source in view when interpreting results. For an off-plan launch, also track recurring questions that agents can answer by pointing to a useful view.',
        ],
        checklist: ['Label the illustrative views', 'Keep the floor plan and inquiry easy to find', 'Track rooms explored and inquiries separately'],
      },
    ],
    sources: [
      { label: 'Matterport · Immersive 3D capture', url: 'https://matterport.com/' },
      { label: 'Twinmotion Cloud · Rendered presentations and panorama sets', url: 'https://www.twinmotion.com/twinmotion-cloud' },
    ],
  },
] as const satisfies readonly Guide[]

export type RenderGuide = (typeof renderGuides)[number]
export type RenderTopic = RenderGuideSlug | 'overview'

export function renderGuidePath(guide: RenderGuide) {
  return renderPath + '/' + guide.slug
}

export function renderTopic(value: string | null): RenderTopic {
  return renderGuideSlugs.find(slug => slug === value) ?? 'overview'
}
