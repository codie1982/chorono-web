import Link from 'next/link'
import AnimationExample from '@/components/AnimationExample'
import EditorialScreenshot from '@/components/EditorialScreenshot'
import ExampleDownload from '@/components/ExampleDownload'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { REPOSITORY_URL } from '@/lib/site'
import { USE_CASES, useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/motion-graphics-software')
const { exampleId, sections } = USE_CASES['/motion-graphics-software']
const assetPath = `/examples/${exampleId}`

export default function MotionGraphicsSoftware() {
  return <UseCaseLayout path="/motion-graphics-software" heroDemoLink exampleContent={<>
    <p>Play an eight-second process graphic built from 18 editable layers. Select <strong>Second card enters</strong> to see the stagger or <strong>Complete process</strong> to inspect the final layout.</p>
    <AnimationExample exampleId={exampleId} />
    <p><Link href="#build-and-revise">Try a first edit</Link> or <Link href="#source-and-playback">choose the file you need</Link>.</p>
  </>}>
    <section id="editor-workflow"><h2>What this project shows about the editor</h2>
      <p>A motion graphic turns a layout into a sequence. In this process diagram, the viewer first sees the brief, then the build, then the revision. Each card has its own background, number, title and explanation. The moving marker connects the steps without covering their labels.</p>
      <p>The downloadable scene contains 18 named layers and 26 animation tracks on one eight-second timeline. Each card and its three text layers share an entrance time. You can select the “Build title” layer to change the wording, adjust the marker’s position keys to change its travel, or move an entire card’s entrance by shifting its related tracks together.</p>
      <p>Chorono exposes that scene in a motion graphics editor running locally in your browser. You can work directly with its layers and timeline. Its MCP connection also lets Claude Code or Codex inspect and edit the same objects. The saved JSON keeps the text, shapes and keyframes available for your next revision.</p>
    </section>
    <section id="motion-graphics-projects"><h2>What can you make with these motion graphics tools?</h2>
      <p>Start with one message and a small set of objects. A useful first project has a clear reading order, a short movement and a final state that communicates the idea on its own. These three downloadable studies show different uses for the same editor:</p>
      <ul className="list-disc space-y-3 pl-6 leading-8 text-[#6d5a52]">
        <li><strong>A process diagram:</strong> use Brief to motion above to explain three steps. Adapt the cards to an onboarding sequence or a feature explanation, then check the copy at the final display size.</li>
        <li><strong>An animated title:</strong> inspect the <Link href="/text-animation">text animation example</Link> to combine two text entrances with an underline and a reading hold.</li>
        <li><strong>Moving type with emphasis:</strong> explore <Link href="/kinetic-typography">kinetic typography</Link> to see how word order, scale and pauses change the way a sentence is read.</li>
      </ul>
      <p>Each study has a playable preview and an editable source file. Choose the one closest to your task and try a wording or timing change before building a larger composition. The preview helps you inspect the result; the local editor is where you create and revise the scene.</p>
    </section>
    <section id="choose-your-workflow"><h2>Compare motion graphics programs around your delivery needs</h2>
      <p>The best motion graphics software for a particular task depends on its source files, editing workflow and final destination. Start with the artifact you need to deliver. A short process illustration embedded in a web page has different requirements from a film assembled from recorded footage. Test a representative project before committing to a tool.</p>
      <div className="my-6 overflow-x-auto rounded-xl border border-[#d9bca9]"><table className="w-full text-left text-sm leading-6"><caption className="bg-white p-4 text-left font-semibold">What to evaluate in this Chorono workflow</caption><thead className="bg-[#ede0d7]"><tr><th scope="col" className="p-4">Your requirement</th><th scope="col" className="p-4">What you can verify here</th></tr></thead><tbody className="text-[#6d5a52]">
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Editable 2D source</th><td className="p-4">Open the project and select individual text, card and marker layers.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Precise timing</th><td className="p-4">Inspect the staggered entrances and position keys on the timeline.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Local browser workflow</th><td className="p-4">Install the editor on your computer, then open its browser interface. Follow the setup guide for Node.js, npm and Git requirements.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Agent-assisted revisions</th><td className="p-4">Connect a local editor through MCP, then ask Claude Code or Codex to change a named layer.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Web playback</th><td className="p-4">This page plays exported scene data using @chorono/runtime and a canvas.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Cost and source access</th><td className="p-4">The editor is free and open source under MIT. Any Claude Code or Codex account is managed separately; you can also edit the scene directly.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Your delivery format</th><td className="p-4">Download the portable project and runtime JSON here. Test the full delivery workflow if your destination requires an encoded video or GIF.</td></tr>
      </tbody></table></div>
      <p>For animated titles, process diagrams and interface movement, try a 2D project with editable text and shape layers. For hand-drawn frames or vector tweening, <Link href="/blog/free-2d-animation-software#compare-tools">compare free 2D animation software</Link> by workflow.</p>
    </section>
    <section id="build-and-revise" className="scroll-mt-6"><h2>{sections[4]}</h2>
      <ol className="list-decimal space-y-3 pl-6 leading-8 text-[#6d5a52]">
        <li>Download <strong>Brief to motion</strong> and choose <strong>Open Scene JSON</strong> in your local Chorono editor.</li>
        <li>Select <strong>Build title</strong> in Layers and change its Content field from “Build” to “Prototype”.</li>
        <li>Scrub to about <strong>1.8 seconds</strong> to inspect the entrance, then check that the new title fits in the final card.</li>
        <li>Choose <strong>Save Scene JSON</strong> and reopen the new file to check your edit.</li>
      </ol>
      <EditorialScreenshot
        src="/examples/brief-to-motion-editor.jpg"
        alt="Brief to motion in the Chorono editor, with Build title selected, its Content field open and its keyframes visible in the timeline."
        caption="The Build title layer is selected. Edit its Content field, then use the timeline below to inspect the entrance."
        width={1864}
        height={1119}
      />
      <TimingTable caption="Timing in the downloadable Brief to motion project" rows={[
        ['0.4–1.1 s', 'Brief card and its text enter together.', 'The first step is readable before the next arrives.'],
        ['1.5–2.2 s', 'Build enters; the marker begins its travel.', 'Text and card backgrounds stay aligned.'],
        ['2.6–3.3 s', 'Refine enters.', 'The final card has enough separation from the second.'],
        ['3.9–8.0 s', 'The marker has arrived; the complete diagram holds.', 'All three steps can be read in one still composition.'],
      ]} />
      <p>For an agent revision, connect that editor tab through MCP and identify the project. This request targets a concrete change:</p>
      <pre className="prompt-block"><code>Read the current Brief to motion scene with the chorono skill. Change only the Build title to “Prototype” and its explanation to “Test the first idea.” Keep the card positions, fonts, colors and eight-second timing. Preserve unrelated work. Inspect the second card during its entrance and in the final hold, then validate and save a revised portable project.</code></pre>
      <p>After a timing change, inspect the moving state and the finished layout. A final frame can hide a mismatch that occurs while a card and its text are entering. Use the <Link href="/keyframe-animation">keyframe animation guide</Link> to understand the stored values and the <Link href="/animation-easing">easing comparison</Link> to inspect acceleration between those values.</p>
    </section>
    <section id="source-and-playback" className="scroll-mt-6"><h2>{sections[5]}</h2>
      <dl className="my-6 divide-y divide-[#e7d8cf] rounded-xl border border-[#d9bca9] bg-white">
        <div className="p-4 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-5">
          <div><dt className="font-semibold">Local Chorono editor</dt><dd className="mt-1 text-sm leading-6 text-[#6d5a52]">Install once, then open the editor in your browser. The editor is free under the MIT license.</dd></div>
          <Link href="/getting-started" className="inline-flex min-h-[44px] items-center text-sm font-semibold">Open the installation guide</Link>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-5">
          <div><dt className="font-semibold">Editable project JSON</dt><dd className="mt-1 text-sm leading-6 text-[#6d5a52]">Open Brief to motion to edit its text, layers and keyframes.</dd></div>
          <ExampleDownload exampleId={exampleId} href={`${assetPath}.chorono.json`} download className="inline-flex min-h-[44px] items-center text-sm font-semibold">Download editable project</ExampleDownload>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-5">
          <div><dt className="font-semibold">Runtime JSON</dt><dd className="mt-1 text-sm leading-6 text-[#6d5a52]">Play the exported motion on a website with <code>@chorono/runtime</code>.</dd></div>
          <ExampleDownload exampleId={exampleId} href={`${assetPath}.runtime.json`} download className="inline-flex min-h-[44px] items-center text-sm font-semibold">Download runtime JSON</ExampleDownload>
        </div>
      </dl>
      <p>For video delivery, <Link href="/docs/export/images">export an image sequence</Link> and assemble the frames in a video tool. For web playback, see the <Link href="/docs/export/runtime-json">runtime export guide</Link>.</p>
      <p>Explore the <a href={REPOSITORY_URL}>editor source on GitHub</a> or connect an agent with the <Link href="/agent-skills">Chorono setup and authoring skills</Link>. Follow the <Link href="/blog/make-animations-with-codex">Codex loading-loop tutorial</Link> or the <Link href="/blog/make-animations-with-claude">Claude Code installation walkthrough</Link>.</p>
    </section>
  </UseCaseLayout>
}
