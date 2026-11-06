import Link from 'next/link'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/text-animation')

export default function TextAnimation() {
  return <UseCaseLayout path="/text-animation">
    <section id="choose-an-entrance"><h2>Choose an entrance that suits the message</h2>
      <p>A text animation should help a reader find and understand the words. Choose an effect around the reading order and the final position, then keep enough still time for the message to be understood.</p>
      <dl>
        <dt>Fade: introduce a title in place</dt><dd>Animate opacity when the composition already has a clear reading order. The words stay in the same position while becoming visible.</dd>
        <dt>Slide: give the entrance a direction</dt><dd>Use a short position change to bring text into place. Inspect the first frame and the path so the words remain inside the intended composition.</dd>
        <dt>Stagger: reveal lines in a sequence</dt><dd>Offset the start times of separate text layers. A small overlap can connect two lines while keeping their order clear.</dd>
      </dl>
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
    <section id="adapt-the-project"><h2>How to create animated text in Chorono</h2>
      <ol className="list-decimal space-y-3 pl-6 leading-8 text-[#6d5a52]">
        <li><strong>Open the editor.</strong> Follow the <Link href="/getting-started">local setup guide</Link>, download the project above and choose <strong>Open Scene JSON</strong> in a separate Chorono editor tab.</li>
        <li><strong>Change the words.</strong> Select “First line — Make it” and “Second line — clear”. Replace the copy, then adjust font size and line breaks until the finished title fits.</li>
        <li><strong>Set the entrance.</strong> Inspect the position and opacity tracks. Preserve the original fade and slide or change one property at a time.</li>
        <li><strong>Check the reading hold.</strong> Scrub the entrance, play the whole title and read the final message at its intended display size.</li>
        <li><strong>Save an editable copy.</strong> Keep the portable project so you can reopen it and revise the wording or timing later.</li>
      </ol>
      <p>The example uses whole text layers for the two lines. A stagger between these layers gives you line-by-line control. To try word-by-word timing in this exercise, place each word you want to move independently on its own text layer and plan its entrance.</p>
      <p>You can ask a connected agent to make the same revision. Install the <Link href="/agent-skills">Chorono animation skills</Link>, connect the editor tab and name the text layers in your brief. For example:</p>
      <pre className="prompt-block"><code>Use the chorono skill to read the Make it clear scene. Change the first title line to “Keep it” and the second to “simple.” Keep the dark background, cream text, rust accents and six-second duration. Adjust the second line’s font size only if it needs more room. Preserve the stagger and the final reading hold. Inspect at 0.6, 1.6 and 2.6 seconds, then validate and save a portable project.</code></pre>
      <p>To start a new design, include the exact copy, canvas dimensions, entrance order and hold duration in the prompt. The <Link href="/blog/make-animations-with-claude#first-prompt">Claude animation tutorial</Link> shows the full connection and prompt workflow. You can use the same authoring skill with <Link href="/blog/make-animations-with-codex">Codex</Link>.</p>
    </section>
    <section id="choose-a-text-animator"><h2>Choose a text animator around your next edit</h2>
      <p>Before using an animated text generator or text animation software, decide what you will need to change after the first preview. Check whether you can replace the wording, adjust individual entrances, keep the source and deliver the result in the format your project needs.</p>
      <div className="my-6 overflow-x-auto rounded-xl border border-[#d9bca9]"><table className="w-full text-left text-sm leading-6"><caption className="bg-white p-4 text-left font-semibold">What to check in a text animation workflow</caption><thead className="bg-[#ede0d7]"><tr><th scope="col" className="p-4">Your next edit or delivery</th><th scope="col" className="p-4">How this example helps you evaluate it</th></tr></thead><tbody className="text-[#6d5a52]">
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Change the copy</th><td className="p-4">The two title lines remain editable text. Try the longest wording you expect to use and check its line breaks.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Adjust the rhythm</th><td className="p-4">Separate opacity and position tracks let you inspect each line’s entrance and the final hold.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Work in a browser</th><td className="p-4">The preview plays on this page. Creating and editing the title uses the locally installed browser editor.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Keep the source</th><td className="p-4">Download the portable Chorono project, save your changes and reopen the file for the next revision.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Deliver to a website or video</th><td className="p-4">This page demonstrates runtime playback and an editable JSON download. If you need an MP4 or GIF, test that delivery step in your production workflow.</td></tr>
      </tbody></table></div>
      <p>The Chorono text animator is part of the free, MIT-licensed editor. You can change the scene directly or connect Claude Code or Codex for agent-assisted editing. Access to those agent services is managed separately.</p>
      <p>To understand a position or opacity track before changing it, use the <Link href="/keyframe-animation">keyframe animation guide</Link>. The <Link href="/animation-easing">easing comparison</Link> shows how the same start and end values can move at different speeds.</p>
    </section>
    <section id="readability-check"><h2>Check reading time, contrast and small screens</h2>
      <p>Play the title once without scrubbing. Read it as a sentence. If your eye is still tracking the motion when the next action starts, reduce the travel or extend the hold. Try the longest copy you expect to use, not only the short sample.</p>
      <p>Check the main title at the size where it will appear. This project has a 1200 × 675 source canvas; scaling it into a narrow phone layout makes every letter smaller. Its small label and footer are supporting details. Put essential information in the large title and in accessible page text, rather than relying on tiny text inside an animation.</p>
      <p>The preview starts on a still poster and plays only when requested. Its time controls let you inspect a frame without continuous movement. When embedding your own animation, provide a useful still state, a pause control and an accessible text equivalent for the message.</p>
      <p>If the words themselves should express a change of pace or emphasis, continue to the <Link href="/kinetic-typography">kinetic typography study</Link>. For a larger text-and-shape composition, see the <Link href="/motion-graphics-software">motion graphics software workflow</Link>.</p>
    </section>
  </UseCaseLayout>
}
