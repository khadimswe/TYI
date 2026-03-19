## Expo CLI with Xcode Setup Guide

### Current Issues
1. ❌ Xcode Command Line Tools not properly linked
2. ❌ iOS simulator not accessible (xcrun simctl error 72)
3. ✅ Missing packages installed

### Solution: Set up Xcode Command Line Tools

#### Option 1: Use Terminal (Recommended - No sudo needed)
```bash
# Check if Xcode.app exists
ls -la /Applications/ | grep Xcode

# If Xcode is installed, verify the developer path
xcode-select -p

# View available Xcode installations
ls -la /Applications | grep -i xcode
```

#### Option 2: Install via App Store
1. Open **App Store** on your Mac
2. Search for **Xcode**
3. Click **Install** or **Get**
4. Wait for installation (will take 15-45 minutes, ~12GB)
5. After installation, launch Xcode once to complete setup
6. Agree to the Xcode license

#### Option 3: Use Command Line
```bash
# This will download and install Xcode Command Line Tools (~1GB)
xcode-select --install
```

### After Xcode Installation

Once Xcode is fully installed:

```bash
# Reset to default Xcode path
sudo xcode-select --reset

# Verify it's working
xcrun simctl list devices

# Launch Expo with iOS simulator
cd /Users/adamburkey/bankHackathon/TYI/TLR/frontend
npx expo start
# Then press 'i' to open iOS simulator
```

### What Each Command Does

- `xcode-select -p` → Shows current Xcode path
- `xcode-select --install` → Installs Command Line Tools only (faster)
- `xcode-select --reset` → Resets to default Xcode installation
- `xcrun simctl list devices` → Lists available iOS simulators
- `xcrun simctl create "iPhone 14" com.apple.CoreSimulator.SimDeviceType.iPhone-14 com.apple.CoreSimulator.SimRuntime.iOS-17-0` → Create new simulator

### Alternatives if Xcode Installation Issues Persist

**Use Android Emulator instead:**
```bash
npx expo start
# Press 'a' for Android
```

**Use Web version:**
```bash
npx expo start --web
# Available at http://localhost:8081
```

**Use Expo Go App:**
- Install Expo Go from App Store or Play Store
- Scan the QR code shown in terminal
- Test on physical device without simulator

### Package Updates Needed
Update expo-location to match Expo version:
```bash
npm install expo-location@~19.0.8
```

### Troubleshooting

If you see: `Error: xcrun simctl help exited with non-zero code: 72`
→ Xcode Command Line Tools are not properly installed/linked

If Xcode installation from App Store is slow:
→ Download Xcode Command Line Tools instead:
   ```bash
   xcode-select --install
   ```

### Next Steps
1. Install Xcode fully (App Store or xcode-select --install)
2. Run: `npx expo start`
3. Press 'i' for iOS simulator, 'a' for Android, or 'w' for web
