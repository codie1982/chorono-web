import type { Metadata } from 'next'
import { editorialSiteEntities, GUIDE_AUTHOR, pageMetadata, SITE_URL } from './site'
import { animationExampleEntities, INTERACTIVE_EXAMPLES_PUBLISHED, UI_EXAMPLES_PUBLISHED, EXAMPLE_MODIFIED, type AnimationExampleId } from './animation-example'

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'code' | 'prompt'; text: string; label: string }
  | { type: 'list'; items: string[] }
  | { type: 'comparison-table'; rows: { tool: string; workflow: string; environment: string; output: string }[] }
  | { type: 'links'; items: { label: string; href: string }[] }
  | { type: 'screenshot'; src: string; alt: string; caption: string; width: number; height: number }
  | { type: 'animation-example'; exampleId?: AnimationExampleId }

export type BlogPost = {
  slug: string
  title: string
  headline: string
  description: string
  category: string
  published: string
  modified?: string
  image: string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
  intro: string
  /** Optional above-the-fold summary and fragment links for a guide with a working example. */
  quickStart?: {
    details: { label: string; text: string }[]
    links: { label: string; href: string }[]
  }
  sections: { id: string; heading: string; blocks: ContentBlock[] }[]
}

const text = (text: string): ContentBlock => ({ type: 'text', text })
const code = (label: string, text: string): ContentBlock => ({ type: 'code', label, text })
const prompt = (label: string, text: string): ContentBlock => ({ type: 'prompt', label, text })
const list = (...items: string[]): ContentBlock => ({ type: 'list', items })
const links = (...items: { label: string; href: string }[]): ContentBlock => ({ type: 'links', items })
const screenshot = (src: string, alt: string, caption: string, width: number, height: number): ContentBlock => ({ type: 'screenshot', src, alt, caption, width, height })

