'use client';

import React, { useState, useEffect } from "react";
import { loadGitHubStars } from '@/lib/github-stars.mjs';
import { GUIDE_AUTHOR, RUNTIME_URL, RUNTIME_REPOSITORY_URL } from '@/lib/site';
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
  Package,
  Play,
  Smartphone,
  Terminal,
  Zap,
  Star,
} from "lucide-react";
import {
  trackCodeCopy,
  trackButtonClick,
  trackHeroEditorClick,
  trackGitHubStarView
} from "@/lib/analytics";

const LINKS = {
  github: "https://github.com/codie1982/chorono-editor",
  npm: RUNTIME_URL,
  docs: "/getting-started",
  examples: "/agent-skills",
  androidImplementation: "https://github.com/codie1982/chorono-android-sdk",
};

const ACCENT = "#B55233";
const ACCENT_DARK = "#8F3D27";
const DARK = "#120D0B";

interface CodeBlockProps {
  title: string;
  subtitle?: string;
  children: string;
}

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
    <div className="overflow-hidden rounded-2xl border border-[#e7d8cf] bg-[#15100d] shadow-[0_24px_70px_rgba(66,31,19,0.18)]">
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

function TimelineMockup() {
  const rows = [
    { name: "Camera", dots: [16, 54, 72], color: "#d96f45" },
    { name: "Shape_01", dots: [22, 34, 38, 48, 66], color: "#e6a15f" },
    { name: "Position", dots: [18, 32, 45, 70, 76], color: "#c45535" },
    { name: "Scale", dots: [26, 56, 82], color: "#9f6d4e" },
    { name: "Opacity", dots: [14, 44, 62], color: "#d96f45" },
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_36px_110px_rgba(0,0,0,0.36)] backdrop-blur">
      <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#16110e]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B55233]/20 text-[#ffb397]">
              <Play className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Chorono Preview</div>
              <div className="text-xs text-zinc-500">timeline.runtime</div>
            </div>
          </div>
          <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">00:01:23</div>
        </div>

        <div className="grid grid-cols-[160px_1fr]">
          <aside className="border-r border-white/10 bg-black/10 px-4 py-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              <Layers className="h-3.5 w-3.5" /> Scene
            </div>
            {rows.map((row, index) => (
              <div key={row.name} className="mb-4 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.color }} />
                  {index > 1 ? <span className="pl-4">{row.name}</span> : row.name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
              </div>
            ))}
          </aside>

          <section className="relative px-5 py-5">
            <div className="mb-4 grid grid-cols-7 text-center text-xs text-zinc-600">
              <span>0f</span>
              <span>10f</span>
              <span>20f</span>
              <span>30f</span>
              <span>40f</span>
              <span>50f</span>
              <span>60f</span>
            </div>

            <div className="absolute bottom-0 left-[58%] top-10 w-px bg-[#f3d5ca] shadow-[0_0_22px_rgba(181,82,51,0.9)]" />

            <div className="space-y-4">
              {rows.map((row, rowIndex) => (
                <div key={row.name} className="relative h-8 rounded-lg bg-white/[0.035]">
                  <div className="absolute inset-y-0 left-[8%] right-[6%] rounded-lg bg-white/[0.025]" />
                  {rowIndex === 3 && (
                    <div className="absolute left-[42%] top-1/2 h-4 w-[42%] -translate-y-1/2 rounded-full bg-[#B55233]/55" />
                  )}
                  {rowIndex === 4 && (
                    <div className="absolute left-[52%] top-1/2 h-4 w-[34%] -translate-y-1/2 rounded-full bg-[#d88a68]/40" />
                  )}
                  {row.dots.map((left) => (
                    <span
                      key={left}
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 rounded-[2px]"
                      style={{ left: `${left}%`, background: row.color }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

interface ResourceLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

function ResourceLink({ icon: Icon, label, href }: ResourceLinkProps) {
  return (
    <a href={href} className="inline-flex items-center gap-2 text-sm font-medium text-[#4a332b] hover:text-[#B55233]">
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadGitHubStars().then(count => {
      if (!active) return;
      setStars(count);
      setLoading(false);
      if (count !== null) trackGitHubStarView(count);
    });
    return () => { active = false; };
  }, []);

  return (
    <a
      href={LINKS.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 backdrop-blur"
    >
      <Github className="h-4 w-4" />
      <span>GitHub</span>
      {!loading && stars !== null && (
        <>
          <span className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
            <span className="font-semibold">{stars.toLocaleString()}</span>
          </div>
        </>
      )}
    </a>
  );
}

export default function ChoronoLandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f1ed] text-[#211612]">
      <section className="relative overflow-hidden bg-[#120D0B] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,82,51,0.35),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(217,111,69,0.2),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f7f1ed] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B55233] text-xl font-black shadow-[0_0_36px_rgba(181,82,51,0.5)]">
                C
              </div>
              <div>
                <div className="text-sm font-bold tracking-[0.35em]">CHORONO</div>
                <div className="text-[10px] uppercase tracking-[0.45em] text-zinc-500">Animator</div>
              </div>
            </a>

            <div className="hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex">
              <a href={LINKS.docs} className="hover:text-white">Getting started</a>
              <a href={LINKS.examples} className="hover:text-white">Agent skills</a>
              <a href="/blog" className="hover:text-white">Blog</a>
              <GitHubStarButton />
            </div>
          </nav>

          <div className="grid items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.35fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
                <Zap className="h-4 w-4 text-[#ffb397]" />
                Open-source animation editor
              </div>

              <h1 className="max-w-xl text-5xl font-black leading-[0.98] tracking-tight md:text-6xl">
                Create editable
                <span className="block text-[#d96f45]">2D animations.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
                Build in your browser with timelines, keyframes and particles. Connect Claude or Codex through MCP to create, preview and save projects you can keep editing.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={LINKS.docs}
                  onClick={trackHeroEditorClick}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B55233] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(181,82,51,0.35)] transition hover:bg-[#8F3D27]"
                >
                  <Github className="h-4 w-4" />
                  Get Chorono Editor
                </a>
                <a
                  href={LINKS.examples}
                  onClick={() => trackButtonClick('hero_agent_skills')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore agent skills
                </a>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-4 text-sm text-zinc-400 sm:grid-cols-4">
                {['Open Source', 'Editable Projects', 'Agent Control', 'Local Setup'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#d96f45]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <TimelineMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <a href="/getting-started" className="rounded-3xl border border-[#e7d8cf] bg-white p-7 shadow-sm transition hover:border-[#B55233]">
            <h2 className="text-xl font-bold">Set up your animation workspace</h2>
            <p className="mt-3 leading-7 text-[#6d5a52]">Install Chorono, start the editor and connect your agent. Follow the steps from a fresh checkout to your first saved project.</p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#8F3D27]">Read the setup guide <ArrowRight className="h-4 w-4" /></span>
          </a>
          <a href="/agent-skills" className="rounded-3xl border border-[#e7d8cf] bg-white p-7 shadow-sm transition hover:border-[#B55233]">
            <h2 className="text-xl font-bold">Create with Claude or Codex</h2>
            <p className="mt-3 leading-7 text-[#6d5a52]">Learn what the setup and authoring skills do, how to install them, and how an agent inspects previews while keeping your scene editable.</p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#8F3D27]">Explore the skills <ArrowRight className="h-4 w-4" /></span>
          </a>
        </div>
        <h2 className="mb-3 text-2xl font-bold">Bring your animation into an app</h2>
        <p className="mb-6 max-w-2xl leading-7 text-[#6d5a52]">Create and export scenes with the editor, then play them in a web application with the separate <code>@chorono/runtime</code> package. The Android SDK provides its own native integration.</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#e7d8cf] bg-white p-6 shadow-sm">
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

          <div className="rounded-3xl border border-[#e7d8cf] bg-white p-6 shadow-sm">
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
                <p className="mb-3 text-sm text-[#6d5a52]">Add the following to your app/build.gradle file.</p>
                <CodeBlock title="build.gradle.kts">{`dependencies {
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
                onClick={() => trackButtonClick('android_implementation_link')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B55233] hover:text-[#8F3D27]"
              >
                View Android implementation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
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

      <footer className="border-t border-[#e7d8cf] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B55233] text-xl font-black text-white">C</div>
            <div>
              <div className="font-bold">Chorono Animator</div>
              <div className="text-sm text-[#6d5a52]">Editable animation, with your AI agent.</div>
              <p id="team" className="mt-2 text-sm text-[#6d5a52]">Guides by {GUIDE_AUTHOR.name}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <ResourceLink icon={Github} label="GitHub" href={LINKS.github} />
            <ResourceLink icon={Zap} label="Agent skills" href="/agent-skills" />
            <ResourceLink icon={BookOpen} label="Blog" href="/blog" />
            <ResourceLink icon={Package} label="NPM" href={LINKS.npm} />
            <ResourceLink icon={BookOpen} label="Docs" href={LINKS.docs} />
          </div>
        </div>
      </footer>
    </main>
  );
}
