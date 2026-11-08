# Chorono documentation

Create editable 2D animations with Chorono, a free, open-source animation editor that runs locally in your browser. Work with layers, keyframes and timelines, or connect Claude Code or Codex through MCP to create and revise the same scene.

## Start here

- [Install Chorono](installation.md): prepare the local editor and check that it starts correctly.
- [Create your first animation](getting-started.md): open an editable example, change the text and save your own version.
- [Connect an AI agent](installation.md#2-start-and-connect): connect a browser editor to Claude Code or Codex.
- [Install animation skills](agent-skills.md): understand the setup and authoring skills and keep them updated.

The editor is free under the [MIT license](../../LICENSE). Your chosen agent provider manages its own access and billing. You can edit a project manually without connecting an agent.

## Learn with an editable project

### Your first editable animation

Follow the [first-animation tutorial](getting-started.md). Start with a real project containing named layers and inspect the animation before changing it. Keep a portable JSON copy so you can reopen the result.

### Make a looping animation

Follow the [loop animation tutorial](loop-animation.md) to inspect a three-dot loading loop. Read the actual timing, reduce the movement and check the transition from the end back to the beginning.

### Understand the movement

Use the live [keyframe animation guide](https://www.chorono.com/keyframe-animation) and [easing comparison](https://www.chorono.com/animation-easing) to understand timing and acceleration, then apply those ideas to your own scene.

## Editor guides

| Guide | What you will learn |
| --- | --- |
| [Layers](layers.md) | Organize the objects that make up a scene. |
| [Timeline](editor-timeline.md) | Work with animation tracks, keyframes and timing. |
| [Particle effects](particle-effects.md) | Configure emitters and particle behavior. |
| [State machines](state-machines.md) | Connect animation states and transitions. |
| [Parameter wiring](parameter-wiring.md) | Connect parameter values to scene properties. |

## Create with an agent or JavaScript

- [Agent skills](agent-skills.md): install instructions for connection and scene authoring.
- [JavaScript scene scripting](scripting.md): create native layers and timelines through the isolated MCP scripting bridge.
- [Troubleshooting](troubleshooting.md): diagnose missing sessions, stale configuration and startup problems.

MCP connects the agent to a running editor. A skill supplies instructions. Installing a skill alone does not start Chorono or connect an editor tab.

## Keep learning

Explore [text animation](https://www.chorono.com/text-animation), [kinetic typography](https://www.chorono.com/kinetic-typography) and [motion graphics projects](https://www.chorono.com/motion-graphics-software). Each guide shows an editable project you can inspect and download.

For software changes, read the [release notes](../releases/v0.2.0.md) and [changelog](../../CHANGELOG.md).
