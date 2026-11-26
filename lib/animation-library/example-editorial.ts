interface ExampleEditorial {
  readonly topic: string
  readonly description: string
  readonly heading: string
  readonly paragraphs: readonly [string, string]
  readonly related: readonly [string, string]
}

export const exampleEditorial: Readonly<Record<string, ExampleEditorial>> = {
  'small-wins': {
    topic: 'Kinetic Typography Poster Animation',
    description: 'Watch two words rise through masks in a Swiss-style kinetic typography poster. Download editable landscape and portrait Chorono projects.',
    heading: 'Make each word land separately',
    paragraphs: [
      'A mask acts like a window in front of each word. The letters move up from behind it, so the neighboring line stays clear. The second word briefly travels past its resting position. That small overshoot puts the emphasis on WINS even though the two words share a typeface.',
      'Open the portrait and landscape versions at the same moment. The word entrances keep their rhythm while the three bars move to fit the narrower poster. When replacing the headline, check the mask edges at the peak of the overshoot and leave time to read the final frame.',
    ],
    related: ['word-in-balance', 'live-from-studio-04'],
  },
  'interactive-hero-panels': {
    topic: 'Interactive Website Hero Animation',
    description: 'Explore four curved hero panels with 600 ms focus transitions, rotating artwork and animated messages. Download the editable Chorono project.',
    heading: 'Give each hero panel its own focus state',
    paragraphs: [
      'The hero uses a shared S-curve profile for four textured panels. Select a category to expand its panel while its neighbors narrow. The focus timeline reveals a headline and an action for that category, and the Artwork timeline cycles the images independently.',
      'The browser renders the original state changes with textures baked from the Chorono Mesh2D layers. The editable file keeps those layers and their original assets, so you can change the panel shape, swap an image or adjust the 600 ms blend.',
    ],
    related: ['open-inspect-close', 'coastal-radar'],
  },
  'coastal-radar': {
    topic: 'Interactive 3D Radar Turntable',
    description: 'Turn a 3D radar dish left or right in an interactive coastal scene. Download the Chorono project to inspect its GLB model, angle states and signal animation.',
    heading: 'Connect each button to a model angle',
    paragraphs: [
      'The Chorono project defines three views. A parameter wire carries the active timeline’s value to the radar’s Y-axis rotation, and the readout shows the offset from the neutral view. The left and right controls also trigger a separate pulse on the copper signal lamp.',
      'The browser demo plays frames rendered from the Chorono scene in response to each turn. Open the editable project to change the model, blend timing, camera or angle range, and preview the state machine alongside the 2D interface.',
    ],
    related: ['open-inspect-close', 'choose-your-plant'],
  },
  'night-dispatch': {
    topic: '2D Motorcycle Animation',
    description: 'Watch a 2D motorcycle cross an uneven harbor road from sunset to moonrise. Download the editable Chorono project and study the rider, suspension and lighting.',
    heading: 'Track the wheels through each bump',
    paragraphs: [
      'Around 2.1 seconds the front wheel reaches a crest, and the rear wheel follows around 2.4 seconds. The front mudguard follows its axle. The rider’s fixed-length IK chains flex at the elbow and knee while the wrist and ankle targets stay linked to the handlebar and footrest.',
      'The torso and helmet respond to the chassis with damped motion. Their Bézier shapes and the woven Mesh2D scarf remain editable. Scrub through the sunset to see the daylight title fade before the night title and headlamp take over.',
    ],
    related: ['wind-up-walker', 'cat-stretch'],
  },
  'live-from-studio-04': {
    topic: 'Broadcast Lower Third Animation',
    description: 'Study a seven-second animated lower third with two masked text reveals and a staggered exit. Download the editable broadcast title project.',
    heading: 'Keep the name legible over footage',
    paragraphs: [
      'A lower third identifies a speaker or program while leaving room for the shot. Here the red rule establishes the position before the presenter name and program label enter. The two masks give each line a clean edge without covering the upper part of the image.',
      'Check the name at the first fully visible frame and again at the start of the exit. When replacing the sample copy, set the mask width to fit the name, then test the lower third over a bright shot and a dark one.',
    ],
    related: ['small-wins', 'night-service'],
  },
  'night-service': {
    topic: 'Dot Matrix Text Animation',
    description: 'Watch a vertical departure board build amber letters column by column. Download a dot matrix animation with editable dots and timing.',
    heading: 'Build letters from a fixed grid',
    paragraphs: [
      'The amber lettering uses an arrangement of dots like a station display. The lit columns travel across that stationary grid. The letter shapes stay aligned as the message builds because every column starts from the same spacing.',
      'Test a word with a wide letter such as M and a narrow letter such as I. Keep the column cadence steady and give the full message a readable hold. Changing the spacing by moving its keys together preserves the sweep.',
    ],
    related: ['word-in-balance', 'three-signals'],
  },
  'word-in-balance': {
    topic: 'Bauhaus Typography Animation',
    description: 'See four Bauhaus word tiles slide, tip around their bottom edges and settle. Download the editable typography animation and study its pivots.',
    heading: 'Use the baseline as a hinge',
    paragraphs: [
      'Each colored tile behaves like a piece of card with its lower edge resting on a table. A pivot placed on that edge keeps the type in contact with the baseline as it tilts. The stagger makes it possible to see the first tile settle while the next one is still moving.',
      'Scrub to the widest tip and check the corners of neighboring tiles for overlap. A stronger tilt may need more spacing. Keep enough time at the end for all four letters to read as one word.',
    ],
    related: ['small-wins', 'folded-bridge'],
  },
  'price-of-the-everyday': {
    topic: 'Editorial Collage Animation',
    description: 'Watch a newspaper-style animation unfold three paper panels about bread prices. Download the editable collage and study the reveal order.',
    heading: 'Give each paper strip one idea',
    paragraphs: [
      'The headline sets up a question about the cost of bread. Flour, heat and transport then arrive on separate paper strips. Each strip changes the composition and adds a single cause, so the viewer can follow the explanation in the order it appears.',
      'When adapting the scene, give each panel a short label and choose a fold direction that keeps the headline readable. Watch once with the sound off. The labels should still convey the sequence before the final arrangement settles.',
    ],
    related: ['packing-notes', 'how-light-gets-in'],
  },
  'upload-complete': {
    topic: 'Upload Progress Bar Animation',
    description: 'Watch an upload progress bar pause at 75% and turn into a completion checkmark. Download the editable UI animation and its timing.',
    heading: 'Connect progress and completion',
    paragraphs: [
      'The copper fill measures progress, the number states it, and the checkmark confirms that the task finished. The brief pause before the last advance separates waiting from completion. In an application, connect the completed state to the actual upload response.',
      'When you adjust the pause in this Chorono timeline, watch both the width and the percentage label. At the handoff to the confirmation, the visual state and the wording should describe the same result.',
    ],
    related: ['goal-ring', 'three-signals'],
  },
  'three-signals': {
    topic: 'Loading Dots Animation Loop',
    description: 'Watch three staggered dots loop inside a translucent loading indicator. Download the editable Chorono scene and compare the first and last frames.',
    heading: 'Keep a continuous loading rhythm',
    paragraphs: [
      'Three phase-shifted dots communicate that a task is still running. Each dot follows the same lift and stretch, delayed by 150 milliseconds. That delay carries the movement from one dot to the next and keeps the capsule itself steady.',
      'Play two repeats after changing the height or spacing. The loop should join cleanly at its boundary, and the highest dot should fit inside the capsule. For an interface that knows the percentage done, try the progress-bar example as well.',
    ],
    related: ['upload-complete', 'one-more-reply'],
  },
  'four-fridays': {
    topic: 'Animated Column Chart Example',
    description: 'Watch four Friday values grow on a common scale in this animated column chart. Download the editable bars, labels, and comparison.',
    heading: 'Make an animated comparison fair',
    paragraphs: [
      'All four bars rise from zero and use the same 0–40 scale. The first Friday reads 18 and the last reads 32, so the final annotation reports a 14-point increase. The shared baseline keeps the comparison clear as each column comes into view.',
      'When you substitute your own values, recalculate the heights against one scale and update the final difference. Check the intermediate frames for any labels that announce a value before its column finishes growing.',
    ],
    related: ['three-ways-in', 'a-better-baseline'],
  },
  'goal-ring': {
    topic: 'Circular Progress Animation',
    description: 'See a circular progress ring fill clockwise to 72 of 100. Download the editable arc trim, target tick and counter from the Chorono project.',
    heading: 'Tie the ring angle to the counter',
    paragraphs: [
      'The ring starts at twelve o’clock. Its trim defines how much of the circumference is visible, while a fixed tick shows the destination. At the final pose, 72 out of 100 occupies 72 percent of a full turn, or 259.2 degrees from the start.',
      'Change the final value, then move the tick and revise the arc end in the same edit. Scrub to the middle of the motion and check whether the displayed number still corresponds to the visible arc.',
    ],
    related: ['upload-complete', 'orbit-letters'],
  },
  'parcel-route': {
    topic: 'Spline Motion Path Animation',
    description: 'Follow a parcel along an editable S-curve with two waypoint pauses. Download the Chorono project to inspect path motion and stroke trim.',
    heading: 'Synchronize the marker and the route',
    paragraphs: [
      'One spline defines the parcel’s location and the route it appears to draw. Follow Path progress controls the parcel. Stroke trim controls how much copper line is visible behind it. Both values hold during the waypoint pauses so the parcel and the trace stop together.',
      'After reshaping the S-curve, preview the direction changes around each stop. Check that the parcel still meets the waypoint before the trace continues. Use the two-train example to see the same idea applied to simultaneous routes.',
    ],
    related: ['two-routes-to-the-station', 'anatomy-of-a-knot'],
  },
  'circle-to-seed': {
    topic: 'Shape Morphing Animation',
    description: 'Study a four-anchor shape morph from a circle into a pointed seed. Download the editable spline, handles and interior detail from Chorono.',
    heading: 'Preserve the point order through the morph',
    paragraphs: [
      'The circle and seed share the same four spline anchors. Moving the anchors and their handles makes a continuous silhouette between the two poses. The inner vein arrives after the outer contour has established the seed shape.',
      'Compare the halfway frame with the two endpoints. Watch for a squeezed corner or an unexpected twist caused by a shifted point. Adjust the handles of the existing anchors to soften the tip while preserving their order.',
    ],
    related: ['anatomy-of-a-knot', 'dandelion-drift'],
  },
  'bounce-study': {
    topic: 'Squash and Stretch Animation Example',
    description: 'Watch a rubber character anticipate, jump and squash on landing. Download the editable Chorono animation to study timing and floor contact.',
    heading: 'Put the deepest squash on contact',
    paragraphs: [
      'The pose before takeoff prepares the viewer for the jump. The body stretches in the air, then compresses briefly once it meets the ground. Keeping the pivot at floor contact lets the silhouette spread sideways while its feet stay planted.',
      'Check the landing one frame at a time. The strongest compression should come at contact or just after it. If a larger squash makes the eyes hard to read, protect the facial shapes and let the body carry more of the deformation.',
    ],
    related: ['cat-stretch', 'drop-and-settle'],
  },
  'quiet-orbit': {
    topic: 'Astronaut Character Eye Animation',
    description: 'See an astronaut’s eyes track a star with an offset blink and helmet tilt. Download the editable cutout character and gaze timing.',
    heading: 'Lead with the eyes',
    paragraphs: [
      'The passing star gives the astronaut a visible point to follow. The pupils start the reaction, then the blink and helmet tilt arrive at different times. That separation makes the small character’s attention easier to see than if every part moved together.',
      'Try moving the star sooner and keep the first glance a little behind it. At the extremes, check that the pupils remain inside the eye shapes. Changing the blink separately lets the expression evolve without rewriting the whole shot.',
    ],
    related: ['wind-up-walker', 'cat-stretch'],
  },
  'copper-sparks': {
    topic: 'Spark Particle Animation',
    description: 'Watch a copper plate break as a seeded particle emitter adds sparks. Download the Chorono project and edit the burst and large fragments.',
    heading: 'Separate plate fragments from sparks',
    paragraphs: [
      'The solid pieces carry the weight of the impact. Sparks occupy their own emitter, so their color, density and lifespan can change independently of the plate. A seed is the starting value that makes the same random-looking burst repeat during review.',
      'Keep the first spark close to the breaking frame. Adjust the emitter before changing the fragment bake, and review at normal speed. A dense burst makes it harder to see the large pieces break away.',
    ],
    related: ['porcelain-crack', 'soft-rain'],
  },
  'drop-and-settle': {
    topic: 'Rigid Body Physics Animation',
    description: 'Compare three rigid bodies falling, bouncing and settling on one floor. Download the Chorono scene with the editable simulation and contacts.',
    heading: 'Compare bounce, tumble and settle',
    paragraphs: [
      'The three bodies start from different heights and use different physical settings, then meet a shared floor. Restitution controls the bounce after contact. Friction changes the slide along the floor. A rounded collision shape helps the first body behave differently from a wide block.',
      'A bake saves the solver’s motion as editable keys. Change one body property and bake again before comparing. Check both the first impact and the point where the body comes to rest, because a higher bounce can also change the length of the settle.',
    ],
    related: ['folded-bridge', 'packing-notes'],
  },
  'field-recorder': {
    topic: 'Exploded View Product Assembly Animation',
    description: 'Watch a recorder assemble from editable panels and switch into a recording state. Download the product animation and inspect the timing.',
    heading: 'Follow the device from parts to use',
    paragraphs: [
      'The detached panels show the recorder’s construction before they close around the case. Once the assembly is readable, the record button and display shift attention to what the device does. That change gives the assembly and the action separate moments in the shot.',
      'When changing the layout, keep the relative alignment of the display, controls and housing. Review both the spread-out pose and the assembled pose. The key detail should still be readable as the camera moves closer.',
    ],
    related: ['desk-lamp', 'prompt-to-playback'],
  },
  'desk-lamp': {
    topic: 'Articulated Desk Lamp Animation',
    description: 'Watch an articulated desk lamp unfold and light the surface below. Download the Chorono project to inspect the joints and gradient cone.',
    heading: 'Keep the light attached to the shade',
    paragraphs: [
      'The hinged arm directs the eye to the shade before the light appears on the surface. The illumination comes from an editable gradient cone. Its opening and direction follow the changing lamp pose, which keeps the light readable as part of the object.',
      'After changing an elbow or shade angle, scrub through the entire turn. The cone should meet the shade opening without slipping across the hinge. Check the end of the beam and the final highlight together when you change the crop.',
    ],
    related: ['one-pour', 'how-light-gets-in'],
  },
  'how-light-gets-in': {
    topic: 'Electrical Circuit Animation',
    description: 'Watch a copper trace follow a simple switch and lamp circuit. Download the editable animated diagram with labeled nodes and narration.',
    heading: 'Show when the path becomes complete',
    paragraphs: [
      'The diagram introduces the supply, switch, wire and lamp as distinct parts. Closing the switch gives current a complete path. The copper trace follows the route to the lamp, and the glow gives the final state a clear visual cue.',
      'This is a schematic explainer. Use the labels and the direction of the trace to follow the sequence, then check that the lamp lights after the switch changes state. If the route moves, align the guide and highlighted stroke.',
    ],
    related: ['parcel-route', 'desk-lamp'],
  },
  'same-distance-different-feel': {
    topic: 'Animation Easing Comparison',
    description: 'Compare linear, ease-out and ease-in-out motion on identical lanes. Download the editable Chorono project to inspect the keyframe curves.',
    heading: 'Compare speed on an equal course',
    paragraphs: [
      'All three dots cover the same distance in the same amount of time. The linear dot moves at constant speed. The ease-out dot starts faster and slows near the end. The ease-in-out dot builds speed before slowing down to arrive.',
      'Watch the middle of the first pass, then look just after departure on the repeat. Those two moments reveal different parts of each curve. To isolate the effect yourself, keep the start and finish keys fixed while changing the easing.',
    ],
    related: ['bounce-study', 'comfort-control'],
  },
  'better-search': {
    topic: 'Command Palette Search Animation',
    description: 'Watch a command palette type a query, move through search results and open an export dialog. Download the editable UI motion project.',
    heading: 'Move focus between query, result and dialog',
    paragraphs: [
      'A command palette presents actions in a searchable list. The amber focus frame moves between results before the export dialog takes over. Watch the first second of the handoff. The highlighted result tells you which action opened the next panel.',
      'When adapting this interface motion for another command, change the query, selected row and dialog title together. Keep the selected row visible long enough to identify it. The editable layers let you test that hierarchy before implementing the interface.',
    ],
    related: ['upload-complete', 'prompt-to-playback'],
  },
  'one-more-reply': {
    topic: 'Chat Bubble and Typing Indicator Animation',
    description: 'Watch pastel chat bubbles rise into a vertical conversation and a typing indicator precede the last reply. Download the editable project.',
    heading: 'Make the pause tell the story',
    paragraphs: [
      'The first two bubbles introduce the conversation. The typing dots create a short pause that prepares the reader for the answer. Movement in the earlier bubbles makes space for the final message without changing who sent each line.',
      'Test revised copy at the narrowest intended crop. If the bubble needs a second line, check its timestamp and the positions of the neighboring messages. Adjust the wait after the typing indicator before changing its bounce speed.',
    ],
    related: ['three-signals', 'better-search'],
  },
  'comfort-control': {
    topic: 'Thermostat Dial Animation',
    description: 'Watch a mechanical thermostat dial tick from 18° to 22° and settle. Download editable needle rotation, number changes and indicator layers.',
    heading: 'Make the dial advance in steps',
    paragraphs: [
      'The pointer moves around the center of the dial. The number changes at discrete points, giving the motion the feel of a knob with marked stops. A small overshoot at the final stop suggests that the mechanism has settled into position.',
      'To adapt the dial, set the final label first and match its angle to the marked scale. Then watch the transition from 21 to 22. The warm status should appear after the pointer settles so users see which setting was chosen.',
    ],
    related: ['goal-ring', 'same-distance-different-feel'],
  },
  'a-better-baseline': {
    topic: 'Animated Line Chart Example',
    description: 'Watch an animated line chart draw six weekly readings and call out the change at 19. Download the editable spline, markers and annotation.',
    heading: 'Reveal the evidence before the annotation',
    paragraphs: [
      'The six readings share one scale. A trimmed spline reveals the line in chronological order, and each marker becomes visible near the moment the trace reaches it. The copper callout identifies the rise at the fourth reading, after the earlier readings give it context.',
      'If a reading changes, move the point, marker and label together. Then check where the annotation intersects the line. Keep the axis and the finished values available long enough for the viewer to compare the first and final readings.',
    ],
    related: ['four-fridays', 'demand-by-hour'],
  },
  'three-ways-in': {
    topic: 'Animated Horizontal Bar Chart',
    description: 'Watch three horizontal bars compare referral, search and direct traffic. Download editable bar lengths, percent labels and the lead callout.',
    heading: 'Keep labels aligned to changing values',
    paragraphs: [
      'The category labels stay in place while their bars grow from the same origin. Percentages travel with the right-hand ends. The comparison uses 48 percent referrals, 32 percent search and 20 percent direct. A separate callout emphasizes referrals after all three values are visible.',
      'For new data, sort the values and calculate each width on a common scale. Leave extra space at the end of the longest bar for its label. Check that the callout follows the winning channel if the ranking changes.',
    ],
    related: ['four-fridays', 'a-better-baseline'],
  },
  'demand-by-hour': {
    topic: 'Animated Heatmap Example',
    description: 'See an animated heatmap reveal eight support-demand columns across five days. Download the editable cells, intensity scale and peak markers.',
    heading: 'Use color to show the whole pattern',
    paragraphs: [
      'The rows represent days and the columns represent hours. A four-step legend tells the viewer how to read the violet and coral cells. Once the grid is visible, separate outline strokes pick out three midday peaks without changing the underlying color scale.',
      'Keep the legend in frame when adapting this animation for a different dataset. Review the completed grid in grayscale to see whether nearby intensities remain distinguishable. The outline and its position should still identify the peaks when color is hard to distinguish.',
    ],
    related: ['a-better-baseline', 'three-ways-in'],
  },
  'folded-bridge': {
    topic: 'Paper Folding Animation with 2D Physics',
    description: 'Watch three paper bridge panels unfold and an amber marble drop onto them. Download the hinge animation and baked rigid-body motion.',
    heading: 'Let the bridge open before the marble drops',
    paragraphs: [
      'Three span groups rotate around their hinges while the thickness shadows define their edges. The marble enters after the panels settle. The visible paper artwork and the collision surfaces serve separate roles, so the lighting and folds can be adjusted without redesigning the marble path.',
      'After moving a span, align its collision surface to the drawn edge and run the rigid-body bake again. Watch the marble at the join between two panels. That is where a small gap or offset becomes easiest to see.',
    ],
    related: ['drop-and-settle', 'packing-notes'],
  },
  'orbit-letters': {
    topic: 'Elliptical Orbit Animation',
    description: 'Study an eight-second loop with three chrome letter tiles on an elliptical path. Download the foreground and background passes in Chorono.',
    heading: 'Use layer order to sell depth',
    paragraphs: [
      'The letters move around an ellipse while the center title holds still. Foreground and background passes place tiles on the appropriate side of that title. Scaling and opacity help carry the depth cue through the crossing, where the tiles change apparent distance.',
      'Preview two loops after changing the number of tiles or spacing. The start and end positions need to match. At the crossover, check both versions of a tile for a visible double image before you adjust the handoff.',
    ],
    related: ['parcel-route', 'goal-ring'],
  },
  'anatomy-of-a-knot': {
    topic: 'Knot Animation with Trimmed Splines',
    description: 'See a blue rope draw across technical paper and reveal its over-and-under crossing. Download the editable splines and crossing labels.',
    heading: 'Make the overpass readable',
    paragraphs: [
      'A trimmed spline draws the rope while a second stroke gives its edge some depth. At the overlap, a distinct overpass layer makes one strand visibly cross the other. The copper leaders name the two sides, giving the viewer an easy way to check what they see.',
      'If the crossing moves, adjust the colored outlines and overpass together. Inspect the moment the stroke enters the overlap. Leaving the masking or crossing pieces behind can make a continuous rope read as two separate lines.',
    ],
    related: ['circle-to-seed', 'parcel-route'],
  },
  'the-lantern-keeper': {
    topic: 'Paper Cutout Character Animation',
    description: 'Watch a cutout lantern keeper walk with a deforming coat and a swinging light. Download the editable character rig and cabin scene.',
    heading: 'Separate the walk, cloth and light',
    paragraphs: [
      'The boots and wrist move on separate pivots. The coat uses a textured mesh with pinned shoulder vertices, so its hem can follow through while the shoulders stay attached. A separate light pool makes the lantern readable as the character crosses the trail.',
      'Scrub from a planted step to the cabin door. Watch the point where the hand holds the lantern and the point where the light meets the ground. Those contacts help the cutout feel anchored when you change the walk timing.',
    ],
    related: ['cat-stretch', 'the-lantern-archive'],
  },
  'wind-up-walker': {
    topic: 'Robot Walk Cycle Animation',
    description: 'Watch a tin robot march with opposing arm and leg swings. Download the editable walk cycle and the winding key’s separate spin-down.',
    heading: 'Stop the feet before the mechanism',
    paragraphs: [
      'The arms swing opposite the legs while the toy moves across a fixed horizon. The winding key has its own axle timing. It keeps turning after the feet stop, which gives the toy a mechanical follow-through and separates the stop from the final rest.',
      'To revise the walk cycle, mark the contact frame for each foot. Pause there and check its position against the tabletop. When the stride changes, adjust forward travel and the leg timing together to reduce sliding.',
    ],
    related: ['the-lantern-keeper', 'bounce-study'],
  },
  'cat-stretch': {
    topic: 'Cat Stretch Animation with 2D Mesh Deformation',
    description: 'See a painted cat extend its front paws while pinned Mesh2D points hold its rear. Download the editable mesh, texture and tail rig.',
    heading: 'Anchor the rear while the body stretches',
    paragraphs: [
      'Pinned points on the mesh hold the rear of the cat in place. The painted body stretches toward the head and forepaws, and the applied texture moves with the mesh. The tail and face keep their own timing, allowing the stretch to finish with a curl and a blink.',
      'Inspect the halfway pose when adjusting the stretch. The feet should remain planted and the texture should follow the body without a visible crease. Compare the return pose with the opening silhouette to spot any unintentional drift.',
    ],
    related: ['dandelion-drift', 'the-lantern-keeper'],
  },
  'dandelion-drift': {
    topic: 'Dandelion Seed and Wind Animation',
    description: 'Watch a pinned Mesh2D stem bend and release drifting dandelion seeds. Download the textured mesh, seed layers and particle emitter.',
    heading: 'Connect a rooted stem to free-moving seeds',
    paragraphs: [
      'The root stays pinned while the stem bends and the seed head follows. Individual filaments and a separate particle emitter make the release visible. The plant bends first, so the airborne motion reads as a result of the gust.',
      'Try changing the wind timing before changing the number of particles. Watch the head and the first group of loose seeds at the release frame. Their positions and direction should agree before the longer drift and fade take over.',
    ],
    related: ['cat-stretch', 'soft-rain'],
  },
  'porcelain-crack': {
    topic: '2D Voronoi Fracture Animation',
    description: 'Watch a porcelain disc break into 21 pieces in a 2D Voronoi fracture. Download the Chorono project with fragments, dust and baked motion.',
    heading: 'Inspect the original shape and the fracture bake',
    paragraphs: [
      'A Voronoi fracture splits a surface into cells based on a set of seed points. At 2.2 seconds the original disc gives way to 21 fragments. A separate dust pass keeps the small particles independent of the ceramic pieces that hit the floor.',
      'Compare the intact disc, the first frame of separation and the settled fragments. A new seed changes the cut pattern. Bake the motion again after changing it, then check that the pieces lie on the floor and the break still matches the sound cue.',
    ],
    related: ['copper-sparks', 'record-sleeve'],
  },
  'soft-rain': {
    topic: 'Rain Particle Animation and Ripples',
    description: 'Watch seeded rain streaks cross a blue window while four contact ripples expand. Download the editable emitter, splines and ripple keys.',
    heading: 'Separate falling rain from surface contact',
    paragraphs: [
      'The emitter builds the rain field, foreground rivulets draw trails on the glass, and individual ripples mark drops reaching a surface. Moving those elements on different layers gives the eye several depths to track in the vertical frame.',
      'Change the emitter density and keep the ripple timing steady for the first comparison. Review the top of the frame as well as the reflections at the bottom. A clearer title area makes the visible rain easier to read in a narrow crop.',
    ],
    related: ['dandelion-drift', 'copper-sparks'],
  },
  'packing-notes': {
    topic: 'Product Packing Animation with Physics',
    description: 'Watch three accessories land in felt trays before a final packing list. Download the editable portrait motion design and rigid-body tracks.',
    heading: 'Cut on the change of product',
    paragraphs: [
      'Each accessory lands inside a similarly framed tray, then a full-frame wipe brings in the next color field. The repeated framing makes the product change easy to follow. The last shot puts the three items together as an inventory.',
      'When swapping items, test each release and contact before changing the wipe. A heavier-looking item can settle in fewer movements than a light one. Re-bake the drop after changing the collision shape and check its final position against the felt cavity.',
    ],
    related: ['folded-bridge', 'price-of-the-everyday'],
  },
  'record-sleeve': {
    topic: 'Animated Album Cover with Style Transitions',
    description: 'Watch a vinyl sleeve shift from Bauhaus print to halftone and pixel art. Download the cover layers, record grooves and Voronoi fragments.',
    heading: 'Keep the disc steady through the style changes',
    paragraphs: [
      'The record shares a center and visible outline across the poster, halftone and pixel looks. The unchanged center gives the viewer a detail to follow as each print treatment takes over. The cover’s fracture makes the final transition visible as pieces move into the foreground.',
      'Try replacing the sleeve art while keeping the position of the spindle hole consistent. Review the turn where the label faces the viewer and the frame where the pixels appear. Both should read clearly before and after the fracture.',
    ],
    related: ['atelier-in-eight-styles', 'porcelain-crack'],
  },
  'one-pour': {
    topic: 'Liquid Pouring Animation with a 3D Bottle',
    description: 'See a 3D bottle pour along a 2D spline into a masked ceramic cup. Download the editable GLB bottle, liquid surface and fill animation.',
    heading: 'Join 3D bottle motion to a 2D liquid mask',
    paragraphs: [
      'The GLB bottle turns around its neck in the 2D composition. A spline draws the pour from the mouth and a separate mask confines the rising fill to the inside of the cup. The final ripple gives the last drop a visible contact point.',
      'Open the project in Chorono and inspect the start of the flow. If you change the bottle angle, realign the start of the spline to the mouth. Scrub to the maximum fill and check for any liquid visible outside the cup silhouette.',
    ],
    related: ['desk-lamp', 'soft-rain'],
  },
  'choose-your-plant': {
    topic: 'Interactive Plant Card Animation',
    description: 'Try Fern, Aloe and Mint cards with selectable care notes. Download the editable Chorono state machine, hover poses and selection states.',
    heading: 'Try the selection states in the browser',
    paragraphs: [
      'The same three cards can be explored in any order. Choose a plant to reveal its care note, then choose another or use Reset. Hover and selection each have poses in the scene. The button controls also let you move through the three choices with a keyboard.',
      'A state machine defines which pose belongs to each interaction. If you edit a care note, test selecting a different plant directly after it and then resetting the demo. The previously selected note should give way to the new one.',
    ],
    related: ['open-inspect-close', 'one-more-reply'],
  },
  'open-inspect-close': {
    topic: 'Expandable Card Animation',
    description: 'Open an interactive museum card to inspect three vessel parts, then close it and reset the view. Download the editable panel and state machine.',
    heading: 'Give the panel a clear return path',
    paragraphs: [
      'Open inspection shifts the artifact aside and reveals a panel with three part labels. Close inspection returns to the centered card. The rendered example shows the label stagger, and the browser demo uses the saved open and closed poses.',
      'Activate both controls with Enter or Space and check that the selected state follows your action. If a longer label changes the panel width, test the opening position and the closed position at a narrow viewport so both remain readable.',
    ],
    related: ['choose-your-plant', 'better-search'],
  },
  'two-routes-to-the-station': {
    topic: 'Animated Metro Route Map',
    description: 'Watch express and local trains follow editable routes from Harbor to North Station. Download the splines, transfer stops and arrival labels.',
    heading: 'Give the two routes comparable timing',
    paragraphs: [
      'The trains leave together, wait at different interchange stations and reach the same destination at different times. Copper and mint distinguish the paths. Station labels stay fixed so the viewer can compare each train’s position against the same reference points.',
      'For a new route, update the marker keys, drawn trace and printed arrival time together. Watch where routes cross or share a station. At those points, color and label placement should still make it possible to follow both trains.',
    ],
    related: ['parcel-route', 'a-better-baseline'],
  },
  'prompt-to-playback': {
    topic: 'Motion Graphics Product Launch Animation',
    description: 'Watch a written brief turn into a copper ribbon animation and an editable timeline. Download the Chorono project behind the product short.',
    heading: 'Show how a brief becomes a project',
    paragraphs: [
      'The film begins with a typed brief, then shows the ribbon motion that the brief describes. The final timeline gives the viewer a place to connect the result with the layers that made it. The three beats explain a workflow in nineteen seconds.',
      'When studying the downloadable project, scrub from the last typed word to the first clear ribbon shape. Try changing the brief and keeping the transition timed to an action. That way the workflow stays legible when the result changes.',
    ],
    related: ['better-search', 'field-recorder'],
  },
  'atelier-in-eight-styles': {
    topic: 'Mixed Media Animation with Eight Art Styles',
    description: 'Watch a paper boat and raven move through eight art styles. Download the editable short to inspect its textured meshes and style transitions.',
    heading: 'Carry one gesture through the style changes',
    paragraphs: [
      'The paper fold, raven and window give the eye three places to return to as the artwork changes. The character’s pose carries across the cuts while the textures and palettes change. The boat’s flight gives the later shots a clear direction.',
      'Compare frames on either side of a style cut, then play through at normal speed. The hand and boat should stay in places the viewer can find again. Each painting remains available as its own textured mesh, so the timing of the changes can be revised in the project.',
    ],
    related: ['record-sleeve', 'cat-stretch'],
  },
  'the-lantern-archive': {
    topic: 'Painted 2D Animated Short Film',
    description: 'Follow a lantern keeper through a museum and three painted worlds. Download the editable short film to inspect its character and scene transitions.',
    heading: 'Use the lantern to connect the painted worlds',
    paragraphs: [
      'The museum establishes the frame before the lantern keeper steps into a painting. The glowing lantern carries through the different worlds and helps the viewer locate the character. Returning to the gallery gives the journey a recognizable end point.',
      'When scrubbing the project, look for the position of the light just before and after each cut. The scenery can change substantially while the movement still has a clear direction. The standalone Lantern Keeper study shows the walking and cloth detail at a closer scale.',
    ],
    related: ['the-lantern-keeper', 'atelier-in-eight-styles'],
  },
}
