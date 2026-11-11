# Chorono Android animation SDK

Use the published Chorono Android SDK to play an authored animation in an Android view or Jetpack Compose screen. Version **1.0.0** is available from Maven Central, with a native player, `ChoronoView` and a Compose wrapper.

## Install from Maven Central

Version 1.0.0 requires **Android 7.0 / API 24 or later**. Its published AAR contains native libraries for **arm64-v8a** and **x86_64** only. Use a device or emulator with one of those architectures; this release does not include 32-bit ARM or x86 libraries.

In an existing Android project, make sure your dependency repositories include Maven Central. If you already have a `dependencyResolutionManagement` block in `settings.gradle.kts`, add the repository there:

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
```

Add the versioned dependency to your app module's `build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.grntsoftware:chorono-android-sdk:1.0.0")
}
```

Sync the Gradle project before adding the player to your screen. This is the native Android package; it does not use the npm package or the browser's `CanvasRenderAdapter`.

## Show an animation in Jetpack Compose

Put a Chorono scene that you have checked against the native SDK in `app/src/main/assets/intro.chorono.json`. The `sceneFile` argument is a filename relative to that assets directory.

In an app with Compose already configured:

```kotlin
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.grntsoftware.chorono.ScaleMode
import com.grntsoftware.chorono.compose.ChoronoAnimator

@Composable
fun IntroAnimation() {
    ChoronoAnimator(
        sceneFile = "intro.chorono.json",
        modifier = Modifier.fillMaxWidth().height(220.dp),
        scaleMode = ScaleMode.FIT
    )
}
```

The published view begins playback when the scene loads. Give it an explicit display size and check how the composition fits inside it. The wrapper also accepts scene parameters and callbacks for animation and layer events; use names declared by your scene.

This SDK plays a Chorono scene inside your interface. For a simple Compose transition between ordinary UI states, you may not need an authored animation file or this player.

## Use the Android view directly

For a View-based screen, the package exposes `com.grntsoftware.chorono.view.ChoronoView`. After attaching it to your layout, `load("intro.chorono.json")` reads a bundled asset. The API also provides timeline controls and parameter setters. Inspect the published source archive below for exact signatures when connecting a particular interaction.

The native loader expects a scene object with `composition` at the top level. Do not pass the entire JavaScript export envelope containing `runtime` and `warnings`. Review [runtime export](export-runtime-json.md), retain the [editable project](export-project-json.md), and validate the scene on the native player.

## Downloads and package metadata

| File | Link | Purpose |
| --- | --- | --- |
| Android library | [Download SDK 1.0.0 AAR](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0.aar) | Published library artifact; Gradle is the normal installation path |
| Sources | [Download SDK 1.0.0 sources](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0-sources.jar) | Published Kotlin player, view and Compose APIs |
| POM | [Read dependency metadata](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/1.0.0/chorono-android-sdk-1.0.0.pom) | Coordinates and declared dependencies |
| Version metadata | [View Maven release metadata](https://repo.maven.apache.org/maven2/com/grntsoftware/chorono-android-sdk/maven-metadata.xml) | Published version list |

The version and file links were checked on 11 November 2026. Downloading an AAR alone does not configure its dependencies; use Gradle unless you are managing those dependencies yourself.

## Check the scene on Android

Start with a small scene and inspect playback, fonts, images and interaction on your target device. A published SDK version does not imply support for every feature added to a newer editor. Keep the package version pinned while validating your application.

For browser playback, use the separate [JavaScript runtime](runtime-javascript.md). The [React Native](runtime-react-native.md) and [Kotlin Multiplatform](runtime-kotlin-multiplatform.md) projects are still in development; the Android release does not make those wrappers available automatically.
