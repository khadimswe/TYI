# iOS Simulator Setup Guide

## Current Status
❌ No iOS simulators/runtimes installed
✅ Xcode is installed
✅ Device types available (iPhone 15, iPhone 14, etc.)

## Solution: Install iOS Simulators

### Option 1: Install via Xcode (Recommended but large)
```bash
# Open Xcode and go to: Xcode > Settings > Platforms
# Select iOS and click the + button, then install
# This downloads ~3-5GB of iOS simulators
```

### Option 2: Install via Command Line
```bash
# List available runtimes
xcrun simctl list runtimes

# Install iOS simulators (this may take 10-30 minutes)
# Unfortunately, this typically requires Xcode.app GUI or Xcode Preferences
```

### Option 3: Use Physical Device with Expo Go (Fastest!)
```bash
# 1. Install Expo Go from App Store on your iPhone
# 2. Run: cd /Users/adamburkey/bankHackathon/TYI/TLR/frontend
# 3. Run: npx expo start
# 4. Scan the QR code with your iPhone camera
# 5. Opens directly in Expo Go - no simulator needed!
```

### Option 4: Use Android Emulator
```bash
# If you have Android SDK installed:
cd /Users/adamburkey/bankHackathon/TYI/TLR/frontend
npx expo start
# Press 'a' for Android
```

### Option 5: Use Web Version
```bash
cd /Users/adamburkey/bankHackathon/TYI/TLR/frontend
npx expo start --web
# Or press 'w' in the running Expo CLI
# Accessible at: http://localhost:8081
```

## Manual iOS Simulator Install Steps

1. Open Xcode.app
2. Go to **Xcode** menu → **Settings** (or **Preferences**)
3. Click the **Platforms** tab
4. Locate **iOS** 
5. Click the **"+"** button next to your desired iOS version
6. Wait for download and installation (3-5GB)
7. Once complete, try: `npx expo start` then press 'i'

## Recommended Path Forward

For immediate testing without waiting for iOS simulator download:
1. **Use Expo Go** (instant, on your phone)
2. **Use Web** (instant, in browser at http://localhost:8081)
3. **Use Android** (if SDK installed)

Once iOS simulators are installed, you can develop iOS apps without needing a physical device.

## Verify Installation
```bash
/Applications/Xcode.app/Contents/Developer/usr/bin/simctl list runtimes
```
If you see iOS versions listed, simulators are installed.
