import Link from 'next/link'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/motion-graphics-software')

export default function MotionGraphicsSoftware() {
  return <UseCaseLayout path="/motion-graphics-software">
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
      <p>The deliverables tested here are portable scene JSON and runtime JSON. The download is an editable project, not a finished MP4 or GIF. If your final destination needs an encoded video, check and test that additional export workflow before choosing your production setup. This example is a 2D text-and-shape composition; it does not demonstrate footage editing or 3D modeling.</p>
      <p>If you are looking for free motion graphics software, separate the editor license from the other services in your workflow. Chorono’s source is available under the <a href="https://github.com/codie1982/chorono-editor/blob/main/LICENSE">repository’s MIT license</a>. Follow the <Link href="/getting-started">installation guide</Link> to run the editor and check the requirements before opening your first project.</p>
    </section>
    <section id="build-and-revise"><h2>Build and revise the process graphic</h2>
      <TimingTable caption="Timing in the downloadable Brief to motion project" rows={[
        ['0.4–1.1 s', 'Brief card and its text enter together.', 'The first step is readable before the next arrives.'],
        ['1.5–2.2 s', 'Build enters; the marker begins its travel.', 'Text and card backgrounds stay aligned.'],
        ['2.6–3.3 s', 'Refine enters.', 'The final card has enough separation from the second.'],
        ['3.9–8.0 s', 'The marker has arrived; the complete diagram holds.', 'All three steps can be read in one still composition.'],
      ]} />
      <ol className="list-decimal space-y-3 pl-6 leading-8 text-[#6d5a52]">
        <li>Download Brief to motion and open it with <strong>Open Scene JSON</strong> in a separate local Chorono editor tab.</li>
        <li>Replace one card’s wording and check the final layout. Keep its title and explanation inside the card.</li>
        <li>Inspect the entrance on the timeline. Move related text and background tracks together when you change a card’s start time.</li>
        <li>Save a portable copy, reopen it and check the result at the size where it will be shown.</li>
      </ol>
      <p>For an agent revision, connect that editor tab through MCP and identify the project. This request targets a concrete change:</p>
      <pre className="prompt-block"><code>Read the current Brief to motion scene with the chorono skill. Change only the Build title to “Prototype” and its explanation to “Test the first idea.” Keep the card positions, fonts, colors and eight-second timing. Preserve unrelated work. Inspect the second card during its entrance and in the final hold, then validate and save a revised portable project.</code></pre>
      <p>After a timing change, inspect the moving state and the finished layout. A final frame can hide a mismatch that occurs while a card and its text are entering. Use the <Link href="/keyframe-animation">keyframe animation guide</Link> to understand the stored values and the <Link href="/animation-easing">easing comparison</Link> to inspect acceleration between those values.</p>
    </section>
    <section id="source-and-playback"><h2>Keep an editable source and a playback export</h2>
      <p>Keep the portable project as the source you reopen for editing. Export runtime data for an application that needs playback. The two files serve different jobs, even when their animation tracks match.</p>
      <p>This page uses the published <code>@chorono/runtime</code> package. You can also <a href="/examples/brief-to-motion.runtime.json" download>download the runtime export used by this preview</a> and compare it with the editable project.</p>
      <pre><code>npm install @chorono/runtime</code></pre>
      <p>For smaller studies, explore <Link href="/text-animation">text animation and reading time</Link> or <Link href="/kinetic-typography">kinetic typography and word emphasis</Link>. To build through an agent, start with the <Link href="/agent-skills">setup and authoring skills</Link> and the <Link href="/blog/make-animations-with-claude">Claude Code installation walkthrough</Link>.</p>
    </section>
  </UseCaseLayout>
}