export const BLOG_TITLE = 'Animation with Claude & Codex | Chorono Blog'
export const BLOG_DESCRIPTION = 'Learn to make editable 2D animations with Claude Code and Codex. Follow local setup guides, connect Chorono through MCP and try practical animation prompts.'

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'free-2d-animation-software',
    title: 'Free 2D Animation Software: Choose by Workflow | Chorono',
    headline: 'Free 2D animation software: choose the right workflow',
    description: 'Compare free 2D animation software for hand-drawn frames, vector tweening and editable motion graphics. See where Chorono fits and try a real project.',
    category: 'Free 2D animation software',
    published: '2026-11-19T00:00:00Z',
    modified: '2026-11-23T06:47:41Z',
    image: '/examples/first-animation.png',
    imageAlt: 'The Make it yours starter project with an editable headline and three colored circles.',
    imageWidth: 1280,
    imageHeight: 720,
    intro: 'The best free 2D animation software depends on what you need to animate. Drawing a new pose on every frame, moving vector artwork between keyframes and building editable text motion are different jobs. This guide compares four free tools by workflow, then lets you inspect a real Chorono project before choosing one.',
    sections: [
      { id: 'compare-tools', heading: 'Compare four free 2D animation workflows', blocks: [
        text('Choose a tool based on what you need to edit and how you will deliver the result. Try the smallest version of your own project in the closest workflow.'),
        { type: 'comparison-table', rows: [
          { tool: 'Pencil2D', workflow: 'Draw new bitmap or vector poses frame by frame.', environment: 'Desktop drawing app', output: 'PNG image sequence or movie export' },
          { tool: 'Synfig', workflow: 'Tween vector shapes between key poses or animate a cutout rig.', environment: 'Desktop animation app', output: 'PNG image sequence' },
          { tool: 'Blender Grease Pencil', workflow: 'Draw in 2D and stage the artwork in a 3D scene.', environment: 'Blender desktop app', output: 'Rendered image sequence' },
          { tool: 'Chorono', workflow: 'Animate editable text, shapes, titles and interface motion with keyframes.', environment: 'Local editor that opens in your browser', output: 'Editable project JSON or web playback JSON' },
        ] },
        text('Chorono’s local editor is free and open source. You can edit by hand or connect Codex or Claude Code through MCP. Access to either agent is managed by its provider.'),
        links(
          { label: 'Pencil2D export guide', href: 'https://www.pencil2d.org/doc/video-export-troubleshooting-guide' },
          { label: 'Synfig features and documentation', href: 'https://www.synfig.org/' },
          { label: 'Blender Grease Pencil workflow', href: 'https://www.blender.org/features/story-artist/' },
          { label: 'Try an editable process graphic in Chorono’s motion graphics software', href: '/motion-graphics-software#example' },
        ),
      ] },
      { id: 'try-editable-example', heading: 'Free 2D animation software for beginners', blocks: [
        text('Start with Make it yours, a four-second title animation you can play here. Download the editable starter project and use Open Scene JSON in your local Chorono editor.'),
        { type: 'animation-example', exampleId: 'first-animation' },
        text('Select Editable headline in Layers and change the Content field. Select Motion dot 1 to change its fill. Scrub the timeline to check the entrance, then use Save Scene JSON and reopen your copy to confirm the changes.'),
        screenshot('/docs/screenshots/first-animation-editor.jpg', 'The Make it yours starter project in Chorono with Editable headline selected, its Content field open and the timeline visible.', 'Select Editable headline to change the words, then scrub the timeline to review the motion.', 1280, 720),
        links({ label: 'Install Chorono locally', href: '/getting-started' }, { label: 'Follow the first animation tutorial', href: '/docs/first-animation' }),
      ] },
      { id: 'choose-by-workflow', heading: 'Start with the animation you need to make', blocks: [
        text('Ask what must remain editable and how you will deliver the result. A hand-drawn cartoon needs drawing and frame controls. A title or process graphic needs text, shapes and timing. A video clip needs a tested video export path. A free license alone does not answer those questions.'),
        text('Test a pose change, a text edit or a timing adjustment before choosing a tool. Reopen the source and verify the export format your project needs.'),
      ] },
      { id: 'decision-checklist', heading: 'Choose a free animation tool with one practical test', blocks: [
        list('Create a five-second sample of the actual work you intend to deliver.', 'Change one word, pose or motion after the first version and check whether the source stays editable.', 'Save, close and reopen the project before judging the workflow.', 'Export the format your destination requires and inspect the result there.', 'Check the license and any separate service costs for the complete workflow.'),
        text('For a hand-drawn short, compare drawing feel and onion skin controls. For a small web motion graphic, compare text editing, keyframe timing and playback output. If an AI agent helps, ask it to change one named object and verify the rest of the scene afterward.'),
        links({ label: 'Make a first Chorono animation', href: '/docs/first-animation' }, { label: 'Keep AI animation editable', href: '/blog/ai-animation-generator-manual-editing' }, { label: 'Understand onion skinning in Chorono', href: '/docs/editor/timeline/onion-skin' }),
      ] },
    ],
  },
  {
    slug: 'ai-animation-generator-manual-editing',
    title: 'AI Animation Generator with Manual Editing | Chorono',
    headline: 'AI animation generator with manual editing',
    description: 'Generate a 2D animation with Claude Code or Codex, then refine its text, shapes and keyframes by hand in Chorono. Try a real editable project.',
    category: 'AI animation workflow',
    published: '2026-11-19T00:00:00Z',
    image: '/examples/first-animation.png',
    imageAlt: 'Make it yours: a four-second 2D animation with editable text and three moving circles.',
    imageWidth: 1280,
    imageHeight: 720,
    intro: 'An AI animation generator is most useful when the first result is a starting point. Chorono lets Claude Code or Codex build a 2D scene in a connected local editor. You can then change its text, shapes and keyframes by hand, and ask the agent to revise a specific part of the same scene.',
    sections: [
      { id: 'try-the-scene', heading: 'Try an AI-made animation that remains editable', blocks: [
        text('Play Make it yours, a four-second scene with eight named layers, 13 animation tracks and 51 keyframes. The title and three circles are native editor objects. Download the portable project, then open it in a separate local Chorono editor tab with Open Scene JSON.'),
        { type: 'animation-example', exampleId: 'first-animation' },
        text('The preview shows the actual animation. The downloadable project keeps the text, color and motion values available to change. Chorono runs locally in your browser after installation; Claude Code or Codex is a separate agent client connected through MCP. This workflow creates editable 2D animation, not generated video footage.'),
        links({ label: 'Install the editor and open your first project', href: '/getting-started' }, { label: 'See the first-animation tutorial', href: '/docs/first-animation' }),
      ] },
      { id: 'edit-by-hand', heading: 'Edit the AI-generated animation by hand', blocks: [
        text('Select Editable headline in Layers and change its Content field to your own short phrase. Select Motion dot 1 and choose a new fill color. In the timeline, move the playhead to inspect how the dots travel; change one keyframe only after you have checked the starting and final states.'),
        screenshot('/docs/screenshots/first-animation-editor.jpg', 'The first-animation project open in Chorono, with Editable headline selected, its text field visible and the timeline below.', 'The same downloadable project in Chorono. The selected text layer, editable Content field and timeline are all visible.', 1280, 720),
        text('Play the whole four seconds after your edit. Save Scene JSON under a new filename and reopen it to confirm the text, color and timing are still present. Keep this portable project as the editable source for later revisions.'),
        links({ label: 'Learn how layers and keyframes work', href: '/keyframe-animation' }, { label: 'Read the project saving guide', href: '/docs/editor/projects' }),
      ] },
      { id: 'continue-with-agent', heading: 'Ask Codex or Claude to revise the current scene', blocks: [
        text('Connect the open editor through its MCP control. Ask the agent to inspect the current scene before changing it, name the one layer to revise and state which manual changes to retain. A focused request is easier to inspect than regenerating the whole composition.'),
        screenshot('/docs/screenshots/mcp-connect-v2.jpg', 'Chorono editor connection dialog with the Connect this editor button for Claude Code and Codex.', 'Connect the editor tab that contains your manually edited project before asking the agent for a revision.', 528, 306),
        prompt('Follow-up prompt after your manual edit', 'Use the chorono skill and read the currently connected first-animation scene and its revision. I changed the Editable headline text and Motion dot 1 fill color by hand. Keep those values, all layer names, the eight layers and the four-second duration. Change only Motion dot 2 so its first upward movement starts 200 ms later; keep its starting and final positions. Preserve every other layer and animation track. Inspect frames around the changed movement, validate, save a separately named portable project and report what changed.'),
        text('Compare the saved project with your manual version before using it as the new source. Confirm your title and color stayed as you set them and that only the requested motion changed. If the scene changed after the agent read it, the agent should read the latest revision again before applying an edit.'),
        links({ label: 'Connect Claude Code or Codex through MCP', href: '/docs/ai/mcp' }, { label: 'Read how targeted scene edits work', href: '/docs/scripting' }),
      ] },
      { id: 'verify-the-motion', heading: 'Check what the AI animation actually did', blocks: [
        text('A good-looking still frame cannot confirm motion. The November 2026 MotionGraphicsBench research from Figma and Stanford tests whether models follow pose, path and timing instructions when animating an existing design. It is a benchmark of model behavior, not a test of this Chorono project.'),
        list('Pose: compare the object’s starting and final positions with the brief.', 'Path: scrub intermediate frames to catch a wrong direction or an unexpected jump.', 'Timing: check which object moves first and whether linked events stay coordinated.', 'Editability: reopen the saved project and change a named text layer or keyframe.'),
        text('Use the project above as a small check. A revision should preserve the headline and color you changed by hand while moving only the requested dot. Inspect the saved result before treating the agent’s report as proof.'),
        links({ label: 'Read the MotionGraphicsBench research', href: 'https://huggingface.co/blog/figma-ai/motion-graphics-bench' }, { label: 'Keep manual edits during Codex revisions', href: '/blog/codex-animation-preserve-manual-edits' }),
      ] },
      { id: 'choose-a-generator', heading: 'What kind of AI animation generator do you need?', blocks: [
        text('If you want AI motion graphics made from editable text and shapes, Chorono gives you a local animation editor with layers, a timeline and keyframes. The agent helps make the first version; you can refine the scene yourself or request another targeted edit.'),
        list('For animated titles, loading loops and small 2D explainers, start with an editable Chorono project.', 'For generated live-action or cinematic video footage, use a video generation workflow; the Chorono project shown here does not produce footage.', 'For a finished MP4 or GIF, check the export workflow you need before choosing a tool. This example supplies an editable project and a browser playback preview.'),
        text('A one-prompt result is a draft, not the limit of the workflow. The practical test is whether you can select a layer, change a value, save the source and continue working on that same scene.'),
      ] },
      { id: 'questions', heading: 'Questions about editable AI animation', blocks: [
        text('Can I edit an AI-generated animation after creating it? In this Chorono example, yes: open the portable project and change its native text, shape and keyframe values in the editor.'),
        text('Will a later Codex or Claude request keep my manual changes? A targeted revision can read the current scene and preserve unrelated values. Check the result before saving it as your next source; a request that replaces entire objects or uses an old scene state needs correction.'),
        text('Is this an instant online AI video generator? No. Install and run the Chorono editor locally, connect your own Claude Code or Codex client through MCP, and work with editable 2D scene data.'),
        links({ label: 'Make an animation with Codex', href: '/blog/make-animations-with-codex' }, { label: 'Make an animation with Claude Code', href: '/blog/make-animations-with-claude' }, { label: 'Browse more editable examples', href: '/animations' }),
      ] },
    ],
  },
  {
    slug: 'codex-animation-preserve-manual-edits',
    title: 'Keep Manual Animation Edits During Codex Revisions | Chorono',
    headline: 'Keep manual edits when Codex revises an animation',
    description: 'Keep manual animation edits when you ask Codex for another targeted change. Follow a real Chorono scene, timeline screenshot and revision checklist.',
    category: 'Codex revisions',
    published: '2026-11-19T00:00:00Z',
    image: '/examples/codex-loading-loop.png',
    imageAlt: 'A little progress, every day above three circles in an editable Codex-made animation.',
    imageWidth: 1024,
    imageHeight: 768,
    intro: 'A prompt can make the first version of an animation. The harder part comes after you fix the text, color or timing yourself: can Codex continue without replacing those edits? In Chorono, both you and a connected Codex client work on the same native scene. This guide shows how to request a narrow revision and check what changed.',
    sections: [
      { id: 'open-the-project', heading: 'Start with the actual Codex animation project', blocks: [
        text('Play and download the four-second loading loop below. Codex created one headline and three named circles in Chorono. The portable project contains four layers, three animation tracks and 24 keyframes; the preview is playback of that scene, not a video-generation mockup.'),
        { type: 'animation-example', exampleId: 'codex-loading-loop' },
        text('Open the downloaded JSON in a separate local editor tab with Open Scene JSON. Select the Headline layer to change its wording, or select a dot and adjust its fill color. Save Scene JSON under a new name before asking Codex to continue.'),
        links({ label: 'Install Chorono and connect Codex', href: '/blog/make-animations-with-codex' }, { label: 'Read the project saving guide', href: '/docs/editor/projects' }),
      ] },
      { id: 'manual-edit', heading: 'Make one change yourself and inspect its timeline', blocks: [
        text('For a clear before-and-after check, change the headline to “Still moving forward.” and make the left dot blue. Leave the four-second duration and the dot tracks as they are. Play the scene and confirm the new words fit above the motion.'),
        screenshot('/docs/screenshots/timeline-panel-v2.jpg', 'The Codex loading-loop timeline in Chorono, showing separate position tracks and keyframes for the left, middle and right dots.', 'The same loading-loop project has separate named tracks for each dot, so a later request can target one motion without rebuilding the scene.', 1280, 489),
        text('The timeline screenshot shows the original Codex loading-loop project before the manual example changes. Your own saved copy is the baseline to compare with the later agent revision.'),
      ] },
      { id: 'codex-revision', heading: 'Tell Codex exactly what to change and keep', blocks: [
        text('Reconnect the editor tab that contains your saved manual version. Codex should read the current scene and revision, identify the named Middle dot track and change only its timing. The prompt below makes the human edits explicit so the result can be checked.'),
        prompt('Codex prompt · revise the current scene', 'Use the chorono skill in the connected editor. Read the current loading-loop scene and revision before editing. I changed the Headline text to “Still moving forward.” and the Left dot fill to blue by hand. Keep those changes, every layer name, the four-second loop and all other tracks. Change only the Middle dot position track so its first upward movement starts 150 ms later while it still returns to the original starting position at the loop boundary. Inspect the middle of the loop and both sides of the boundary, validate, then save a separately named portable project. Report the exact layer and track changed.'),
        text('A later manual change can make a previously read scene revision stale. Chorono’s agent workflow uses the current scene revision for edits; when it changes, Codex should read the scene again and adapt rather than apply an old plan. A narrow request helps, but the saved result still needs your review.'),
        links({ label: 'Read Chorono scripting and revision checks', href: '/docs/scripting' }, { label: 'See the editor connection step', href: '/docs/ai/mcp' }),
      ] },
      { id: 'compare', heading: 'Check that your manual work survived', blocks: [
        list('Open the revised portable project and confirm the Headline still says “Still moving forward.”', 'Confirm the Left dot is still blue and the named layers are present.', 'Scrub the Middle dot movement and the loop boundary; compare them with the manual baseline.', 'If the agent changed unrelated values, return to the saved manual version and request a smaller correction.'),
        text('This test distinguishes the one requested timing change from the manual edits you wanted to keep. Save the verified file as the new editable source. The current article provides the exercise and original project; it does not present a completed before-and-after preservation test.'),
      ] },
      { id: 'why-this-matters', heading: 'Why a second prompt can overwrite manual animation work', blocks: [
        text('If an agent generates a replacement scene from an earlier description, it may not include changes you made later in an editor. That is a workflow risk, not a universal Codex behavior. Working on the currently connected native scene, naming the object to change and checking the revision make the next edit more controlled.'),
        text('Chorono is an animation editor with live text, shapes and keyframes. It is not an instant hosted video generator. If you need generated footage or a finished MP4, evaluate that separate production path. If you need AI motion graphics you can still refine by hand, use the editable project as your source.'),
        links({ label: 'AI animation generator workflow with manual editing', href: '/blog/ai-animation-generator-manual-editing' }, { label: 'See more editable animation examples', href: '/animations' }),
      ] },
    ],
  },
  {
    slug: 'heart-like-and-hamburger-menu-animation',
    title: 'Heart Like & Hamburger Menu Animation: Interactive Examples | Chorono',
    headline: 'Make a heart like and hamburger menu animation with AI',
    description: 'Click two interactive UI animation examples, download editable Chorono projects and copy creation and revision prompts for a heart like button and hamburger menu.',
    category: 'Interactive UI animation',
    published: INTERACTIVE_EXAMPLES_PUBLISHED,
    image: '/blog/heart-like-and-hamburger-menu-animation.png',
    imageAlt: 'An outlined rust heart and A little love headline on a cream canvas.',
    intro: 'Small interactions make a change of state visible. Try a heart that fills when liked and a hamburger icon that turns into a close button. Both examples respond to your click, keep their state until the next click and include downloadable editable projects.',
    sections: [
      { id: 'heart-like', heading: 'Heart like animation: click, unlike and download', blocks: [
        text('Click the canvas to fill the outlined heart and enlarge it to 108%. Click again to return to the outline. Three named layers keep the headline, heart path and hint separate. The Unliked and Liked states use two explicit timelines, with a 280 ms transition to liked and a 220 ms return. This demo stores no account data or like count.'),
        { type: 'animation-example', exampleId: 'heart-like' },
        prompt('Creation prompt · interactive heart like animation', 'Use the chorono skill in a new connected editor scene. Create a 1200 × 675 cream #F7F1ED canvas at 60 fps. Add the centered bold Arial headline “A little love.” in dark brown #211612, an editable rust #B55233 heart path below it, and the hint “Tap to like. Tap again to undo.” Keep three named layers. Create separate non-looping 300 ms timelines named unliked and liked, each holding a constant pose. Unliked has an outlined heart at scale 1; Liked fills the heart and scales it to 1.08 around its center. Add a state machine starting Unliked. The toggle event blends to Liked over 280 ms and back over 220 ms. Make the heart tappable and save a click trigger that emits toggle. Preserve unrelated work. Inspect both actual rendered states, test two clicks, validate, save and reopen the portable project, and export runtime JSON. Report the saved paths and any warnings.'),
        prompt('Revision prompt · a quieter heart interaction', 'Read the saved heart-like project. Keep the three layers, layout, colors, click trigger and reversible states. Remove the scale change so the heart stays at scale 1 in both states. Retain the fill change and shorten both state blends to 180 ms. Test like and unlike, inspect both previews and save a separately named portable revision.'),
      ] },
      { id: 'hamburger-menu', heading: 'Hamburger menu animation: open, close and download', blocks: [
        text('Click the canvas to bring the outer bars together and rotate them to +45 and −45 degrees. The middle bar fades out, leaving an X. Click again to restore the three bars. The six-layer project includes a transparent tap area and explicit Closed and Open states. Opening takes 280 ms and closing takes 220 ms. The links below the icon are real website links supplied by this preview, not navigation embedded in the downloaded scene.'),
        { type: 'animation-example', exampleId: 'hamburger-menu' },
        prompt('Creation prompt · interactive hamburger menu animation', 'Use the chorono skill in a new connected editor scene. Create a 1200 × 675 cream #F7F1ED canvas at 60 fps. Add the centered bold Arial headline “Open to explore.” and the hint “Tap to open. Tap again to close.” Add three editable rust #B55233 rounded bars, each 140 × 12 pixels, spaced 40 pixels apart with centered rotation anchors. Add a transparent tappable rectangle covering the icon. Keep six named layers. Create separate closed and open non-looping 300 ms timelines holding constant poses. Closed shows three horizontal bars. Open brings the outer bars to the middle, rotates them +45 and −45 degrees, and hides the middle bar. Start the state machine Closed; toggle blends to Open in 280 ms and back in 220 ms. Save a click trigger on the tap area that emits toggle. Preserve unrelated work. Inspect both rendered states, test opening and closing, validate, save and reopen a portable project, and export runtime JSON. Report paths and warnings.'),
        prompt('Revision prompt · compact menu icon', 'Read the saved hamburger-menu project. Keep its title, hint, tap area, click trigger and reversible state machine. Shorten all three bars to 112 pixels and update their center anchors and horizontal positions so the icon stays centered. Keep the outer bars meeting at one center in the Open state. Use 200 ms blends in both directions. Inspect Closed and Open, test two clicks, validate and save a separately named revision.'),
      ] },
      { id: 'edit-and-embed', heading: 'Open the projects and connect them to your interface', blocks: [
        list('Download the JSON underneath the example you want. Each is an independent editable project.', 'Open a separate Chorono editor tab, choose Open Scene JSON and select the download. Enter Preview or runtime test mode to exercise its click trigger.', 'Edit the named layers, states and transitions, or connect Codex or Claude through MCP and use the revision prompt.', 'Export runtime JSON for a website. Supply a native HTML button with aria-pressed for a like or aria-expanded and aria-controls for a menu. Keep navigation links in HTML.'),
        text('These previews have no autoplay. Enter and Space activate their native buttons. The menu also closes with Escape and returns focus to its button. With reduced motion enabled, state changes happen without the animated blend. Inputs during the brief transition are ignored to avoid overlapping blends. Each example uses native shapes and Arial, with no external media. Downloaded projects preserve the icon interactions; browser accessibility, links and reduced-motion handling belong to the host page.'),
        links({ label: 'Progress bar and success animation examples', href: '/blog/progress-bar-and-success-animation' }, { label: 'Set up Codex and try the three-dot loading loop', href: '/blog/make-animations-with-codex' }, { label: 'Set up Claude Code with Chorono', href: '/blog/make-animations-with-claude' }),
      ] },
    ],
  },

  {
    slug: 'progress-bar-and-success-animation',
    title: 'Progress Bar & Success Animation: Examples and Prompts | Chorono',
    headline: 'Create a progress bar and success animation with AI',
    description: 'Play two editable UI animation examples: a progress bar and success checkmark. Download the Chorono projects and use creation and revision prompts with Codex or Claude.',
    category: 'UI animation',
    published: UI_EXAMPLES_PUBLISHED,
    image: '/blog/progress-bar-and-success-animation.png',
    imageAlt: 'A rust progress bar on a cream canvas with the headline A little closer.',
    intro: 'Show movement toward a goal, then acknowledge completion. These two small Chorono projects demonstrate different UI states: a progress bar that fills from left to right and a success checkmark that draws in two strokes. Play each example, inspect its timing and download the editable source.',
    sections: [
      { id: 'choose-a-state', heading: 'Loading, progress and success serve different purposes', blocks: [
        text('Use an indeterminate loading animation when you cannot measure how much work remains. Use a determinate progress bar when the application can report real progress. Show a success confirmation only after the operation actually succeeds. These examples are authored motion studies, not connected upload controls or evidence that a task has completed.'),
        text('The six-second progress example uses illustrative timing. In a working interface, connect its visual state to the actual operation rather than letting a timer promise completion. The success example plays once and holds its message; repeatedly celebrating a completed action would distract from the next step.'),
        links({ label: 'Explore the three-dot loading loop', href: '/blog/make-animations-with-codex#animation-example' }),
      ] },
      { id: 'progress-bar', heading: 'Progress bar animation: play and download', blocks: [
        text('A little closer uses five named layers and three tracks. The 640-pixel fill stays anchored at its left edge. It starts at 0.5 seconds and reaches the end at 3.8 seconds; Ready to go fades in by 4.2 seconds. The final state holds until 6 seconds. Scrub the preview to inspect the starting edge, changing fill and completion message.'),
        { type: 'animation-example', exampleId: 'progress-bar' },
        prompt('Creation prompt · progress bar animation', 'Use the chorono skill in a new connected editor scene. Create a 6-second, 1200 × 675 animation at 30 fps on cream #F7F1ED. Center the bold Arial headline “A little closer.” in dark brown #211612. Below it, place a 640 × 24 rounded track in #E7D8CF and a rust #B55233 fill. Keep the fill anchored at its left edge and animate its horizontal scale from 0 to 1 between 0.5 and 3.8 seconds with ease-in-out. Keep it full until 6 seconds. Show “One step at a time.” below the bar; fade that caption out from 3.5 to 3.8 seconds, then fade in “Ready to go.” from 3.8 to 4.2 seconds. Keep five named editable layers and an explicit non-looping timeline. Preserve unrelated work. Inspect real previews at 0, 2, 3.8 and 4.5 seconds, validate, save and reopen the portable Chorono JSON, and report its path.'),
        prompt('Revision prompt · slower progress, same layout', 'Read the saved progress-bar scene. Keep its text, colors, dimensions and left anchor. Make the fill reach the end at 4.6 seconds instead of 3.8. Fade out the first caption from 4.3 to 4.6 seconds and fade in Ready to go from 4.6 to 5 seconds. Keep the total duration at 6 seconds and hold the finished state. Preserve unrelated tracks. Inspect the middle and completion frames, validate and save a separately named revision.'),
      ] },
      { id: 'success-animation', heading: 'Success animation: play and download', blocks: [
        text('All done uses five named layers and six tracks. A rust badge fades in during the first 0.4 seconds. Two white strokes reveal the checkmark from 0.35 to 1.1 seconds. The headline fades and rises into place by 1.4 seconds; the supporting text is visible by 1.7 seconds. Everything holds through the four-second endpoint.'),
        { type: 'animation-example', exampleId: 'success-confirmation' },
        prompt('Creation prompt · success checkmark animation', 'Use the chorono skill in a new connected editor scene. Create a 4-second, 1200 × 675 animation at 30 fps on cream #F7F1ED. Place a 180-pixel rust #B55233 circle centered horizontally in the upper-middle canvas. Fade it in from 0 to 0.4 seconds. Build a white checkmark inside it from two rounded editable strokes. Reveal the short stroke from 0.35 to 0.65 seconds and the long rising stroke from 0.62 to 1.1 seconds, using left-anchored horizontal scaling and ease-out. Below the badge, fade and move the bold Arial headline “All done.” upward by 16 pixels from 0.9 to 1.4 seconds. Fade in “Your next step starts here.” from 1.2 to 1.7 seconds. Use dark brown #211612 for the headline and muted brown #6D5A52 for the caption. Hold the complete layout until 4 seconds without looping. Keep five named editable layers and an explicit timeline. Preserve unrelated work. Inspect actual previews at 0.5, 0.9, 2 and 4 seconds, validate, save and reopen a portable project, and report its path.'),
        prompt('Revision prompt · a quieter confirmation', 'Read the saved success-confirmation scene. Keep the badge, checkmark, words, colors and four-second duration. Remove the headline’s vertical movement while retaining its fade. Finish both checkmark strokes by 0.9 seconds, then hold the completed confirmation. Preserve unrelated layers and tracks. Inspect the reveal and final hold, validate and save a separately named revision.'),
      ] },
      { id: 'edit-the-projects', heading: 'Open the projects and make them your own', blocks: [
        list('Download the JSON underneath the example you want. Each file is a separate editable project.', 'Open a separate Chorono editor tab and choose Open Scene JSON. Select the downloaded file.', 'Edit named layers, colors and keyframes directly, or connect Codex or Claude through MCP and use the revision prompt.', 'Save your revised portable project. Export runtime JSON separately when you need to embed it in a web application.'),
        text('Both scenes use Arial and native shapes with no external media. The downloads contain the original examples; the revision prompts are optional next steps. The player uses @chorono/runtime and starts only when you choose Play. A runtime export is playback data, not a finished accessible web component or an MP4 file.'),
        links({ label: 'Set up Codex and Chorono', href: '/blog/make-animations-with-codex' }, { label: 'Set up Claude Code and Chorono', href: '/blog/make-animations-with-claude' }, { label: 'Understand animation easing', href: '/animation-easing' }),
      ] },
      { id: 'interface-use', heading: 'Use these motions in a real interface', blocks: [
        text('Keep a text status outside the canvas so the result remains understandable without animation. Drive a real progress indicator from actual progress values, and announce a completed action only when the application confirms it. Color and the checkmark should support that message, not replace it.'),
        text('Provide a static alternative for people who prefer reduced motion. These preview players do not autoplay; they offer pause and scrubbing. In your product, retain a readable final status and a clear next action instead of making animation a prerequisite for continuing.'),
        text('Choose the progress-bar example for a motion prototype of a measurable task. Choose the success example for a completed save, submission or setup step. For an unknown wait, use the separate three-dot loop. The visual timing and copy should describe the actual state of your application.'),
      ] },
    ],
  },
  {
    slug: 'make-animations-with-claude',
    title: 'Claude Code Animation: Text & Motion Graphics Tutorial | Chorono',
    headline: 'Make text animation and motion graphics with Claude Code',
    description: 'Create editable text animation and 2D motion graphics with Claude Code and Chorono. Follow the setup, play a real example and download its project.',
    category: 'Claude Code',
    published: '2026-11-04T12:50:46Z',
    modified: EXAMPLE_MODIFIED,
    image: '/blog/make-animations-with-claude.png',
    imageAlt: 'Claude Code animation workflow in Chorono: connect the editor, describe motion, then refine editable keyframes.',
    intro: 'Make text animation, kinetic typography and simple 2D motion graphics with Claude Code in a connected Chorono editor. Describe the scene in a prompt, review the actual animation and refine its editable layers and keyframes. This tutorial includes a working six-second example and the project file you can open yourself.',
    sections: [
      { id: 'what-you-create', heading: 'What can Claude animate in Chorono?', blocks: [
        text('Chorono gives Claude Code tools to work with an actual 2D animation scene through the Model Context Protocol (MCP). You can ask for a title entrance, a looping product illustration, moving shapes or particle effects. Claude uses the connected editor to create and adjust the scene, and you can inspect it on the canvas and timeline.'),
        text('A useful first project is a short title card with one moving object. This is a small kinetic typography exercise: the words move into place while a shape and underline support the message. Chorono supplies the motion graphics editor; Claude Code interprets your prompt and operates it through MCP. This guide uses Claude Code running on your computer, with a local editor and its bundled setup and animation skills.'),
        list('You describe the composition and motion in plain language.', 'Claude creates scene objects and animation tracks through MCP.', 'You preview representative frames and request specific changes.', 'You save a portable project that can be reopened and edited.'),
      ] },
      { id: 'animation-example', heading: 'Play the text animation and download its project', blocks: [
        text('“Ideas in motion” is a real Chorono scene with seven named layers, nine animation tracks and a six-second timeline. The title fades upward, the underline extends and the rust circle travels below the words before the final hold. Use Play or scrub the preview to inspect the timing.'),
        { type: 'animation-example' },
        text('Download the portable Chorono JSON, open a separate editor tab and choose Open Scene JSON from the editor menu. Select the downloaded file to inspect or edit the text, circle and keyframes. The scene uses Arial and native shapes, so it needs no external images or media files.'),
        links({ label: 'Jump to the animation prompt', href: '#first-prompt' }, { label: 'Install the Chorono animation skills', href: '/agent-skills' }),
      ] },
      { id: 'install', heading: '1. Install Chorono for Claude Code', blocks: [
        text('Start with Node.js 20 or later, npm, Git, a modern browser and a separately installed Claude Code client. In a terminal, clone the editor and build the local CLI. These commands assume a fresh checkout; use your existing checkout if Chorono is already installed.'),
        code('Terminal · fresh checkout', 'git clone https://github.com/codie1982/chorono-editor.git\ncd chorono-editor\nnpm ci\nnpm run cli:build\nnpm run chorono -- setup --agent claude-code\nnpm run chorono -- start --background --open'),
        text('The setup command registers Chorono for Claude Code and installs the chorono-setup and chorono skills for the project. Open Claude Code in this project folder so it can load the project configuration and skills. Review the MCP entry when Claude Code asks to trust the project server. Reload its MCP connection or start a new agent session after setup.'),
        links({ label: 'Full Chorono installation guide', href: '/getting-started' }, { label: 'Claude Code: connecting tools through MCP', href: 'https://code.claude.com/docs/en/mcp' }),
      ] },
      { id: 'connect', heading: '2. Connect the browser editor to Claude', blocks: [
        text('Keep the editor tab open. In Chorono, open MCP and choose “Connect this editor”. This connects the browser scene to the local MCP bridge. An editor page that loads successfully still needs this connection before Claude can control its contents.'),
        code('Terminal · connection check', 'npm run chorono -- doctor --agent claude-code'),
        text('The doctor command reports setup and connection problems. Ask Claude to list connected Chorono sessions and read the editor capabilities before creating anything. If several editor tabs are connected, tell it which scene to use. After reloading the browser, connect the editor again.'),
        prompt('Connection prompt', 'Use the chorono-setup skill to check my local Chorono connection. List the connected editor sessions, read the available capabilities and confirm which scene you will use. If the editor is not connected, explain the next setup step before creating objects.'),
      ] },
      { id: 'first-prompt', heading: '3. Prompt Claude to create the text animation', blocks: [
        text('Specify the canvas, duration, text, colors and order of movement. Exact copy helps Claude keep your message intact. A short sequence is easier to review than a request for a complete promotional film with several unrelated scenes.'),
        prompt('Text animation prompt · Ideas in motion', 'Use the chorono skill in the connected editor. Create a 6-second, 1200 × 675 title card at 30 fps with a warm cream background (#F7F1ED). Keep the exact title “Ideas” and “in motion” on two lines in dark brown (#211612), using bold Arial. Add the small label “CHORONO / ANIMATION EXAMPLE” at the top, a thin rust underline (#B55233) below the title, and one rust circle to its right. From 0 to 1.2 seconds, fade and move the two title lines gently upward into place with a small stagger. Between 1.2 and 3 seconds, extend the underline and move the circle along an arc below the title without covering the words. Fade in the footer “MADE FROM A PROMPT. STILL YOURS TO EDIT.” from 2.4 to 3.2 seconds. Hold the final layout until 6 seconds. Keep all seven layers named and editable on an explicit timeline. Preserve unrelated existing work. Inspect actual previews at 0.6, 2.2 and 3.6 seconds, validate and save a portable Chorono JSON project. Report the saved path.'),
        text('Review the actual previews. Check that the headline fits, the moving circle does not cover the text and the final hold is long enough to read. You can also scrub the timeline in Chorono and select the objects yourself.'),
      ] },
      { id: 'refine', heading: '4. Refine timing and save the editable scene', blocks: [
        prompt('Follow-up · one controlled revision', 'Keep the composition, text and colors. Make the circle arrive at 3.8 seconds instead of 3 seconds, and soften its final movement. Preserve all unrelated objects and animation tracks. Show previews just before and after the arrival, then save the revised project and report its path.'),
        text('Describe the outcome you want to change and the parts you want to preserve. A targeted request keeps the revision easy to compare. Ask for the saved file path at the end, then reopen that project to continue editing later.'),
        text('For playback in a web application, the separate @chorono/runtime npm package can play exported Chorono scenes. Installing that runtime alone does not install the editor or connect Claude. Complete the editor and MCP setup first.'),
        code('Web application · runtime install', 'npm install @chorono/runtime'),
        text('The preview above uses this runtime with the exported scene. Keep the portable project as your editable source and use the runtime export for playback in your application. For a new text animation, change the message and timing in the prompt, then review the output again.'),
        links({ label: 'How the two Chorono agent skills work', href: '/agent-skills' }, { label: 'Six animation prompts for Claude and Codex', href: '/blog/animation-prompts-for-claude-and-codex' }, { label: 'Chorono runtime on npm', href: 'https://www.npmjs.com/package/@chorono/runtime' }),
      ] },
      { id: 'questions', heading: 'Common questions about Claude animations', blocks: [
        text('Can I edit an animation after Claude creates it? Yes. Chorono keeps the scene objects, keyframes and timelines editable. Open the saved project to change it manually or ask Claude for another revision.'),
        text('Why can Claude see the tools but not my scene? Check that the editor tab is open and that you selected “Connect this editor” in its MCP controls. Run doctor and ask Claude to list sessions again. A browser refresh can require reconnection.'),
        text('Does this require adding a model API key to Chorono? The local MCP connection does not require a model provider API key in the editor. Your Claude Code account and access are managed separately by its provider.'),
        links({ label: 'Chorono source and installation documentation', href: 'https://github.com/codie1982/chorono-editor' }),
      ] },
    ],
  },
  {
    slug: 'make-animations-with-codex',
    title: 'Make Animations with Codex: Chorono Setup & Prompts',
    headline: 'Make editable animations with Codex and Chorono',
    description: 'Create animations with Codex and Chorono. Play a three-dot loading loop, download its editable project and copy the creation and revision prompts.',
    category: 'Codex',
    published: '2026-11-04T12:50:46Z',
    modified: '2026-11-23T08:07:26Z',
    image: '/blog/make-animations-with-codex.png',
    imageAlt: 'Codex animation workflow: install Chorono skills, connect MCP and revise a saved editable scene.',
    intro: 'Make a four-second 2D animation with Codex in a connected Chorono editor. Codex creates named shapes and keyframes; you can play the result, ask for a timing change and download a project that stays editable. This walkthrough uses a three-dot loading loop so you can inspect the finished scene before setting up your own.',
    quickStart: {
      details: [
        { label: 'What you’ll make', text: 'A four-second loading loop with one headline, three animated circles, four editable layers, three tracks and 24 keyframes.' },
        { label: 'What you need', text: 'Node.js 20 or later, npm, Git, a browser and a separately installed Codex client. Connect the open Chorono editor tab through MCP.' },
        { label: 'Your output', text: 'A portable editable Chorono JSON project and browser playback. This walkthrough does not demonstrate an encoded video export.' },
      ],
      links: [
        { label: 'Play the example', href: '#animation-example' },
        { label: 'Set up Codex', href: '#setup' },
        { label: 'Copy the creation prompt', href: '#brief' },
      ],
    },
    sections: [
      { id: 'animation-example', heading: 'Play the three-dot loading loop and download the project', blocks: [
        text('This four-second example was created in the connected Chorono editor with Codex. It has four named layers, three animation tracks and 24 keyframes. The headline stays still while the circles rise 40 pixels in two waves, with a 180-millisecond stagger. Every circle returns to its starting position before the loop repeats.'),
        { type: 'animation-example', exampleId: 'codex-loading-loop' },
        text('Download the portable project and choose Open Scene JSON in a separate Chorono editor tab. The 1024 × 768 scene uses Arial and native shapes, with no external media. Change the text, colors or keyframes manually, or use the prompts below. The revision prompt is an optional next step; the download contains the original 40-pixel movement.'),
        links({ label: 'Copy the creation prompt', href: '#brief' }, { label: 'Copy the revision prompt', href: '#iterate' }),
      ] },
      { id: 'workflow', heading: 'How the Codex animation workflow works', blocks: [
        text('Codex is the agent you give instructions to. Chorono is the animation editor that holds the canvas, scene objects and timelines. MCP connects the two, while the bundled Chorono skills explain setup and animation authoring. Together they let you move from a written brief to a scene you can inspect and revise.'),
        text('This workflow suits small interface illustrations, animated titles, loading loops and visual explanations made from text and shapes. Start with one clear motion idea. Keep the editor visible so you can judge the result yourself and use precise follow-up prompts.'),
        list('Install and register the local editor for Codex.', 'Connect the browser scene and confirm that Codex can read it.', 'Describe the layout, timing and motion in a prompt.', 'Review previews, request a focused revision and save the project.'),
      ] },
      { id: 'setup', heading: '1. Set up Chorono for Codex', blocks: [
        text('You need Node.js 20 or later, npm, Git, a modern browser and a separately installed Codex client. Run the following commands in a terminal for a fresh editor checkout. If you already have a checkout, use it instead of creating a second copy.'),
        code('Terminal · fresh checkout', 'git clone https://github.com/codie1982/chorono-editor.git\ncd chorono-editor\nnpm ci\nnpm run cli:build\nnpm run chorono -- setup --agent codex\nnpm run chorono -- start --background --open'),
        text('The Chorono setup command configures the MCP entry for Codex and places the bundled skills in the project’s .agents/skills directory. Its Codex integration uses the user configuration at ~/.codex/config.toml. Open this project in Codex and reload the MCP tools or start a new session after setup so the new configuration is available.'),
        text('Codex supports MCP configuration in its configuration file. Use the Chorono setup command for this integration so the local server command and skill locations are installed together. Review a stale entry reported by setup before replacing an existing configuration.'),
        links({ label: 'Official Codex MCP documentation', href: 'https://developers.openai.com/codex/mcp' }, { label: 'Chorono setup guide', href: '/getting-started' }),
      ] },
      { id: 'setup-help', heading: 'Need help connecting Codex?', blocks: [
        text('Use the setup guides to install the local editor, connect Codex through MCP and add the Chorono skills. Then return to the example, open its editable project and try the revision prompt.'),
        links({ label: 'MCP connection guide', href: '/docs/ai/mcp' }, { label: 'Chorono skills guide', href: '/docs/ai/skills' }, { label: 'Installation guide', href: '/docs/installation' }),
      ] },
      { id: 'check', heading: '2. Check that Codex can reach the scene', blocks: [
        text('In the browser editor, open MCP and select “Connect this editor”. Keep that tab open while you work. Run doctor from the editor checkout to check configuration and connection status.'),
        code('Terminal · connection check', 'npm run chorono -- doctor --agent codex'),
        prompt('Ask Codex to verify the connection', 'Use the chorono-setup skill to check this workspace. List the connected Chorono editor sessions, read the capabilities and inspect the current scene. If more than one editor is connected, identify them before choosing a scene. Do not change existing artwork during this check.'),
        text('A healthy HTTP response from the editor is only one part of the check. Codex also needs a connected editor session. If the session list is empty, reconnect in the editor’s MCP controls. Reconnect after a browser refresh and check the session list again.'),
      ] },
      { id: 'brief', heading: '3. Ask Codex to create an animation', blocks: [
        text('A good brief defines a measurable sequence. The example below uses three dots, one headline and a short repeating motion. It tells Codex what should stay editable and when to inspect the scene, so you can evaluate the first result before extending it.'),
        prompt('Animation prompt · three-dot loading loop', 'Use the chorono skill in the connected editor. Create a 4-second loop on a 1024 × 768 canvas with a cream background. Center the exact headline “A little progress, every day”. Place three rust-colored circles below it. Animate a gentle upward movement on each circle, staggered from left to right. Keep the headline still. Return every circle to its starting position before the loop ends so the seam is smooth. Name the text and each circle clearly, keep the animation editable and preserve any unrelated existing objects. Inspect previews at 0, 1, 2, 3 and 4 seconds. Validate and save a portable Chorono JSON project, then report the path.'),
        text('Watch the loop boundary as well as the middle. The last frame should join naturally to the first, the headline should remain readable and the dots should stay far enough from the text. Scrub the timeline to find any sudden jumps.'),
      ] },
      { id: 'iterate', heading: '4. Revise an existing animation precisely', blocks: [
        prompt('Revision prompt · preserve the scene', 'In the existing loading animation, reduce the circles’ upward travel by half and increase the delay between circles slightly. Keep the title, colors, object names and 4-second duration. Read the current scene before editing. Preserve unrelated layers and tracks, inspect the loop boundary again and save a revised portable project.'),
        text('Make one timing or layout change at a time when the first result is close. Give Codex the exact wording to retain and point to the specific object or timeline that needs attention. This is also useful when your project contains several independent animations: name the one you want to change.'),
        text('Keep the portable project file as the source for later editing. For web playback, install @chorono/runtime in your application and follow its exported-scene playback documentation. The runtime is a separate package from the local editor and its MCP setup.'),
        links({ label: 'Runtime installation and web playback', href: '/#runtime' }, { label: 'More animation prompt recipes', href: '/blog/animation-prompts-for-claude-and-codex' }),
      ] },
      { id: 'procedural-motion', heading: 'Can Codex make procedural motion graphics?', blocks: [
        text('Yes, when the connected Chorono editor supports the motion you want. Codex can revise named keyframe tracks and use supported controllers or modifiers for repeated movement such as a pulse or a small shake. The editor keeps those rules in the scene; JavaScript scene scripts run once during authoring, while the player evaluates the saved animation during playback.'),
        text('Try one controlled change in a copy of the loading loop. Ask Codex to inspect the current scene and supported modifier schema first, then add a subtle sine variation to the Middle dot’s vertical position track without replacing its original keys. Check the start, middle and four-second loop boundary before saving. This is an optional exercise; the downloadable project above contains the original keyframed loop.'),
        links({ label: 'Compare keyframed and procedural motion in a real project', href: '/motion-graphics-software#procedural-motion' }, { label: 'Read the controller and modifier guide', href: '/docs/editor/timeline/controllers' }, { label: 'Read the JavaScript scene scripting guide', href: '/docs/scripting' }),
      ] },
      { id: 'troubleshooting', heading: 'Troubleshooting Codex and Chorono', blocks: [
        text('Skills are missing: make sure Codex is working in the project where setup installed .agents/skills. Instructions alone do not register the MCP server, so rerun the documented setup check if the tools are also missing.'),
        text('Tools are present but no scene is available: keep the editor tab open, choose “Connect this editor” and ask Codex to list sessions again. Use doctor to distinguish a configuration problem from an unconnected browser.'),
        text('You need to rebuild or reinstall dependencies: stop the managed editor server first with npm run chorono -- stop. Restart with the start command after the build is complete, then reconnect the editor.'),
        links({ label: 'Chorono skills and their responsibilities', href: '/agent-skills' }, { label: 'Use Claude Code with the same editor', href: '/blog/make-animations-with-claude' }, { label: 'Chorono source documentation', href: 'https://github.com/codie1982/chorono-editor' }),
      ] },
    ],
  },
  {
    slug: 'animation-prompts-for-claude-and-codex',
    title: '6 Animation Prompts for Claude & Codex | Chorono',
    headline: 'Six animation prompts for Claude and Codex',
    description: 'Try six practical animation prompts for Claude Code and Codex in Chorono: title cards, loading loops, logo reveals, explainers, particles and targeted revisions.',
    category: 'Prompt recipes',
    published: '2026-11-04T12:50:46Z',
    image: '/blog/animation-prompts-for-claude-and-codex.png',
    imageAlt: 'A Chorono animation brief connecting a prompt, editable keyframes and a saved project.',
    intro: 'The most useful animation prompts describe what moves, when it moves and what must stay unchanged. These six recipes give Claude Code or Codex a concrete brief for a connected Chorono editor, with editable objects and a review step built in.',
    sections: [
      { id: 'before-you-prompt', heading: 'Before you use these animation prompts', blocks: [
        text('Install Chorono for your agent, start the editor and select “Connect this editor” in its MCP controls. Ask the agent to confirm the connected session and read the current scene before making changes. These prompts assume the chorono authoring skill and MCP tools are available.'),
        text('Use the first five recipes in an empty scene or ask the agent to add them without replacing existing work. The sixth recipe is a revision of an existing animation. Each recipe starts small enough to review visually, and you can change its exact text and colors for your own project.'),
        links({ label: 'Set up Claude Code for animation', href: '/blog/make-animations-with-claude' }, { label: 'Set up Codex for animation', href: '/blog/make-animations-with-codex' }),
      ] },
      { id: 'title-card', heading: '1. An animated title card', blocks: [
        text('Use a title card when the message should be readable at a glance. Give the agent the final copy and a clear hold period so it can allocate time for reading.'),
        prompt('Copy this prompt', 'Use the chorono skill. In the connected editor, create a 6-second title card on a 1024 × 768 cream canvas. Keep the exact text “Small ideas. Real motion.” in dark brown. Fade and move the title upward gently during the first 1.2 seconds. Add a thin rust underline that extends from left to right between 1.2 and 2 seconds. Hold the finished layout until 6 seconds. Keep the text and underline editable and clearly named. Preview at 0, 1.2, 2 and 6 seconds, validate and save a portable project with its path.'),
        text('Check the first readable frame and the final composition. If the title wraps awkwardly, request a line-break or font-size change before adjusting the motion.'),
      ] },
      { id: 'loading-loop', heading: '2. A seamless loading loop', blocks: [
        text('A loop needs a deliberate return to its starting state. Tell the agent to inspect the seam, where a pleasing movement can otherwise turn into a visible jump.'),
        prompt('Copy this prompt', 'Create a 3-second looping animation in Chorono on a 1024 × 768 cream canvas. Place three small rust circles in a centered horizontal row. Move each circle upward and back down with a gentle stagger from left to right. Keep their horizontal positions and sizes fixed. All circles must return to their initial positions at 3 seconds. Use named editable objects, preview the beginning, middle and loop seam, then validate and save the portable scene.'),
        text('Review the transition from the last moment back to the start. Adjust the stagger or travel distance if the loop feels restless.'),
      ] },
      { id: 'wordmark', heading: '3. A simple wordmark reveal', blocks: [
        text('A text wordmark is a practical first logo-style animation because the editable source remains simple. Replace the placeholder word with your exact brand name.'),
        prompt('Copy this prompt', 'In Chorono, create a 5-second reveal for the text wordmark “YOUR BRAND”. Use a 1024 × 768 dark brown canvas and cream text. Fade and scale the wordmark gently from 92% to 100% during the first 1.5 seconds. Add a small rust circle beneath it that appears at 1.5 seconds and settles by 2.2 seconds. Hold until 5 seconds. Keep both elements as named editable objects. Inspect previews for text clipping and alignment, validate and save the portable project.'),
        text('Check the wordmark at both the smallest and final scale. Long names may need a smaller font or a wider margin.'),
      ] },
      { id: 'explainer', heading: '4. A three-step process explainer', blocks: [
        text('Short labels give each stage room to breathe. Define a sequence and a readable final hold instead of asking for everything to move at once.'),
        prompt('Copy this prompt', 'Create a 9-second 2D process explainer in the connected Chorono editor. Use a 1024 × 768 cream canvas. Lay out three evenly spaced cards with the exact labels “Describe”, “Animate” and “Refine”. Reveal the first card from 0 to 1.5 seconds, the second from 2 to 3.5 seconds and the third from 4 to 5.5 seconds. Connect them with simple lines, then hold the complete layout until 9 seconds. Use dark brown text and rust accents. Keep each card, label and connector editable and named. Inspect every stage and the final hold, validate and save a portable project.'),
        text('Read each label at the actual preview size. If cards feel crowded, ask for more spacing or shorter labels before adding decoration.'),
      ] },
      { id: 'particles', heading: '5. A restrained particle accent', blocks: [
        text('Particles work best when their role is clear. Use them to support one focal element and ask the agent to check the editor’s available particle properties first.'),
        prompt('Copy this prompt', 'Use the chorono skill and inspect the supported particle settings before editing. Create a 6-second scene with the exact centered headline “Ready to launch” on a dark brown 1024 × 768 canvas. Keep the text cream and stationary. Add a restrained burst of small rust particles behind the headline near 1 second, with enough clear space to keep the words readable. Let the burst settle before the final hold. Keep the headline and particle system editable and named. Preview before, during and after the burst, validate and save a portable project.'),
        text('Inspect the busiest frame. Reduce particle count, spread or brightness if the accent competes with the headline.'),
      ] },
      { id: 'revision', heading: '6. A focused animation revision', blocks: [
        text('Once the composition is close, a small revision is easier to assess than a complete recreation. Identify the object and describe the visible improvement you want.'),
        prompt('Copy this prompt', 'Read the current Chorono scene and identify the title entrance animation. Keep the exact text, colors, layout and unrelated objects. Make only the title entrance 0.5 seconds slower and reduce its vertical travel by half. Preserve the rest of the timeline. Show previews before, during and after the revised entrance, compare the final position with the original and save a revised portable project. Report the saved file path.'),
        text('If the project contains several titles or timelines, add their names to the request. This makes the intended target explicit and helps preserve other animations.'),
      ] },
      { id: 'template', heading: 'Build your own animation brief', blocks: [
        code('Reusable prompt structure', 'Use the chorono skill in the connected editor.\nPurpose: [what the viewer should understand]\nCanvas and duration: [dimensions, seconds, loop or one-shot]\nExact text: [copy to preserve]\nObjects and colors: [composition and palette]\nTiming: [what moves in each time range]\nPreserve: [existing objects, tracks or layout]\nReview: [preview times and what to check]\nDelivery: validate and save a portable Chorono project; report its path.'),
        text('Treat the first result as a draft you can inspect. Readability, spacing, a clean loop seam and the final hold matter more than adding extra movement. Keep the saved scene as your editable source for the next iteration.'),
        links({ label: 'Understand the Chorono skills', href: '/agent-skills' }, { label: 'Chorono authoring and setup documentation', href: 'https://github.com/codie1982/chorono-editor' }),
      ] },
    ],
  },
]

