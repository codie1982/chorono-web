import { ANIMATION_RENDER_PATH, showcaseCollectionHref, showcaseDetailHref } from '@/lib/animation-library/routes'

export const productModePaths = {
  motion: '/motion-graphics-software',
  modeling: '/3d-animation-software',
  render: '/3d-rendering-software',
  game: '/game-engine',
} as const

export const productModePages = {
  modeling: {
    path: productModePaths.modeling, label: '3D Animation & Modeling',
    title: '3D Animation & Modeling Roadmap',
    seoTitle: '3D Animation & Modeling Software',
    description: 'See the 3D Mode development plan for modeling, materials, rigs and shot animation. Inspect a workspace concept and the orbital greenhouse study.',
    image: { src: '/new-home/studio/3d.jpg', alt: 'Concept for the 3D workspace showing an explorer robot, modeling controls and a UV layout.', caption: '3D Mode workspace concept' },
    example: { href: showcaseDetailHref('freeform', 'orbital-greenhouse'), label: 'Explore the greenhouse concept' },
    collection: { href: ANIMATION_RENDER_PATH, label: 'Browse visual studies' },
    overview: 'The 3D Mode plan follows a model from its first shape to a scene ready for animation. Geometry, materials and rig controls are planned as editable parts of the same project.',
    sections: [
      { title: 'Model and surface an asset', text: 'Block out a silhouette with simple volumes, then refine the mesh at the distances where the camera will see it. Keep material assignments and UVs tied to named parts, such as the explorer’s shell, joints and lamp.' },
      { title: 'Prepare a rig and test the poses', text: 'Identify the joints, pivots and deformation areas the motion needs. Test a compact set of poses before animating so the same model can be reused for another shot without rebuilding its setup.' },
      { title: 'Compose a short shot', text: 'Place the asset in its environment, block a camera move and set a readable light direction. Review the silhouette in the opening pose and again at the closest framing.' },
    ],
  },
  render: {
    path: productModePaths.render, label: 'Chorono Render',
    title: '3D Rendering Workflow & Concept Studies',
    seoTitle: '3D Rendering Software for Animation',
    description: 'Explore the Chorono Render development plan and its concept studies. Inspect optical glass lighting and learn how a scene is prepared for frame output.',
    image: { src: '/chorono-render/material-chair.png', alt: 'A curved amber glass chair with highlights and refraction on a neutral studio floor.', caption: 'Optical glass lighting concept' },
    example: { href: showcaseDetailHref('freeform', 'optical-glass'), label: 'Inspect the optical glass study' },
    collection: { href: ANIMATION_RENDER_PATH, label: 'Browse Chorono Render studies' },
    overview: 'Render Mode is planned as the final stage for work made across Chorono’s modes. The workflow starts with a scene and ends with reviewable frames intended for the final delivery format.',
    sections: [
      { title: 'Check light and materials together', text: 'Begin with a readable camera angle and a single test frame. In the glass study, the side light defines the silhouette while the darker backdrop reveals changes in thickness and direction through the material.' },
      { title: 'Review frames from the full shot', text: 'Inspect a frame from the start, middle and end of a camera move. Look for unstable highlights, shifts in the silhouette and object intersections while the camera is moving.' },
      { title: 'Prepare output for delivery', text: 'Record the frame range, size and frame rate in the shot plan. The current 2D editor supports exporting image sequences. Use its export guide to prepare frames for an external video assembly step.' },
    ],
  },
  game: {
    path: productModePaths.game, label: 'Game Engine',
    title: '2D & 3D Game Engine Roadmap',
    seoTitle: 'Game Engine for 2D & 3D Games',
    description: 'Read the Chorono Game Mode development roadmap for scenes, behavior and playable builds. Try Valley Gate, a browser prototype with input and state feedback.',
    image: { src: '/new-home/studio/game-valley.jpg', alt: 'A traveler facing a stone gate in a rocky valley with waterfalls.', caption: 'Valley Gate environment concept' },
    example: { href: showcaseDetailHref('games', 'valley-gate'), label: 'Play the Valley Gate prototype' },
    collection: { href: showcaseCollectionHref('games'), label: 'Browse playable prototypes' },
    overview: 'Game Mode is planned for building scene-driven interactions. The browser prototypes demonstrate small gameplay ideas you can test right away, such as the action order and state feedback in Valley Gate.',
    sections: [
      { title: 'Start with one playable scene', text: 'Define where the player starts, what they can touch and the outcome they should be able to reach. Valley Gate starts with a blocked path, one dial and a gate whose response depends on that dial.' },
      { title: 'Describe actions and state changes', text: 'List which action changes each state and what the player sees after it. Test both the intended sequence and a reversed sequence. A contextual hint keeps the player oriented when the gate stays shut.' },
      { title: 'Test the interaction before expanding it', text: 'Try the complete scene with a keyboard and with touch. Restart it after a successful run and after a wrong action. Confirm that each run begins from the same state before adding a second puzzle.' },
    ],
  },
} as const

export type ProductModePageData = (typeof productModePages)[keyof typeof productModePages]
