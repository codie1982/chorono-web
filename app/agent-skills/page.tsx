import Link from 'next/link'
import GuideLayout from '@/components/GuideLayout'
import { pageMetadata, REPOSITORY_URL } from '@/lib/site'

export const metadata = pageMetadata(
  'Chorono Skills for Claude and Codex | Chorono',
  'Learn how chorono-setup and chorono skills help Claude and Codex install the editor, create editable animations, inspect previews and save projects.',
  '/agent-skills',
)

export default function AgentSkills() {
  return (
    <GuideLayout title="Build animations with your agent" description="Two skills teach Claude Code and Codex how to connect to Chorono and create animations that stay editable.">
      <section>
        <h2>Two skills, one workflow</h2>
        <dl>
          <dt><code>chorono-setup</code></dt>
          <dd>Prepares the editor and MCP client connection, starts the local server, checks readiness and manages installed skills.</dd>
          <dt><code>chorono</code></dt>
          <dd>Creates and edits scenes, layers, keyframes and independent animations. It guides the agent to inspect real preview images, validate the scene and save a portable project.</dd>
        </dl>
        <p>A skill provides instructions. MCP, the connection between the agent client and the editor, supplies the tools. Installing instructions alone does not install an editor or load tools into an open chat.</p>
      </section>
      <section>
        <h2>Install the bundled skills</h2>
        <p>The <Link href="/getting-started">editor setup</Link> already installs both skills for the selected Codex and Claude Code clients. From an existing editor checkout, you can also manage only the skills:</p>
        <pre><code>{`npm run cli:build
npm run skills -- list
npm run skills -- install --dry-run
npm run skills -- install
npm run skills -- check`}</code></pre>
        <p>Project skills are placed in <code>.agents/skills/</code> for Codex and <code>.claude/skills/</code> for Claude Code. Add <code>--global --agent codex</code> for a user-wide Codex install, or select <code>--agent claude-code</code>. Start a new agent session afterward.</p>
      </section>
      <section>
        <h2>What the agent reads</h2>
        <pre><code>{`skills/
  chorono-setup/
    SKILL.md
  chorono/
    SKILL.md
    references/
      connection.md
      animation.md
      interaction.md
      media-and-output.md`}</code></pre>
        <p>The main files describe the workflow. Topic references provide connection, animation, interaction and output details when needed. The agent reads the connected editor’s actual tool schemas before choosing properties and operations.</p>
      </section>
      <section>
        <h2>Create, inspect, refine</h2>
        <p>Ask for a named scene, timing and output. The agent reads existing work, preserves unrelated objects, creates or adjusts animations, then reviews images at meaningful moments. You can refine the same scene in the browser or continue in the chat.</p>
        <blockquote>Use Chorono to animate a product title with an intro, a looping idle and an outro. Check text fit and transitions in preview images, then save the editable project.</blockquote>
        <p>For updates, rebuild the bundle from your chosen source version and use <code>npm run skills -- update</code>. The CLI preserves locally modified or foreign copies. Its check compares against the local bundle, not the latest npm release.</p>
        <p>Read the full <a href={`${REPOSITORY_URL}/blob/main/skills/chorono/SKILL.md`}>authoring skill</a>, <a href={`${REPOSITORY_URL}/blob/main/skills/chorono-setup/SKILL.md`}>setup skill</a> and <a href={`${REPOSITORY_URL}/blob/main/docs/en/agent-skills.md`}>installation and update reference</a>.</p>
      </section>
    </GuideLayout>
  )
}
