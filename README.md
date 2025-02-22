# Mr. Bat - Meditation & Mood Tracking App

A React Native application designed to help users track their mood, practice meditation, and listen to calming stories. The app features a beautiful UI with dynamic backgrounds, mood-based meditation sessions, and personalized story recommendations.

## Features

- **Mood Tracking**: Track your daily mood with an intuitive interface
- **Guided Meditation**: Enjoy mood-based meditation sessions with calming background music
- **Story Playback**: Listen to curated stories based on your current mood
- **Theme Customization**: Personalize your experience with dark mode, accent colors, and animation settings
- **Progress Statistics**: View your mood patterns with weekly statistics
- **Favorite Stories**: Save and revisit your favorite stories

## Technical Stack

- React Native
- TypeScript
- Zustand for state management
- Custom Native Modules for audio playback
- React Native SVG for vector graphics
- AsyncStorage for persistent data storage

## Getting Started

### Prerequisites

- Node.js (LTS version)
- React Native development environment setup
- iOS: XCode (for Mac users)
- Android: Android Studio

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install iOS dependencies (iOS only):
   ```bash
   cd ios && pod install
   ```

### Running the App

#### iOS
```bash
npx react-native run-ios
```

#### Android
```bash
npx react-native run-android
```

## Project Structure

```
├── assets/              # Images, fonts, and SVG icons
├── components/          # Reusable UI components
├── containers/          # Screen components
├── helpers/             # Utility functions and constants
├── hooks/               # Custom React hooks
├── models/              # TypeScript interfaces and types
├── native-modules/      # Native code for platform-specific features
├── stores/              # Zustand state management
```

## Key Features Implementation

### Theme System
The app implements a flexible theme system using Zustand, allowing users to customize:
- Dark/Light mode
- Accent colors
- Font sizes
- Animation speeds
- Elevation levels
- Gradient effects

### Mood Tracking
Users can track their daily mood with three categories:
- Nice
- Normal
- Terrible

The app maintains weekly statistics and provides mood-based content recommendations.

### Audio Integration
Custom native modules handle audio playback for meditation sessions and stories, ensuring smooth integration with platform-specific audio capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
