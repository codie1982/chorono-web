import Link from 'next/link'
import GuideLayout from '@/components/GuideLayout'
import { pageMetadata, REPOSITORY_URL, SITE_PAGES } from '@/lib/site'

const page = SITE_PAGES['/getting-started']
export const metadata = pageMetadata(
  page.title,
  page.description,
  '/getting-started',
)

export default function GettingStarted() {
  return (
    <GuideLayout path="/getting-started">
      <section>
        <h2>1. Install the editor</h2>
        <p>You need Node.js 20 or later, npm, Git and a modern browser. Open Terminal on macOS/Linux or PowerShell on Windows. Install your chosen agent client separately.</p>
        <pre><code>{`git clone https://github.com/codie1982/chorono-editor.git
cd chorono-editor
npm ci
npm run cli:build
npm run chorono -- setup`}</code></pre>
        <p>Setup builds missing editor outputs, prepares the MCP connection and installs the Chorono skills. Use <code>setup --agent codex</code> or <code>setup --agent claude-code</code> to select one client. The default also configures Claude Desktop for MCP; its skill import method differs.</p>
      </section>
      <section>
        <h2>2. Start and connect</h2>
        <pre><code>{`npm run chorono -- start --background --open`}</code></pre>
        <p>Open the printed URL and choose <strong>MCP → Connect this editor</strong>. Reload your agent client’s MCP connections or start a new session after setup changes its configuration. Reconnect the editor after refreshing the browser tab.</p>
        <pre><code>{`npm run chorono -- doctor`}</code></pre>
        <p>If setup selected one client, use the same selector with doctor, for example <code>doctor --agent codex</code>. Doctor checks the server and connected editor count. It reports what still needs attention and exits with code 1 until ready.</p>
      </section>
      <section>
        <h2>3. Ask your agent to animate</h2>
        <blockquote>Use Chorono to create a 1920 × 1080 scene with a title and three shapes. Add separate intro, idle and outro animations. Inspect preview images, validate the scene and save the portable editable project. Report the saved path.</blockquote>
        <p>The agent edits the connected scene through MCP tools. You can continue adjusting layers, timing, keyframes and effects in the editor. The <Link href="/agent-skills">agent skills guide</Link> explains how the setup and authoring instructions work together.</p>
      </section>
      <section>
        <h2>Keep and reopen your work</h2>
        <p>Portable projects are saved under the selected animation project’s <code>projects/</code> directory. Use <code>--project PATH</code> on setup, start and doctor to keep animation work separate from the editor checkout. Installing skills alone does not start or connect an editor.</p>
        <p>Stop the running Next server before rebuilding or reinstalling dependencies. The CLI’s <code>stop</code> command manages only its matching background server.</p>
        <pre><code>{`npm run chorono -- stop
npm run chorono -- setup --rebuild
npm run chorono -- start --background --open`}</code></pre>
        <p>See <a href={`${REPOSITORY_URL}/blob/main/docs/en/installation.md`}>installation details</a> and <a href={`${REPOSITORY_URL}/blob/main/docs/en/troubleshooting.md`}>connection troubleshooting</a>. The external agent’s local MCP workflow needs no provider API key in the editor.</p>
      </section>
    </GuideLayout>
  )
}
