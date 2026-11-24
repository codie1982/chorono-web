import type { SkillExample } from './catalog'

export const catalogMotionExamples: readonly SkillExample[] = [
  {
    "slug": "better-search",
    "title": "Better Search",
    "family": "interface",
    "category": "Command palette animation",
    "libraryCategory": "style-animations",
    "description": "An editable command palette types a search, steps through three results and opens a separate export dialog.",
    "posterAlt": "Dark command palette beside an amber-framed export dialog.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Animate a fictional command palette searching for 'export frames'. Add the characters in short bursts over two seconds. Reveal three result rows with descending opacity delays. Move an amber selection frame down one row, confirm it, and settle on a separate Export dialog group. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.5–2.4 s",
        "label": "Type and reveal",
        "detail": "The search appears in bursts, then all three editable results come into view."
      },
      {
        "time": "3.1–7.0 s",
        "label": "Select the export",
        "detail": "An amber selection moves to Export frames and the dialog takes over."
      }
    ],
    "revision": "Change the result order and move the selection keys to match.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "one-more-reply",
    "title": "One More Reply",
    "family": "interface",
    "category": "Vertical chat animation",
    "libraryCategory": "style-animations",
    "description": "Three pastel message bubbles settle into a vertical chat as a typing indicator builds anticipation for the last reply.",
    "posterAlt": "Pastel chat cards with a lavender reply and two peach messages.",
    "durationSeconds": 8,
    "width": 720,
    "height": 1280,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 720 × 1280 px. Build a three-message conversation between Ari and Jo about a shared sketch. Let each bubble rise 24px with a soft scale settle, and push the older bubbles up as space is needed. Pause 600ms on a typing indicator before the final reply. Keep each bubble, text block, and timestamp editable. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.8–3.1 s",
        "label": "Build the exchange",
        "detail": "Two separate bubbles rise into the thread with independent text and timestamp layers."
      },
      {
        "time": "4.1–6.5 s",
        "label": "Reveal the reply",
        "detail": "The typing dots lift while the last message makes room in the conversation."
      }
    ],
    "revision": "Change the pause before the last message and shift the typing cue with it.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "comfort-control",
    "title": "Comfort Control",
    "family": "interface",
    "category": "Thermostat dial animation",
    "libraryCategory": "style-animations",
    "description": "A cream mechanical thermostat rotates through discrete temperature stops, overshoots and settles at 22 degrees.",
    "posterAlt": "Cream thermostat with a copper pointer and a 22-degree readout.",
    "durationSeconds": 7,
    "width": 960,
    "height": 960,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 7-second scene at 960 × 960 px. Design a thermostat dial marked 18, 20, 22, and 24. Rotate the indicator from 18 to 22 between 1–3s with a slight overshoot. Light the intermediate ticks as they pass and change the center number only at marked values. Hold 22 and a WARM label from 4.5s. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "1.0–3.4 s",
        "label": "Turn the needle",
        "detail": "The needle pivots through its marks as the copper arc and numeric readout advance."
      },
      {
        "time": "4.5–7.0 s",
        "label": "Hold the setpoint",
        "detail": "The warm indicator enters after the needle settles."
      }
    ],
    "revision": "Change the stopping temperature and keep the numeric key and indicator aligned.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "a-better-baseline",
    "title": "A Better Baseline",
    "family": "data",
    "category": "Animated line chart",
    "libraryCategory": "style-animations",
    "description": "A technical line chart draws six measurements and calls out the inflection at nineteen.",
    "posterAlt": "Indigo line chart with six points and a copper annotation at nineteen.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Plot six labeled readings: 12, 14, 13, 19, 22, and 21. Draw the line left to right during 0.8–4s and reveal each editable marker only after the line reaches it. Add a small annotation to the break at 19, then settle on the complete chart for two seconds. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.8–4.1 s",
        "label": "Draw the readings",
        "detail": "The spline and six data markers build from left to right."
      },
      {
        "time": "3.1–7.0 s",
        "label": "Mark the change",
        "detail": "A copper leader calls attention to the rise at nineteen, with English narration."
      }
    ],
    "revision": "Edit one reading and move its point and label together.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    },
    "englishCaptions": true
  },
  {
    "slug": "three-ways-in",
    "title": "Three Ways In",
    "family": "data",
    "category": "Animated bar chart",
    "libraryCategory": "style-animations",
    "description": "Three color-coded acquisition bars grow from a shared baseline with percentages that travel with each bar.",
    "posterAlt": "Orange, mint and lavender horizontal bars show three acquisition percentages.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Compare referrals 48%, search 32%, and direct 20%. Extend three horizontal bars from a shared left edge, each after a 160ms delay. Place values at the moving ends and lock the category labels on the left. Give referrals a clear accent only after all bars finish. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.8–2.8 s",
        "label": "Grow the bars",
        "detail": "Referrals, search and direct start in quick succession from one fixed baseline."
      },
      {
        "time": "3.8–5.0 s",
        "label": "Call out the lead",
        "detail": "A separate label singles out referrals after the comparison is legible."
      }
    ],
    "revision": "Change all percentages and verify that the new bar lengths use the same baseline.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "demand-by-hour",
    "title": "Demand by Hour",
    "family": "data",
    "category": "Animated demand heatmap",
    "libraryCategory": "style-animations",
    "description": "A five-day support heatmap opens column by column and outlines the three priority midday cells.",
    "posterAlt": "Violet heatmap with coral peak cells and a four-step legend.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Build a five-row, eight-column heatmap for fictional support demand. Use base values [1,2,3,4,4,3,2,1] on Monday and alternate that pattern with [1,1,2,3,4,3,2,1] on later days. Reveal a column every 120ms. Label the four-step scale and outline three peak cells. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.9–2.4 s",
        "label": "Populate the heatmap",
        "detail": "Forty editable cells appear in timed waves over eight columns."
      },
      {
        "time": "4.6–5.8 s",
        "label": "Highlight three peaks",
        "detail": "Independent spline contours outline midday demand in three cells."
      }
    ],
    "revision": "Change the selected peak cells and move each contour to its new location.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "folded-bridge",
    "title": "Folded Bridge",
    "family": "spline-shape",
    "category": "Paper bridge and rigid-body animation",
    "libraryCategory": "style-animations",
    "description": "Three cut-paper spans unfold and an amber marble drops onto the bridge in a baked rigid-body simulation.",
    "posterAlt": "Amber marble above three folded paper spans in a layered mountain landscape.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Build a small paper bridge from three colored panel groups. Open the first panel around its left hinge at 0.8s, then unfold the next two with a 240ms stagger. Animate the thickness shadows with each fold, then send a small dot across the finished bridge. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Rigid Body Physics record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "0.8–2.1 s",
        "label": "Unfold the spans",
        "detail": "Each span opens around a different hinge with an offset and a settling movement."
      },
      {
        "time": "2.4–8.0 s",
        "label": "Run the marble",
        "detail": "Chorono's baked rigid-body tracks preserve the marble's motion and surface contacts."
      }
    ],
    "revision": "Adjust the marble release velocity and re-bake the rigid-body record with the same bridge colliders.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "orbit-letters",
    "title": "Orbit Letters",
    "family": "spline-shape",
    "category": "Elliptical type loop",
    "libraryCategory": "style-animations",
    "description": "Three chrome and lavender tiles orbit through separate foreground and background passes around a stationary title.",
    "posterAlt": "Chrome letter tiles circle a violet center along an elliptical orbit.",
    "durationSeconds": 8,
    "width": 960,
    "height": 960,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 960 × 960 px. Place three letter tiles on the same editable elliptical spline, one-third of a turn apart. Move them through one orbit in eight seconds, with front and back passes built using explicit layer order and opacity keys. Keep the center title still and match the orbit endpoints. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.0–4.0 s",
        "label": "Cross the foreground",
        "detail": "Tiles travel on an editable ellipse, growing and fading as their apparent depth changes."
      },
      {
        "time": "4.0–8.0 s",
        "label": "Complete the orbit",
        "detail": "Layer order and opacity hand the tiles between the two passes before the loop closes."
      }
    ],
    "revision": "Change the lettering while keeping each pair of near and far tiles in sync.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "anatomy-of-a-knot",
    "title": "Anatomy of a Knot",
    "family": "spline-shape",
    "category": "Knot spline animation",
    "libraryCategory": "style-animations",
    "description": "An indigo rope draws over technical paper and copper labels explain the over-and-under crossing.",
    "posterAlt": "Indigo rope diagram on ivory paper with copper crossing labels.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Draw a continuous blue rope on an ivory canvas. Reveal the curve over four seconds, with the lower strand interrupted at the crossing. Add two copper markers showing which segment passes over and under. Keep the visual rope sections keyed as named splines. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.4–3.9 s",
        "label": "Draw the braid",
        "detail": "Two synchronized spline strokes give the continuous rope distinct edges."
      },
      {
        "time": "4.1–6.1 s",
        "label": "Label the crossing",
        "detail": "Copper tracing lines identify the two depths while the narrator explains the overlap."
      }
    ],
    "revision": "Move a crossing and update the separate overpass layer to follow.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    },
    "englishCaptions": true
  },
  {
    "slug": "the-lantern-keeper",
    "title": "The Lantern Keeper",
    "family": "character",
    "category": "Mesh2D character animation",
    "libraryCategory": "style-animations",
    "description": "A paper-cutout lantern keeper crosses a night trail. The textured coat deforms as a swinging lantern and a cabin doorway light the scene.",
    "posterAlt": "Lantern keeper casting amber light on a forest cabin and trail.",
    "durationSeconds": 10,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 10-second scene at 1280 × 720 px. Create a silhouette figure holding a lantern next to a cabin. Animate two slow steps with planted feet, swing the lantern from a separate hand pivot, and open the cabin door at 7s. Grow an amber pool of light along the ground as the door opens. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Mesh Deformation record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "0.9–6.0 s",
        "label": "Walk through the trees",
        "detail": "Boots, wrist and lantern swing on separate pivots while the pinned wool coat deforms."
      },
      {
        "time": "7.0–8.1 s",
        "label": "Light the cabin",
        "detail": "The door opens, and a separate warm pool of light reaches across the ground."
      }
    ],
    "revision": "Change the cloth timing while preserving the pinned shoulder vertices.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "wind-up-walker",
    "title": "Wind-Up Walker",
    "family": "character",
    "category": "Mechanical character walk cycle",
    "libraryCategory": "style-animations",
    "description": "A tin toy marches with opposing arm and leg swings, then lets its winding key spin down on a fixed horizon.",
    "posterAlt": "A red and mint enamel robot above a terracotta tabletop.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Build a tin robot with hips, feet, hands, and winding key in individual groups. Animate two step cycles at 0.8s per cycle with opposing arm swings. Pause the robot at 5s, then continue rotating the key through a short mechanical settle. Keep the horizon fixed. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.9–2.8 s",
        "label": "Walk in opposing poses",
        "detail": "Hip and arm groups articulate separately as the toy moves across the tabletop."
      },
      {
        "time": "4.8–6.3 s",
        "label": "Let the mechanism settle",
        "detail": "The toy stops and its winding axle continues turning briefly."
      }
    ],
    "revision": "Retune the opposing limb phases without moving the studio floor.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "cat-stretch",
    "title": "Cat Stretch",
    "family": "character",
    "category": "Textured cat mesh deformation",
    "libraryCategory": "style-animations",
    "description": "A painted cat holds its rear paws on the floor while its textured Mesh2D body and front paws extend into a stretch.",
    "posterAlt": "A cream paper cat stretches its paws across a muted blue floor.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Build a cream cat against a muted blue floor. Take it from rest to a crouch, then stretch the front paws outward at 3s while keeping the rear feet planted. Follow with a staggered tail curl and an eye blink before the cat returns to rest. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Mesh Deformation record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "2.0–3.6 s",
        "label": "Stretch past the paws",
        "detail": "Pinned mesh vertices hold the rear while the textured body, front paws and head extend."
      },
      {
        "time": "4.5–7.5 s",
        "label": "Blink and curl",
        "detail": "The tail curls in two sections while the face blinks and the cat settles back."
      }
    ],
    "revision": "Adjust the scale of the stretch without moving the rear anchor vertices.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "dandelion-drift",
    "title": "Dandelion Drift",
    "family": "effects-physics",
    "category": "Watercolor wind and particle animation",
    "libraryCategory": "style-animations",
    "description": "A textured Mesh2D stalk bends in a gust and releases individual filaments and seeded drifting particles.",
    "posterAlt": "A watercolor dandelion bends as pale seeds drift over paper.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Build a dandelion from separate stem, head, and seed layers on pale paper. Bend the stem gently as a breeze enters at 2s. Release a small seeded group of white particles upward and to the right. Slow the drift toward the end and fade the individual seeds gradually. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Mesh Deformation record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "1.9–3.2 s",
        "label": "Bend the stem",
        "detail": "Mesh vertices above the pinned root lean into the wind while the seed head follows."
      },
      {
        "time": "2.0–7.6 s",
        "label": "Lift the seeds",
        "detail": "Independent seed parts and a seeded emitter drift and fade at different rates."
      }
    ],
    "revision": "Change the wind drift or emitter seed and compare the new seed trail.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "porcelain-crack",
    "title": "Porcelain Crack",
    "family": "effects-physics",
    "category": "Voronoi fracture animation",
    "libraryCategory": "style-animations",
    "description": "A glazed porcelain disk breaks at 2.2 seconds into twenty-one editable Voronoi fragments that fall and settle on stone.",
    "posterAlt": "Porcelain shards scatter under warm light over a dark studio floor.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Build one matte porcelain disk on black. At 2.2s, fracture its editable convex shape into an uneven seeded pattern and let the pieces spread before gravity pulls them to the surface. Keep the intact disk visible until the fracture and save the baked fragment timeline. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Voronoi Fracture record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "0.0–2.2 s",
        "label": "Hold the glaze",
        "detail": "Copper ring details and a warm studio highlight establish the intact disk."
      },
      {
        "time": "2.2–8.0 s",
        "label": "Fracture and settle",
        "detail": "The stored Voronoi bake drives the shards; two native emitters carry fine dust."
      }
    ],
    "revision": "Re-bake the fracture with a new seed while keeping the floor collider.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "soft-rain",
    "title": "Soft Rain",
    "family": "effects-physics",
    "category": "Vertical rain particle animation",
    "libraryCategory": "style-animations",
    "description": "Seeded rain streaks pass a blue window, with four layered contact ripples at distinct points.",
    "posterAlt": "Blue glass window with diagonal rain streaks and bright concentric ripples.",
    "durationSeconds": 8,
    "width": 720,
    "height": 1280,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 720 × 1280 px. Stage an abstract window in deep blue. Send thin rain strokes downward in a light seeded stream. Key four expanding circular ripples at different splash positions in the lower half. Fade the rain near the title area and hold the motif at a steady rhythm for the shot. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.4–3.0 s",
        "label": "Draw the rain",
        "detail": "A native emitter sends thin strokes downward while the closest rivulets write on independently."
      },
      {
        "time": "1.2–7.6 s",
        "label": "Build contact ripples",
        "detail": "Changing scale and opacity expands four concentric surface reactions."
      }
    ],
    "revision": "Change the emitter density while keeping the title area clear.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "packing-notes",
    "title": "Packing Notes",
    "family": "product",
    "category": "Portrait product and physics animation",
    "libraryCategory": "style-animations",
    "description": "Three accessories land in felt trays across color-field wipes, then appear together as an editorial packing list.",
    "posterAlt": "Vertical packing list with three colored accessory tiles.",
    "durationSeconds": 10,
    "width": 720,
    "height": 1280,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 10-second scene at 720 × 1280 px. Show three fictional travel accessories on three alternating color fields. Give each item a large editable outline and a two-word label. At 2.5s and 5s, use a matching-size rectangular wipe to change items. Bring all three silhouettes together as small tiles for the final view. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Rigid Body Physics record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "0.9–7.3 s",
        "label": "Drop three accessories",
        "detail": "Different rigid-body records give the three shapes independently editable contacts."
      },
      {
        "time": "7.4–10.0 s",
        "label": "Collect the set",
        "detail": "A full-height graphic wipe switches to the finished three-item packing list."
      }
    ],
    "revision": "Compare the accessory landings after changing one body's mass or friction and re-baking it.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "record-sleeve",
    "title": "Record Sleeve",
    "family": "product",
    "category": "Album cover style-transition animation",
    "libraryCategory": "style-animations",
    "description": "A vinyl record slides from its sleeve and turns through Bauhaus, halftone and pixel artwork, linked by a Voronoi fracture.",
    "posterAlt": "Orange East Platform sleeve with a partly exposed dark vinyl record.",
    "durationSeconds": 10,
    "width": 960,
    "height": 960,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 10-second scene at 960 × 960 px. Introduce a fictional album called EAST PLATFORM. Slide a dark vinyl disc halfway out of a textured orange sleeve. Spin the disc one full turn over four seconds while its center label stays readable on arrival. Reveal the release line beneath the sleeve and hold the square cover composition. Save the editable .chorono.json and render a preview MP4. Keep the original source and the editable Voronoi Fracture record in the scene so it can be revised and baked again.",
    "beats": [
      {
        "time": "1.2–5.5 s",
        "label": "Slide and spin the vinyl",
        "detail": "A fixed record axis carries the label and engraved grooves while cover art changes style."
      },
      {
        "time": "6.5–10.0 s",
        "label": "Fracture to pixels",
        "detail": "Editable cover fragments scatter in front of the pixel-print reveal."
      }
    ],
    "revision": "Change the release artwork while keeping the record axis and fracture timing aligned.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "one-pour",
    "title": "One Pour",
    "family": "product",
    "category": "Portrait liquid-mask animation",
    "libraryCategory": "style-animations",
    "description": "An editable 3D glass bottle pivots at its neck and an editable spline pours liquid into a masked ceramic cup.",
    "posterAlt": "A ceramic cup filling from a sea-green bottle against a warm studio background.",
    "durationSeconds": 10,
    "width": 720,
    "height": 1280,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 10-second scene at 720 × 1280 px. Animate a rounded bottle pouring into an abstract cup. Tilt the bottle around the neck from 2–3s, reveal a slim fluid path, and raise the masked surface within the cup between 3–6s. Return the bottle upright and pulse one small droplet at the end. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "1.9–3.5 s",
        "label": "Tilt and start the flow",
        "detail": "The original GLB bottle rotates around its 2D neck pivot and the editable fluid spline draws downward."
      },
      {
        "time": "3.0–9.0 s",
        "label": "Fill the cup",
        "detail": "An alpha mask contains the climbing surface and a final drop produces a ripple."
      }
    ],
    "revision": "Change the fill rate and keep the fluid spline synchronized with the bottle.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    }
  },
  {
    "slug": "choose-your-plant",
    "title": "Choose Your Plant",
    "family": "education",
    "category": "Interactive plant cards",
    "libraryCategory": "interactive-web",
    "description": "Three paper-cut plant cards reveal a care note through editable hover and selection state timelines.",
    "posterAlt": "Fern, aloe and mint cards on warm botanical paper.",
    "durationSeconds": 9,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 9-second scene at 1280 × 720 px. Build three flat leaf cards for Fern, Aloe, and Mint. Give each card an idle, hover, and selected state with its own named timeline. On selection, expand a short care label while keeping the others readable. Save the interactive scene and create a nine-second demonstration showing two selections. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "0.6–2.1 s",
        "label": "Grow the specimens",
        "detail": "Fern fronds, aloe blades and mint leaves arrive in staggered groups."
      },
      {
        "time": "2.2–6.0 s",
        "label": "Select two cards",
        "detail": "The video demonstrates two selections while the interactive project exposes all three plants."
      }
    ],
    "revision": "Edit an individual care note and test its selection transition.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    },
    "interactiveDemo": "plant-cards"
  },
  {
    "slug": "open-inspect-close",
    "title": "Open, Inspect, Close",
    "family": "education",
    "category": "Interactive artifact card",
    "libraryCategory": "interactive-web",
    "description": "A museum artifact tile opens a panel containing three labeled ceramic parts. Its native state machine returns the card to idle on close.",
    "posterAlt": "Museum vase in a dark tile beside a panel with three editable part labels.",
    "durationSeconds": 8,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 8-second scene at 1280 × 720 px. Build one artifact card and one expandable detail panel. Wire a click to open the panel, expose three labeled parts with 150ms stagger, and wire a close control to return to idle. Build a preview timeline showing open, hold, and close. Save the interactive states with their editable layers. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "1.2–2.5 s",
        "label": "Open the inspection",
        "detail": "The artifact shifts left and three independent labels appear in sequence."
      },
      {
        "time": "6.3–8.0 s",
        "label": "Reset the card",
        "detail": "The preview closes the panel and moves the artifact back to the center."
      }
    ],
    "revision": "Rename a vessel part and confirm that open and close events still return to their saved states.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    },
    "interactiveDemo": "artifact-card"
  },
  {
    "slug": "two-routes-to-the-station",
    "title": "Two Routes to the Station",
    "family": "education",
    "category": "Animated metro map comparison",
    "libraryCategory": "style-animations",
    "description": "Express and local trains follow editable splines from Harbor to North Station with different interchange stops and arrival times.",
    "posterAlt": "Copper express and mint local routes on a dark metro map, with two arrival labels.",
    "durationSeconds": 12,
    "width": 1280,
    "height": 720,
    "frameRate": 24,
    "mediaAdded": "2026-11-24",
    "prompt": "Use the Chorono skill to build a 12-second scene at 1280 × 720 px. Draw two fictional metro routes from Harbor to North Station. Move one marker on each editable path, starting together. Pause both markers at their interchange stations, then reveal different arrival times at the terminus. Keep station names and a color-keyed route legend on separate layers. Save the editable .chorono.json and render a preview MP4.",
    "beats": [
      {
        "time": "1.1–6.2 s",
        "label": "Start both trains",
        "detail": "The route markers leave together and wait at their respective interchange stops."
      },
      {
        "time": "8.1–12.0 s",
        "label": "Compare the arrivals",
        "detail": "The station receives the express first. The local arrival follows with its own label."
      }
    ],
    "revision": "Change either transfer duration and update its arrival label to match.",
    "guide": {
      "href": "/docs/editor/keyframes",
      "label": "Chorono timeline and keyframes"
    },
    "englishCaptions": true
  }
]
