import type { CrewPose } from './interaction'

/** Generated from native authoring IDs and neutral-rig bounds. Coordinates are composition fractions. */
export const HERO_CHARACTERS = [
  {
    "name": "Pip",
    "rootId": "group_86_rm8j",
    "bodyId": "group_89_rm8l",
    "silhouetteId": "spline_272",
    "pose": "shy-pip",
    "eyes": [
      -1,
      1
    ],
    "hit": {
      "x": 0.05520833333333333,
      "y": 0.4109375,
      "width": 0.19166666666666668,
      "height": 0.4265625
    }
  },
  {
    "name": "Milo",
    "rootId": "group_97_rm8u",
    "bodyId": "group_100_rm8w",
    "silhouetteId": "spline_303",
    "pose": "shy-milo",
    "eyes": [
      -1,
      1
    ],
    "hit": {
      "x": 0.26875,
      "y": 0.3,
      "width": 0.22291666666666668,
      "height": 0.5375
    }
  },
  {
    "name": "Fig",
    "rootId": "group_108_rm92",
    "bodyId": "group_111_rm93",
    "silhouetteId": "spline_334",
    "pose": "shy-fig",
    "eyes": [
      -1,
      1
    ],
    "hit": {
      "x": 0.50625,
      "y": 0.49375,
      "width": 0.2375,
      "height": 0.34375
    }
  },
  {
    "name": "Dot",
    "rootId": "group_119_rmat",
    "bodyId": "group_122_rmaw",
    "silhouetteId": "rrect_369",
    "pose": "shy-dot",
    "eyes": [
      0
    ],
    "hit": {
      "x": 0.75625,
      "y": 0.4390625,
      "width": 0.18541666666666667,
      "height": 0.3984375
    }
  }
] as const satisfies readonly {
  name: string; rootId: string; bodyId: string; silhouetteId: string; pose: CrewPose;
  eyes: readonly number[]; hit: { x: number; y: number; width: number; height: number }
}[]

/** Native high-five contact points in logical 960×640 pixels and timeline milliseconds. */
export const CREW_CONTACTS = [
  {
    "x": 255,
    "y": 300,
    "time": 330
  },
  {
    "x": 482.5,
    "y": 332,
    "time": 405
  },
  {
    "x": 707.5,
    "y": 360,
    "time": 480
  }
] as const
