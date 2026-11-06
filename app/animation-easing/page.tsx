import Link from 'next/link'
import AnimationExample from '@/components/AnimationExample'
import AnimationGuideLayout from '@/components/AnimationGuideLayout'
import EasingExplorer from '@/components/EasingExplorer'
import { animationGuideMetadata } from '@/lib/animation-guides'

export const metadata = animationGuideMetadata('/animation-easing')

export default function AnimationEasing() {
  return <AnimationGuideLayout path="/animation-easing">
    <section id="compare-easing-curves"><h2>Compare four easing curves</h2>
      <p>Scrub the same moment across four movements. Each object starts at 0, ends at 100 and has the same duration. Only its easing changes. The graph’s horizontal axis is elapsed time; its vertical axis is distance travelled. A steeper section means faster movement.</p>
      <EasingExplorer />
      <p>At halfway through the duration, linear and ease-in-out are both halfway along the path. Ease-in has covered only 12.5% of the distance, while ease-out has covered 87.5%. All four still reach the same endpoint at 100% time. Easing changes the journey, not the scheduled finish.</p>
      <p>These are the cubic presets in Chorono runtime 0.1.0. The familiar CSS keywords have the same broad acceleration patterns but use different Bézier curves, so their intermediate numbers differ. For CSS syntax and browser-specific definitions, see <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Easing_functions">MDN’s easing functions guide</a>.</p>
    </section>
    <section id="choose-an-easing"><h2>Choose an easing for the action</h2>
      <dl>
        <dt>Linear: keep the speed steady</dt><dd>Use a constant rate when the movement should feel continuous, such as an unbroken rotation. Linear also makes a useful baseline when comparing a curve. It does not automatically make an animation wrong or unfinished.</dd>
        <dt>Ease in: accelerate away</dt><dd>Start slowly and gather speed. This can suit an object leaving a composition. Because more distance is covered late, check the final frames for an abrupt departure.</dd>
        <dt>Ease out: arrive and settle</dt><dd>Start quickly and slow toward the destination. Try it for a short title entrance where the reader should find the final position promptly. Keep the travel restrained so the fast beginning does not distract from the words.</dd>
        <dt>Ease in-out: move between two resting states</dt><dd>Accelerate from the first pose and decelerate into the second. Try it for a deliberate movement between two on-screen positions. Separate eased segments can each slow at their join, so check whether you wanted a pause or continuous travel.</dd>
      </dl>
      <p><strong>Hold</strong> is another useful choice: keep the earlier value until the next keyframe. It creates a deliberate step instead of a gradual transition. Use it for a pose change or a timed state switch when smooth movement would communicate the wrong thing.</p>
    </section>
    <section id="easing-in-chorono"><h2>Find easing in a real Chorono project</h2>
      <p>The “Ideas in motion” project combines two easing choices. Its main title moves upward with ease-out from 0 to 1.2 seconds. The underline grows with ease-in-out from 1.2 to 3 seconds. They do not need the same curve because the entrance and the line reveal have different jobs.</p>
      <AnimationExample />
      <p>Download the scene and choose <strong>Open Scene JSON</strong> in a separate Chorono editor tab. Inspect the vertical-position track on “Title — Ideas”. Its first keyframe stores y = 192 at 0 milliseconds and has easeOut easing. The next keyframe stores y = 164 at 1200 milliseconds. In Chorono, the curve belongs to the interval leaving the earlier keyframe.</p>
      <p>At 600 milliseconds, the title is at y = 167.5 with the original cubic ease-out preset. A linear entrance between the same values would place it at y = 178. Both end at y = 164. The ease-out version has already covered most of the 28-pixel rise by the midpoint.</p>
      <p>This preview plays the existing seven-layer project through @chorono/runtime; it is separate from the four-curve comparison above. The portable download contains its original keyframes and can be edited in the local Chorono editor.</p>
    </section>
    <section id="revise-the-curve"><h2>Change the curve without changing the brief</h2>
      <p>Compare one variable at a time. Keep the start value, end value and duration fixed while changing the easing. Otherwise a longer duration or shorter distance may explain the improvement you attribute to the curve.</p>
      <p>With the <Link href="/agent-skills">Chorono skills</Link> installed and the editor connected, give Claude Code or Codex a specific revision:</p>
      <pre className="prompt-block"><code>Read the open Ideas in motion scene. Make a comparison copy. On Title — Ideas, change only the outgoing easing of the first vertical-position keyframe from easeOut to linear. Keep y = 192 at 0 ms and y = 164 at 1200 ms. Preserve the opacity track and all other layers. Inspect 0, 600 and 1200 ms, validate and save the copy so I can compare it with the original.</code></pre>
      <p>Review the result before applying the same change to another property. An object can move linearly while fading with ease-out. If you need the two changes to feel linked, inspect their combined result as well as their individual tracks.</p>
    </section>
    <section id="easing-review"><h2>Review the movement in context</h2>
      <ul className="list-disc space-y-3 pl-6 leading-8 text-[#6d5a52]">
        <li>Watch the start, midpoint and finish. Matching endpoints can hide a poor transition.</li>
        <li>Check the join between segments. A slowdown at every keyframe can interrupt a movement that should continue.</li>
        <li>Keep enough time for reading after a title settles. Easing does not replace a useful final hold.</li>
        <li>Inspect the animation at its intended display size. Large travel can feel excessive on a small interface.</li>
        <li>Provide a still state and playback controls when embedding motion. This comparison remains still until you move its slider.</li>
      </ul>
      <p>If the endpoints or timing are still unclear, start with the <Link href="/keyframe-animation">keyframe animation guide</Link>. For a practical reading exercise, inspect the stagger and final hold in the <Link href="/text-animation">text animation example</Link>.</p>
    </section>
  </AnimationGuideLayout>
}
