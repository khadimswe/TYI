#!/bin/bash

# Expo + Xcode Setup Script for TYI Project

echo "🚀 Setting up Expo with Xcode..."

# Navigate to frontend
cd /Users/adamburkey/bankHackathon/TYI/TLR/frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Ensure all required packages are installed
echo "📦 Ensuring required packages..."
npm install expo-location expo-document-picker --legacy-peer-deps

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Run: npx expo start"
echo "  2. Press 'w' for web (http://localhost:8081)"
echo "  3. Press 'i' for iOS simulator"
echo "  4. Press 'a' for Android"
echo ""
echo "ℹ️  If iOS simulator has issues, try:"
echo "  - Restart Xcode"
echo "  - Run: sudo killall -9 com.apple.CoreSimulator.CoreSimulatorService"
echo "  - Then press 'i' in Expo again"
