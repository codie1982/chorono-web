import Link from 'next/link'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/kinetic-typography')

export default function KineticTypography() {
  return <UseCaseLayout path="/kinetic-typography">
    <section id="reading-rhythm"><h2>Turn a sentence into a visual reading rhythm</h2>
      <p>Kinetic typography gives type a role in the action. A pause can create expectation. A later word can change the meaning of an earlier one. A change in scale can make one word feel more forceful than its neighbors.</p>
      <p>The phrase in this project is “PAUSE. THEN MOVE.” Its first two words use the same 76-pixel font size. “MOVE.” uses a 150-pixel font size and a short scale overshoot. That hierarchy is part of the sentence: the first words establish the pace, and the last word becomes the emphasis.</p>
      <p>All three words eventually remain on screen together. The completed frame reads in a clear top-to-bottom order. A small marker travels down the rail to reinforce the word changes; it never passes across the letterforms.</p>
      <p>For a title that simply needs a readable entrance, a restrained <Link href="/text-animation">text animation</Link> may be enough. Use a stronger change of pace when it contributes to what the words mean.</p>
    </section>
    <section id="word-beats"><h2>Break down the three word beats</h2>
      <TimingTable caption="Timing in the downloadable Pause. Then move. project" rows={[
        ['0.0–0.4 s', '“PAUSE.” enters from the right and fades in.', 'The first word establishes the top of the reading order.'],
        ['1.2–1.6 s', '“THEN” enters; the marker moves to the second position.', 'The gap creates a deliberate pause between ideas.'],
        ['2.4–3.3 s', '“MOVE.” enters, grows past its final scale and settles.', 'The largest word delivers the emphasis without clipping.'],
        ['3.3–8.0 s', 'The whole sentence holds still.', 'The reader can take in the complete relationship between the words.'],
      ]} />
      <p>Inspect 1.4 seconds to see the second word during its entrance. At 2.74 seconds the large word is near its scale emphasis. At 3.6 seconds the typography has settled. The project stores that emphasis as separate X and Y scale tracks, so both dimensions can be revised together.</p>
      <p>The word entrance lasts 0.4 seconds, but the words start 1.2 seconds apart. Those are separate decisions. Shortening an entrance changes the character of the movement; shortening the interval changes how quickly the sentence is read.</p>
    </section>
    <section id="revise-emphasis"><h2>Change the emphasis without losing the sentence</h2>
      <p>Download the eight-layer project and choose <strong>Open Scene JSON</strong> in a separate Chorono editor tab. The layers “Word one — PAUSE”, “Word two — THEN” and “Emphasis word — MOVE” identify the main type. The “Word beat marker” layer has its own vertical position track.</p>
      <p>Start with one controlled experiment. Removing the overshoot lets you judge whether the large font size already supplies enough emphasis. You can give a connected Claude Code or Codex agent this revision:</p>
      <pre className="prompt-block"><code>Read the Pause. Then move. scene with the chorono skill. Keep the exact words, rust background, cream type and eight-second duration. On “Emphasis word — MOVE”, remove the scale overshoot: go from 86% at 2.4 seconds to 100% at 2.82 seconds, then hold. Change both scale axes together. Preserve the other entrances and marker timing. Show actual previews at 2.74 and 3.6 seconds, validate and save a revised portable project.</code></pre>
      <p>Compare the two versions at normal speed and at the emphasis frame. The larger movement may feel energetic, while the restrained version may suit a quieter message. Choose based on the tone you need and on whether the sentence remains easy to follow.</p>
      <p>To change the copy, keep one clear emphasis word and check its width at the largest animated scale. The <Link href="/agent-skills">animation skills guide</Link> explains how the agent reads and preserves the existing scene.</p>
    </section>
    <section id="review-the-study"><h2>Review movement, sound and the final hold</h2>
      <p>This study has no audio track. Its beats are visual timing choices. If you later add narration, align word changes with the actual recording and listen to the result; a silent frame preview cannot establish sound synchronization.</p>
      <p>Check the transition into the final hold. “MOVE.” should stop changing size while the whole sentence remains readable. Test the narrow layout where the animation will be embedded. Use the surrounding page text to preserve the sentence for readers who cannot view the canvas or prefer a still image.</p>
      <p>The portable JSON keeps the typography and keyframes editable. The <a href="/examples/pause-then-move.runtime.json" download>runtime export used by the player</a> contains the playback data. For a larger project with multiple cards and labels, explore the <Link href="/motion-graphics-software">motion graphics workflow and its delivery checklist</Link>.</p>
    </section>
  </UseCaseLayout>
}