export const blogPath = (post: BlogPost) => `/blog/${post.slug}`
export const getPost = (slug: string) => BLOG_POSTS.find(post => post.slug === slug)
export function readingMinutes(post: BlogPost) {
  const text = post.sections.flatMap(section => section.blocks.flatMap(block => {
    if ('text' in block) return [block.text]
    if ('items' in block) return block.items.map(item => typeof item === 'string' ? item : item.label)
    if (block.type === 'comparison-table') return block.rows.flatMap(row => Object.values(row))
    return []
  })).join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const metadata = pageMetadata(post.title, post.description, blogPath(post), post)
  return { ...metadata, authors: [GUIDE_AUTHOR], openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.published, modifiedTime: post.modified ?? post.published, authors: [GUIDE_AUTHOR.name], section: post.category } }
}

/** Builds article entities and links each embedded example to its own downloadable source. */
export function blogStructuredData(post?: BlogPost) {
  const exampleIds = [...new Set(post?.sections.flatMap(section => section.blocks.flatMap(block => block.type === 'animation-example' ? [block.exampleId ?? 'ideas-in-motion'] : [])) ?? [])]
  const path = post ? blogPath(post) : '/blog'
  const url = `${SITE_URL}${path}`
  const blogUrl = `${SITE_URL}/blog`
  const imageId = post ? `${url}#article-image` : `${SITE_URL}/#sharing-image`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...editorialSiteEntities(),
      { '@type': 'Blog', '@id': `${blogUrl}#blog`, url: blogUrl, name: 'Chorono Blog', description: BLOG_DESCRIPTION, inLanguage: 'en', publisher: { '@id': `${SITE_URL}/#team` }, isPartOf: { '@id': `${SITE_URL}/#website` } },
      { '@type': post ? 'WebPage' : 'CollectionPage', '@id': `${url}#webpage`, url, name: post?.title ?? BLOG_TITLE, description: post?.description ?? BLOG_DESCRIPTION, inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, primaryImageOfPage: { '@id': imageId }, mainEntity: { '@id': post ? `${url}#article` : `${url}#posts` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Chorono', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
        ...(post ? [{ '@type': 'ListItem', position: 3, name: post.headline, item: url }] : []),
      ] },
      ...(post ? [
        { '@type': 'ImageObject', '@id': imageId, url: `${SITE_URL}${post.image}`, contentUrl: `${SITE_URL}${post.image}`, width: post.imageWidth ?? 1200, height: post.imageHeight ?? 675, caption: post.imageAlt, encodingFormat: post.image.endsWith('.jpg') || post.image.endsWith('.jpeg') ? 'image/jpeg' : 'image/png' },
        { '@type': 'BlogPosting', '@id': `${url}#article`, url, headline: post.headline, description: post.description, image: { '@id': imageId }, author: { '@id': `${SITE_URL}/#team` }, publisher: { '@id': `${SITE_URL}/#team` }, datePublished: post.published, dateModified: post.modified ?? post.published, articleSection: post.sections.map(section => section.heading), inLanguage: 'en', isAccessibleForFree: true, mainEntityOfPage: { '@id': `${url}#webpage` }, isPartOf: { '@id': `${blogUrl}#blog` }, about: { '@id': `${SITE_URL}/#software` }, ...(exampleIds.length ? { hasPart: exampleIds.map(id => ({ '@id': `${SITE_URL}/examples/${id}#work` })) } : {}) },
      ] : [{ '@type': 'ItemList', '@id': `${url}#posts`, name: 'Animation setup and prompt guides', itemListElement: BLOG_POSTS.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.headline, url: `${SITE_URL}${blogPath(item)}` })) }]),
      ...exampleIds.flatMap(id => animationExampleEntities(SITE_URL, id)),
    ],
  }
}
