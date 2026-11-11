# Chorono animation Web Component

**Coming soon.** The Chorono Web Component is intended to place an animation in a page through a custom HTML element. The component shell exists, but it is not yet a working drop-in player.

## An embed for an authored scene

The planned `<chorono-player>` element wraps the JavaScript runtime. Its job is to load and display a Chorono scene, rather than animate arbitrary DOM elements or replace a website's CSS transitions. It could simplify integration where the host allows custom elements and scripts.

The source defines the element and its connected/disconnected lifecycle. The connection to the actual runtime is still unfinished, along with playback methods, attribute handling and emitted events. The presence of a `src`, `loop` or `autoplay` attribute in a prototype does not establish working playback.

## What you can use today

If you control the page's JavaScript, mount the [published canvas player](runtime-javascript.md) directly. For a file that plays on its own, review [standalone HTML export](export-html.md). A CMS may restrict scripts, so test the real host before choosing either route.

## Installation and downloads

The `@chorono/embed` package is not publicly available from npm at the latest check. A tested script URL, element example and event reference will be added here with its release. Until then, use [SDK downloads](runtime-downloads.md) for the available browser package.
