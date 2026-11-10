"""Package the reviewed hero source and references without changing source bytes.

Run manually after changing the scene, poster or reference files. Python's standard ZIP
implementation supplies CRC/compression; the normal Next.js build has no Python dependency.
The fixed file allowlist excludes credentials, build output and editor workspace files.
"""
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
FILES = [
    'docs/plans/hero-analytics.md',
    'public/hero/motion-crew.chorono.json', 'public/hero/motion-crew.png',
    'components/hero/CrewEventLog.tsx', 'lib/analytics.ts', 'lib/hero/analytics.ts',
    'components/hero/HeroCharacters.tsx', 'components/hero/useHeroCrew.ts',
    'components/animation-library/InteractiveCrewPreview.tsx',
    'lib/hero/NativeSplineFrameAdapter.ts', 'lib/hero/interaction.ts', 'lib/hero/manifest.ts',
    'scene-source/hero-crew/design.js', 'scene-source/hero-crew/author-rig.js',
    'scene-source/hero-crew/idle-signatures.js', 'scene-source/hero-crew/author-motion.js', 'scene-source/hero-crew/author-state-machine.js',
]
README = '''# Chorono motion crew

Pip, Milo, Fig and Dot are editable vector characters with ten native animation states.

## Open the project

Install/start Chorono, then choose Menu > Open Scene JSON and open
public/hero/motion-crew.chorono.json. Layers, keyframes, state machine and pointer wires
remain editable. No external image, audio or font assets are required by the scene.
public/hero/motion-crew.png is its transparent idle poster.

## Web reference

The included components and lib files are reference source for an existing Next.js/React
application with Tailwind CSS, lucide-react and @chorono/runtime 0.1.0. Keep their paths and
configure @/ to resolve to your app root. Copy public/hero too, then render:

import InteractiveCrewPreview from '@/components/animation-library/InteractiveCrewPreview'
export default function Page() { return <InteractiveCrewPreview /> }

The preview starts paused. Press play, move the cursor, hover/focus a character and try
Celebrate, High five or Sit down. The homepage uses the same hook with autoplay/scroll
enabled and supplies its own navigation buttons. DOM button and scroll behavior belongs
to the host application; the project contains the poses/state machine and parameters.

Keep NativeSplineFrameAdapter with SDK 0.1.0: that renderer needs evaluated spline
coordinates projected before drawing. The adapter delegates all drawing to the native SDK.
Retain the scene's existing IDs when using these web files. Hide the PNG visually once the
transparent canvas is ready, so it does not remain underneath moving characters.

## Interaction metrics

The reference hook sends fixed events through lib/analytics.ts to an existing Google tag
(if configured) and dispatches chorono:animation for local listeners. No tag ID or visitor
identity is bundled. ?crewDebug=1 shows a bounded in-memory event inspector. See the website
repository docs/plans/hero-analytics.md for the three-event 10/20/30-second engagement budget
and cumulative motion/control snapshot semantics. Rapid duplicate CTA/copy telemetry is limited.

## Native authoring recipes

scene-source/hero-crew contains the original recipes. Run only inside Chorono MCP's
isolated script bridge, in a separate empty scene. Concatenate design.js before each
recipe; also concatenate idle-signatures.js before author-motion.js. Prepend const selectedState='idle' (substitute each durations key) for author-motion.js.
Use dryRun, inspect the plan, then apply_script_plan. Do not run authoring recipes in Node.
Regenerating creates new IDs; refresh the web manifest and native asset together afterward.

Native composition: 1200 x 800; logical authoring space: 960 x 640; times: milliseconds.
Events: idle, shy-pip, shy-milo, shy-fig, shy-dot, excited, curious, celebrate, highfive, sit.
The composition's 8 seconds describes the idle loop; other states have their own durations.

License: MIT. Keep the included LICENSE notice with copies/substantial portions.
'''


def main():
    """Write one deterministic archive atomically and check its CRCs before replacing the public file."""
    output = ROOT / 'public/hero/motion-crew-project.zip'
    temporary = output.with_suffix('.zip.tmp')
    entries = [(name, (ROOT / name).read_bytes()) for name in FILES]
    entries.extend([('README.md', README.encode()), ('LICENSE', (ROOT / 'docs/animation-examples-LICENSE').read_bytes())])
    with zipfile.ZipFile(temporary, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, data in entries:
            info = zipfile.ZipInfo(name, (2026, 11, 8, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, data)
    with zipfile.ZipFile(temporary) as archive:
        assert archive.testzip() is None
        assert archive.read(FILES[0]) == (ROOT / FILES[0]).read_bytes()
    temporary.replace(output)
    print(f'Created {output.relative_to(ROOT)}: {output.stat().st_size} bytes, {len(entries)} files')


if __name__ == '__main__':
    main()
