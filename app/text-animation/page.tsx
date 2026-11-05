import Link from 'next/link'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/text-animation')

export default function TextAnimation() {
  return <UseCaseLayout path="/text-animation">
    <section id="choose-an-entrance"><h2>Choose an entrance that suits the message</h2>
      <p>A text animation should help a reader find and understand the words. A fade introduces a title softly. A short slide can establish a direction. A stagger separates lines or words into a readable sequence. The effect is useful when its timing supports the message and the final text is easy to scan.</p>
      <p>“Make it clear” uses two whole text layers. The first line fades upward over 0.9 seconds. The second starts 0.3 seconds later and moves slightly from the right. That small overlap keeps the lines connected. A rust underline extends only after the title has settled, so the entrance has one focal action at a time.</p>
      <p>The words remain ordinary editable text in the project. You can replace the copy and adjust font size or line breaks without recreating an image. For longer copy, decide the line breaks before adding more movement.</p>
    </section>
    <section id="timing"><h2>Read the timing of this text animation</h2>
      <TimingTable caption="Timing in the downloadable Make it clear project" rows={[
        ['0.0–0.9 s', '“Make it” fades in and rises 32 pixels.', 'The first line moves into a stable position.'],
        ['0.3–1.2 s', '“clear.” fades in and slides 32 pixels left.', 'The stagger helps the reader follow the two lines.'],
        ['1.2–2.1 s', 'The underline extends; the circle settles by 1.8 s.', 'The accents support the title without touching it.'],
        ['2.1–6.0 s', 'The complete title stays still.', 'The main message has a 3.9-second reading hold.'],
      ]} />
      <p>Use the marked 0.6-second preview to inspect the overlap between the two entrances. At 1.6 seconds the underline is still growing. At 2.6 seconds the whole title is stationary. Those frames answer different questions; the final poster alone cannot show whether the entrance feels rushed.</p>
      <p>The six-second duration is a design choice for this short title. It is not a reading-time rule for other messages. Longer text, unfamiliar words and a smaller display may need a longer hold or a simpler composition.</p>
    </section>
    <section id="adapt-the-project"><h2>Make this title your own</h2>
      <p>Download the seven-layer project and choose <strong>Open Scene JSON</strong> in a separate Chorono editor tab. Select “First line — Make it” and “Second line — clear” to replace the copy. Check the final position, then scrub through the entrance to check that moving letters stay inside the canvas.</p>
      <p>You can ask a connected agent to make the same revision. Install the <Link href="/agent-skills">Chorono animation skills</Link>, connect the editor tab and name the text layers in your brief. For example:</p>
      <pre className="prompt-block"><code>Use the chorono skill to read the Make it clear scene. Change the first title line to “Keep it” and the second to “simple.” Keep the dark background, cream text, rust accents and six-second duration. Adjust the second line’s font size only if it needs more room. Preserve the stagger and the final reading hold. Inspect at 0.6, 1.6 and 2.6 seconds, then validate and save a portable project.</code></pre>
      <p>To start a new design, include the exact copy, canvas dimensions, entrance order and hold duration in the prompt. The <Link href="/blog/make-animations-with-claude#first-prompt">Claude animation tutorial</Link> shows the full connection and prompt workflow. You can use the same authoring skill with <Link href="/blog/make-animations-with-codex">Codex</Link>.</p>
    </section>
    <section id="readability-check"><h2>Check reading time, contrast and small screens</h2>
      <p>Play the title once without scrubbing. Read it as a sentence. If your eye is still tracking the motion when the next action starts, reduce the travel or extend the hold. Try the longest copy you expect to use, not only the short sample.</p>
      <p>Check the main title at the size where it will appear. This project has a 1200 × 675 source canvas; scaling it into a narrow phone layout makes every letter smaller. Its small label and footer are supporting details. Put essential information in the large title and in accessible page text, rather than relying on tiny text inside an animation.</p>
      <p>The preview starts on a still poster and plays only when requested. Its time controls let you inspect a frame without continuous movement. When embedding your own animation, provide a useful still state, a pause control and an accessible text equivalent for the message.</p>
      <p>If the words themselves should express a change of pace or emphasis, continue to the <Link href="/kinetic-typography">kinetic typography study</Link>. For a larger text-and-shape composition, see the <Link href="/motion-graphics-software">motion graphics software workflow</Link>.</p>
    </section>
  </UseCaseLayout>
}
