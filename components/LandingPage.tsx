'use client';

import React, { useState } from "react";
import HeroCharacters from '@/components/hero/HeroCharacters';
import HeroProjectBridge from '@/components/hero/HeroProjectBridge';
import { useHeroCrew } from '@/components/hero/useHeroCrew';
import { RUNTIME_URL, RUNTIME_REPOSITORY_URL } from '@/lib/site';
import { USE_CASES } from '@/lib/use-cases';
import { ANIMATION_EXAMPLES } from '@/lib/animation-example';
import {
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle2,
  Code2,
  Copy,
  Github,
  Layers,
  Play,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import {
  trackCodeCopy,
  trackAction
} from "@/lib/analytics";

const LINKS = {
  docs: "/getting-started",
  examples: "/agent-skills",
  androidImplementation: "https://github.com/codie1982/chorono-android-sdk",
};

interface CodeBlockProps {
  title: string;
  subtitle?: string;
  children: string;
}

/** Keeps copyable source scrollable within the available panel width. */
function CodeBlock({ title, subtitle, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      trackCodeCopy(title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#e7d8cf] bg-[#15100d] shadow-[0_24px_70px_rgba(66,31,19,0.18)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#d46a43]" />
            <span className="h-3 w-3 rounded-full bg-[#d7a54a]" />
            <span className="h-3 w-3 rounded-full bg-[#6c8f4f]" />
          </div>
          <span className="text-xs font-medium text-zinc-400">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
          {copied && <span className="text-xs text-green-400">Copied!</span>}
        </button>
      </div>
      {subtitle && <div className="px-5 pt-4 text-xs font-medium text-[#d9a08b]">{subtitle}</div>}
      <pre className="overflow-x-auto px-5 py-4 text-left font-mono text-sm leading-7 text-zinc-200">
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}

function FeatureCard({ icon: Icon, title, text }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-[#eadbd2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e9] text-[#B55233]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[#211612]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#6d5a52]">{text}</p>
    </div>
  );
}

export default function ChoronoLandingPage() {
  const crew = useHeroCrew();
  return (
    <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
      <section ref={crew.section} className="relative overflow-hidden bg-[#120D0B] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,82,51,0.35),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(217,111,69,0.2),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">


          <div className="grid items-center gap-12 pb-12 pt-20 lg:grid-cols-[0.9fr_1.35fr] lg:pb-16 lg:pt-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
                <Zap className="h-4 w-4 text-[#ffb397]" />
                Free and open-source animation editor
              </div>

              <h1 className="max-w-xl text-[clamp(2.25rem,12vw,3rem)] font-black leading-[0.98] tracking-tight md:text-6xl">
                Create editable
                <span className="block text-[#d96f45]">2D animations.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
                Install Chorono on your computer, then open the free, open-source editor in your browser. Create with timelines, keyframes and particles, or connect Claude or Codex through MCP to create, preview and save editable projects.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={LINKS.docs}
                  {...crew.cta('install')}
                  onClick={event => { trackAction('editorSetup', 'hero'); crew.navigate(event, 'celebrate'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B55233] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(181,82,51,0.35)] transition hover:bg-[#8F3D27]"
                >
                  <Github className="h-4 w-4" />
                  Install the free editor
                </a>
                <a
                  href={LINKS.examples}
                  {...crew.cta('skills')}
                  onClick={event => { trackAction('agentSkills', 'hero'); crew.navigate(event, 'highfive'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore agent skills
                </a>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-4 text-sm text-zinc-400 sm:grid-cols-4">
                {['Free & Open Source', 'Editable Projects', 'Agent Control', 'Local Setup'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d96f45]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <HeroCharacters crew={crew} />
          </div>
        </div>
      </section>

      <HeroProjectBridge />

      <section id="runtime" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-10 sm:py-12">
        <h2 className="mb-3 text-2xl font-bold">Bring your animation into an app</h2>
        <p className="mb-6 max-w-2xl leading-7 text-[#6d5a52]">Create and export scenes with the editor, then play them in a web application with the separate <code>@chorono/runtime</code> package. The Android SDK provides its own native integration.</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="min-w-0 rounded-3xl border border-[#e7d8cf] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff0e9] text-[#B55233]">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Chorono Runtime</h2>
                <p className="text-sm text-[#6d5a52]">A framework-free player for exported scenes. npm version 0.1.0.</p>
              </div>
            </div>
            <CodeBlock title="terminal">$ npm i @chorono/runtime</CodeBlock>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-3">
                <Code2 className="h-5 w-5 text-[#B55233]" />
                <h3 className="font-semibold">Use in Web</h3>
              </div>
              <p className="mb-3 text-sm leading-6 text-[#6d5a52]">In your bundled web app, add a canvas and import the scene JSON exported from the editor.</p>
              <CodeBlock title="index.html">{`<canvas id="animation" width="1024" height="768"></canvas>`}</CodeBlock>
              <div className="mt-4">
                <CodeBlock title="player.js">{`import { ChronoPlayer, CanvasRenderAdapter } from "@chorono/runtime";
import scene from "./hero.chorono.json";

const canvas = document.querySelector("#animation");
const ctx = canvas.getContext("2d");
const adapter = new CanvasRenderAdapter(ctx);
const player = new ChronoPlayer(scene, adapter, { loop: true });

player.play();`}</CodeBlock>
              </div>
              <a href={`${RUNTIME_REPOSITORY_URL}/blob/main/docs/en/01-getting-started.md`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8F3D27]">Read runtime documentation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-[#e7d8cf] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff0e9] text-[#B55233]">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Android SDK</h2>
                <p className="text-sm text-[#6d5a52]">Use Chorono animations inside native Android applications.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-bold">1. Add the dependency</h3>
                <p className="mb-3 text-sm text-[#6d5a52]">Add the following to your app module’s Kotlin DSL file, <code>app/build.gradle.kts</code>.</p>
                <CodeBlock title="app/build.gradle.kts">{`dependencies {
    implementation("com.chorono:chorono-android:1.0.0")
}`}</CodeBlock>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold">2. Use in code</h3>
                <p className="mb-3 text-sm text-[#6d5a52]">Load and play a Chorono animation.</p>
                <CodeBlock title="MainActivity.kt">{`val view = ChoronoView(this)
view.setAnimation("hero.chorono")
view.play()

root.addView(view)`}</CodeBlock>
              </div>

              <a
                href={LINKS.androidImplementation}
                onClick={() => trackAction('androidSdk', 'integration')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B55233] hover:text-[#8F3D27]"
              >
                View Android implementation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </section>

      <section aria-labelledby="editor-features-heading" className="mx-auto max-w-7xl px-6 pb-14 pt-2">
        <h2 id="editor-features-heading" className="mb-3 text-2xl font-bold">Create and refine in the editor</h2>
        <p className="mb-6 max-w-2xl leading-7 text-[#6d5a52]">Use these tools in your local Chorono editor to build and revise your animation before exporting it for an app.</p>
        <div className="grid gap-4 md:grid-cols-4">
          <FeatureCard icon={Layers} title="Editor-first" text="Timeline, dope sheet, curve editor and modifiers in one animation workflow." />
          <FeatureCard icon={Box} title="Editable Projects" text="Keep layers, keyframes and animation settings available for the next revision." />
          <FeatureCard icon={Zap} title="Agent Control" text="Connect Claude or Codex through MCP to create, inspect and refine scenes." />
          <FeatureCard icon={Play} title="Preview and Refine" text="Inspect animation frames, adjust timing and save a portable project." />
        </div>
      </section>

      <section aria-labelledby="examples-heading" className="mx-auto max-w-7xl px-6 pb-14 pt-2">
        <div className="mb-6"><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8F3D27]">Real scenes. Editable source.</p><h2 id="examples-heading" className="text-3xl font-bold tracking-tight">See the motion. Open the project.</h2><p className="mt-3 max-w-2xl leading-7 text-[#6d5a52]">Explore a process graphic, a readable title and a kinetic typography study. Each includes playback, timing notes and a project you can download.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{Object.entries(USE_CASES).map(([href, item]) => <a key={href} href={href} className="group overflow-hidden rounded-2xl border border-[#e7d8cf] bg-white hover:border-[#B55233]"><img src={`/examples/${item.exampleId}.png`} alt={ANIMATION_EXAMPLES[item.exampleId].alt} width={1200} height={675} loading="lazy" className="aspect-video w-full object-cover" /><div className="p-6"><h3 className="text-xl font-bold">{item.label}</h3><p className="mt-3 text-sm leading-7 text-[#6d5a52]">{item.description}</p><span className="mt-5 block text-sm font-semibold text-[#8F3D27]">Explore the example →</span></div></a>)}</div>
      </section>

      <section aria-labelledby="fundamentals-heading" className="mx-auto max-w-7xl px-6 pb-14 pt-2">
        <div className="mb-6"><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8F3D27]">Learn by inspecting</p><h2 id="fundamentals-heading" className="text-3xl font-bold tracking-tight">Understand the movement.</h2><p className="mt-3 max-w-2xl leading-7 text-[#6d5a52]">Read real keyframe values and compare easing curves before you change the scene.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
          <a href="/keyframe-animation" className="rounded-2xl border border-[#e7d8cf] bg-white p-6 hover:border-[#B55233]"><h3 className="text-xl font-bold">Keyframe animation, explained</h3><p className="mt-3 text-sm leading-7 text-[#6d5a52]">Follow position, opacity and timing in a working title card. Download its project and try a focused revision.</p><span className="mt-5 block text-sm font-semibold text-[#8F3D27]">Read the keyframe guide →</span></a>
          <a href="/animation-easing" className="rounded-2xl border border-[#e7d8cf] bg-white p-6 hover:border-[#B55233]"><h3 className="text-xl font-bold">Animation easing, compared</h3><p className="mt-3 text-sm leading-7 text-[#6d5a52]">Scrub four curves at the same moment to see how acceleration changes the feeling of a movement.</p><span className="mt-5 block text-sm font-semibold text-[#8F3D27]">Compare the easing curves →</span></a>
        </div>
      </section>

      <section aria-labelledby="blog-heading" className="mx-auto max-w-7xl px-6 pb-14 pt-2">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8F3D27]">From the Chorono blog</p><h2 id="blog-heading" className="text-3xl font-bold tracking-tight">Start with a prompt.</h2></div>
          <a href="/blog" className="text-sm font-semibold text-[#8F3D27] hover:underline">All animation guides →</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: '/blog/make-animations-with-claude', label: 'Claude Code', title: 'Make animations with Claude', text: 'Install Chorono, connect MCP and create your first editable title card.' },
            { href: '/blog/make-animations-with-codex', label: 'Codex', title: 'Animate with Codex', text: 'Set up the editor and turn a clear brief into editable layers and keyframes.' },
            { href: '/blog/animation-prompts-for-claude-and-codex', label: 'Prompt recipes', title: 'Six prompts to try', text: 'Title cards, loading loops, wordmark reveals and focused revisions.' },
          ].map(post => <a key={post.href} href={post.href} className="rounded-2xl border border-[#e7d8cf] bg-white p-6 hover:border-[#B55233]"><span className="text-xs font-semibold uppercase tracking-wider text-[#8F3D27]">{post.label}</span><h3 className="mt-3 text-xl font-bold">{post.title}</h3><p className="mt-3 text-sm leading-7 text-[#6d5a52]">{post.text}</p><span className="mt-5 block text-sm font-semibold text-[#8F3D27]">Read the guide →</span></a>)}
        </div>
      </section>


    </main>
  );
}
