# Android Setup Guide for PB2019

This guide will help you complete the Android setup for building native Android apps with Tauri.

## Current Status

✅ **Completed:**
- Rust Android targets installed (aarch64, armv7, i686, x86_64)
- tauri.conf.json updated with Android configuration
- Project configured for Android builds

⏳ **Required:**
- Android SDK and NDK installation
- Environment variables configuration
- Android Studio setup

## Prerequisites

### 1. Install Android Studio

Download and install Android Studio from: https://developer.android.com/studio

### 2. Install SDK Components

After installing Android Studio, open it and go to:
- **Tools → SDK Manager → SDK Tools tab**

Install the following components:
- ✅ Android SDK Platform (API 36)
- ✅ Android SDK Platform-Tools
- ✅ Android SDK Build-Tools (latest version)
- ✅ Android SDK Command-line Tools
- ✅ NDK (Side by side) - version 29 or later

### 3. Set Environment Variables

Add these to your `~/.bashrc` or `~/.zshrc`:

```bash
# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# Android NDK (adjust version number to match your installed NDK)
export NDK_HOME=$ANDROID_HOME/ndk/29.0.13846066

# Java (bundled with Android Studio)
export JAVA_HOME=/opt/android-studio/jbr  # Adjust path for your system
```

**Note:** The exact paths may vary. To find your NDK version:
```bash
ls $ANDROID_HOME/ndk/
```

After adding these, reload your shell:
```bash
source ~/.bashrc  # or ~/.zshrc
```

### 4. Verify Installation

Check that everything is set up correctly:

```bash
# Check Android SDK
echo $ANDROID_HOME
adb --version

# Check NDK
echo $NDK_HOME
ls $NDK_HOME

# Check Java
echo $JAVA_HOME
java -version

# Check Rust targets
rustup target list --installed | grep android
```

## Building for Android

Once the prerequisites are installed:

### Initialize Android Project (if needed)

```bash
npm run tauri android init
```

### Development Build

```bash
npm run tauri android dev
```

### Production Build

```bash
npm run tauri android build
```

### Build APK

```bash
npm run tauri android build -- --apk
```

### Build AAB (for Google Play Store)

```bash
npm run tauri android build -- --aab
```

## Troubleshooting

### SDK Not Found Error
If you get "Android SDK not found" errors:
1. Verify `ANDROID_HOME` is set correctly: `echo $ANDROID_HOME`
2. Check that the directory exists: `ls -la $ANDROID_HOME`
3. Restart your terminal after setting environment variables

### NDK Not Found Error
1. Verify `NDK_HOME` is set: `echo $NDK_HOME`
2. List available NDK versions: `ls $ANDROID_HOME/ndk/`
3. Update `NDK_HOME` to point to an installed version

### Java/JDK Issues
Make sure `JAVA_HOME` points to the JDK bundled with Android Studio or a compatible JDK 17+.

Common paths:
- Linux: `/opt/android-studio/jbr` or `/usr/lib/android-studio/jbr`
- macOS: `/Applications/Android Studio.app/Contents/jbr/Contents/Home`

## Configuration Details

The project is configured with:
- **Package ID:** com.pb2019.app
- **Min SDK Version:** 24 (Android 7.0)
- **Target SDK Version:** 36 (Android 14)
- **App Name:** PB2019 - Prayer Book

These settings can be modified in `src-tauri/tauri.conf.json`.

## Next Steps

After completing the Android SDK/NDK setup:
1. Run `npm run tauri android init` to generate the Android project files
2. Connect an Android device or start an emulator
3. Run `npm run tauri android dev` to test the app
4. Build release APK/AAB when ready for distribution

## Resources

- [Tauri Android Prerequisites](https://tauri.app/start/prerequisites/#android)
- [Tauri Android Guide](https://tauri.app/develop/mobile/)
- [Android Studio Download](https://developer.android.com/studio)
