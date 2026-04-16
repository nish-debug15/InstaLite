# InstaLite

A **React Native social media UI clone** inspired by Instagram, built to understand core concepts of mobile app development such as:

- User Interface Design
- Navigation between screens
- Form handling
- State management
- React Native project structure

---

## Features

- **Camera Screen** — Capture photos using front or back camera with flash toggle
- **Camera Flip** — Switch between front and back camera in real time
- **Stories** — Instagram-style story bubbles with full-screen viewer, progress bars, and tap-to-advance
- **Full Screen Viewer** — Modal-based story viewer with per-story animated progress and user-to-user navigation
- **Permission Handling** — Camera permission request with graceful fallback UI

---

## Tech Stack

| Library | Purpose |
|---|---|
| React Native | Core framework |
| react-native-vision-camera | Camera access & photo capture |
| React Navigation | Screen navigation |

---

## Setup

### Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio / Xcode

### Install

```bash
git clone https://github.com/nish-debug12/InstaLite.git
cd instalite
npm install
```

### iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

### Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Add to `ios/InstaLite/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>InstaLite needs camera access to take photos.</string>
```

---

## License

MIT
