import Link from 'next/link'
import UseCaseLayout, { TimingTable } from '@/components/UseCaseLayout'
import { useCaseMetadata } from '@/lib/use-cases'

export const metadata = useCaseMetadata('/motion-graphics-software')

export default function MotionGraphicsSoftware() {
  return <UseCaseLayout path="/motion-graphics-software">
    <section id="editor-workflow"><h2>What this project shows about the editor</h2>
      <p>A motion graphic turns a layout into a sequence. In this process diagram, the viewer first sees the brief, then the build, then the revision. Each card has its own background, number, title and explanation. The moving marker connects the steps without covering their labels.</p>
      <p>The downloadable scene contains 18 named layers and 26 animation tracks on one eight-second timeline. Each card and its three text layers share an entrance time. You can select the “Build title” layer to change the wording, adjust the marker’s position keys to change its travel, or move an entire card’s entrance by shifting its related tracks together.</p>
      <p>Chorono exposes that scene in a browser editor. Its MCP connection also lets an agent inspect and edit the objects. The saved JSON keeps the same text, shapes and keyframes available for your next revision.</p>
    </section>
    <section id="choose-your-workflow"><h2>Choose software around your delivery needs</h2>
      <p>Start with the artifact you need to deliver. A short process illustration embedded in a web page has different requirements from a film assembled from recorded footage. Try a representative project and check the source, revision workflow and output before committing to a tool.</p>
      <div className="my-6 overflow-x-auto rounded-xl border border-[#d9bca9]"><table className="w-full text-left text-sm leading-6"><caption className="bg-white p-4 text-left font-semibold">What to evaluate in this Chorono workflow</caption><thead className="bg-[#ede0d7]"><tr><th scope="col" className="p-4">Your requirement</th><th scope="col" className="p-4">What you can verify here</th></tr></thead><tbody className="text-[#6d5a52]">
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Editable 2D source</th><td className="p-4">Open the project and select individual text, card and marker layers.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Precise timing</th><td className="p-4">Inspect the staggered entrances and position keys on the timeline.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Agent-assisted revisions</th><td className="p-4">Connect a local editor through MCP, then ask Claude Code or Codex to change a named layer.</td></tr>
        <tr className="border-t border-[#e7d8cf]"><th scope="row" className="p-4 font-medium text-[#211612]">Web playback</th><td className="p-4">This page plays exported scene data using @chorono/runtime and a canvas.</td></tr>
      </tbody></table></div>
      <p>The deliverables tested here are portable scene JSON and runtime JSON. The download is an editable project, not a finished MP4 or GIF. If your final destination needs an encoded video, check and test that additional export workflow before choosing your production setup. This example is a 2D text-and-shape composition; it does not demonstrate footage editing or 3D modeling.</p>
      <p>Chorono’s source is available under the <a href="https://github.com/codie1982/chorono-editor/blob/main/LICENSE">repository’s MIT license</a>. The local editor setup and any Claude Code or Codex account are separate parts of the workflow. Follow the <Link href="/getting-started">installation guide</Link> for the current requirements.</p>
    </section>
    <section id="build-and-revise"><h2>Build and revise the process graphic</h2>
      <TimingTable caption="Timing in the downloadable Brief to motion project" rows={[
        ['0.4–1.1 s', 'Brief card and its text enter together.', 'The first step is readable before the next arrives.'],
        ['1.5–2.2 s', 'Build enters; the marker begins its travel.', 'Text and card backgrounds stay aligned.'],
        ['2.6–3.3 s', 'Refine enters.', 'The final card has enough separation from the second.'],
        ['3.9–8.0 s', 'The marker has arrived; the complete diagram holds.', 'All three steps can be read in one still composition.'],
      ]} />
      <p>Download the project, open a separate Chorono editor tab and choose <strong>Open Scene JSON</strong> from its menu. For an agent revision, connect that tab through MCP and identify the project. This request targets a concrete change:</p>
      <pre className="prompt-block"><code>Read the current Brief to motion scene with the chorono skill. Change only the Build title to “Prototype” and its explanation to “Test the first idea.” Keep the card positions, fonts, colors and eight-second timing. Preserve unrelated work. Inspect the second card during its entrance and in the final hold, then validate and save a revised portable project.</code></pre>
      <p>After a timing change, inspect the moving state and the finished layout. A final frame can hide a mismatch that occurs while a card and its text are entering.</p>
    </section>
    <section id="source-and-playback"><h2>Keep an editable source and a playback export</h2>
      <p>Keep the portable project as the source you reopen for editing. Export runtime data for an application that needs playback. The two files serve different jobs, even when their animation tracks match.</p>
      <p>This page uses the published <code>@chorono/runtime</code> package. You can also <a href="/examples/brief-to-motion.runtime.json" download>download the runtime export used by this preview</a> and compare it with the editable project.</p>
      <pre><code>npm install @chorono/runtime</code></pre>
      <p>For smaller studies, explore <Link href="/text-animation">text animation and reading time</Link> or <Link href="/kinetic-typography">kinetic typography and word emphasis</Link>. To build through an agent, start with the <Link href="/agent-skills">setup and authoring skills</Link> and the <Link href="/blog/make-animations-with-claude">Claude Code installation walkthrough</Link>.</p>
    </section>
  </UseCaseLayout>
}
