import type { DocumentationPage } from './manifest'

/** Additive runtime destinations. The existing JavaScript/React/Vue URLs stay
 * in the established manifest. Coming-soon records are real reader pages, but
 * cannot enter the public sitemap or claim an installable SDK. Readonly source
 * metadata is shared by navigation, search, canonical identity and publication. */
export const runtimeGuides: readonly DocumentationPage[] = [
  {
    slug: 'runtime/android', source: 'docs/en/runtime-android.md', label: 'Android / Compose',
    title: 'Chorono Android animation SDK',
    description: 'Install Chorono Android SDK 1.0.0 from Maven Central, load a scene in Jetpack Compose and download the published AAR and sources.',
    section: 'runtime', group: 'Mobile & multiplatform',
  },
  {
    slug: 'runtime/webassembly', source: 'docs/en/runtime-webassembly.md', label: 'WebAssembly',
    title: 'Chorono WebAssembly runtime',
    description: 'Coming soon: a WebAssembly animation SDK with a shared C++ core. Review its partial renderer and the published JavaScript alternative.',
    section: 'runtime', group: 'Web playback', availability: 'coming-soon',
  },
  {
    slug: 'runtime/web-component', source: 'docs/en/runtime-web-component.md', label: 'Web Component',
    title: 'Chorono animation Web Component',
    description: 'Coming soon: a custom element for embedding Chorono animations. See what is being built and how to use the JavaScript player today.',
    section: 'runtime', group: 'Web playback', availability: 'coming-soon',
  },
  {
    slug: 'runtime/ios', source: 'docs/en/runtime-ios.md', label: 'iOS / Swift',
    title: 'Chorono iOS animation SDK',
    description: 'Coming soon: native Chorono animation playback for iOS and Swift. Review the CoreGraphics prototype and current rendering limitations.',
    section: 'runtime', group: 'Mobile & multiplatform', availability: 'coming-soon',
  },
  {
    slug: 'runtime/flutter', source: 'docs/en/runtime-flutter.md', label: 'Flutter',
    title: 'Chorono Flutter animation runtime',
    description: 'Coming soon: Chorono vector animation playback in Flutter. Explore the FFI and widget work underway before a public plugin is available.',
    section: 'runtime', group: 'Mobile & multiplatform', availability: 'coming-soon',
  },
  {
    slug: 'runtime/react-native', source: 'docs/en/runtime-react-native.md', label: 'React Native',
    title: 'Chorono React Native animation runtime',
    description: 'Coming soon: a React Native component for native Chorono animation playback. Check bridge status and its difference from the React web guide.',
    section: 'runtime', group: 'Mobile & multiplatform', availability: 'coming-soon',
  },
  {
    slug: 'runtime/kotlin-multiplatform', source: 'docs/en/runtime-kotlin-multiplatform.md', label: 'Kotlin Multiplatform',
    title: 'Chorono Kotlin Multiplatform runtime',
    description: 'Coming soon: a shared Kotlin API for Chorono animations. Review platform implementation status and the available Android SDK.',
    section: 'runtime', group: 'Mobile & multiplatform', availability: 'coming-soon',
  },
  {
    slug: 'runtime/harmonyos', source: 'docs/en/runtime-harmonyos.md', label: 'HarmonyOS',
    title: 'Chorono HarmonyOS animation runtime',
    description: 'Coming soon: Chorono animation playback for HarmonyOS and ArkUI. See the ArkTS component and native bridge work still in development.',
    section: 'runtime', group: 'Mobile & multiplatform', availability: 'coming-soon',
  },
  {
    slug: 'runtime/desktop', source: 'docs/en/runtime-desktop.md', label: 'Desktop / SDL2',
    title: 'Chorono desktop animation runtime',
    description: 'Coming soon: a C++ and SDL2 player for Chorono desktop animations. Check the prototype renderer and remaining playback work.',
    section: 'runtime', group: 'Desktop', availability: 'coming-soon',
  },
  {
    slug: 'runtime/macos', source: 'docs/en/runtime-macos.md', label: 'macOS / AppKit',
    title: 'Chorono macOS animation runtime',
    description: 'Coming soon: Chorono animation playback in native macOS AppKit views. Review the view prototype and planned player connection.',
    section: 'runtime', group: 'Desktop', availability: 'coming-soon',
  },
  {
    slug: 'runtime/qt', source: 'docs/en/runtime-qt.md', label: 'Qt / QML',
    title: 'Chorono Qt and QML animation runtime',
    description: 'Coming soon: a Qt/QML component for Chorono animation scenes. Check QPainter integration status and how it differs from QML property animation.',
    section: 'runtime', group: 'Desktop', availability: 'coming-soon',
  },
  {
    slug: 'runtime/node', source: 'docs/en/runtime-node.md', label: 'Node.js',
    title: 'Chorono Node.js animation runtime',
    description: 'Coming soon: server-side Chorono animation rendering in Node.js. Review the native bridge and unfinished frame and video export paths.',
    section: 'runtime', group: 'Server & scripting', availability: 'coming-soon',
  },
  {
    slug: 'runtime/python', source: 'docs/en/runtime-python.md', label: 'Python',
    title: 'Chorono Python animation runtime',
    description: 'Coming soon: a Python interface for rendering Chorono animation scenes. Review native bindings, Pillow drawing and current limitations.',
    section: 'runtime', group: 'Server & scripting', availability: 'coming-soon',
  },
  {
    slug: 'runtime/tizen', source: 'docs/en/runtime-tizen.md', label: 'Samsung Tizen',
    title: 'Chorono Tizen animation runtime',
    description: 'Coming soon: Chorono animation playback in Samsung Tizen TV apps. Check runtime loading, remote input and packaging work underway.',
    section: 'runtime', group: 'TVs & mini programs', availability: 'coming-soon',
  },
  {
    slug: 'runtime/webos', source: 'docs/en/runtime-webos.md', label: 'LG webOS',
    title: 'Chorono webOS animation runtime',
    description: 'Coming soon: Chorono animations in LG webOS TV apps. Review the application shell and remaining playback and Magic Remote work.',
    section: 'runtime', group: 'TVs & mini programs', availability: 'coming-soon',
  },
  {
    slug: 'runtime/wechat', source: 'docs/en/runtime-wechat.md', label: 'WeChat Mini Program',
    title: 'Chorono WeChat animation runtime',
    description: 'Coming soon: a Chorono animation component for WeChat Mini Programs. Check canvas playback, scene loading and player lifecycle status.',
    section: 'runtime', group: 'TVs & mini programs', availability: 'coming-soon',
  },
]
