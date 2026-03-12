# TaskMaster Mobile 🚀

Master your day, one task at a time. A professional, modern task management application built with React Native and Expo.

![TaskMaster Banner](https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000)

## ✨ Features

- **Modern UI/UX**: Clean, professional interface with a focus on productivity.
- **Landing Page**: Engaging introduction to the app's core value propositions.
- **Dashboard Overview**: Visual statistics, completion percentages, and "Up Next" task tracking.
- **Advanced Task Management**: Create, edit, toggle, and delete tasks with priority levels.
- **Filtering & Search**: Quickly find tasks by status, priority, or title.
- **Theme Support**: Full support for Light, Dark, and System modes.
- **Secure Authentication**: JWT-based login and registration.
- **Haptic Feedback**: Tactile interaction for a premium mobile feel.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Stack & Tabs)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling**: Custom Theme Provider with [Lucide Icons](https://lucide.dev/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Network**: [Axios](https://axios-http.com/)
- **Date Handling**: [Day.js](https://day.js.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- [Expo Go](https://expo.dev/go) app on your mobile device (to test on physical hardware)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todomobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL=http://your-local-ip:5000/api
   ```
   *Note: Use your machine's local IP address instead of `localhost` when testing on a physical device.*

4. **Start the development server**
   ```bash
   npm start
   ```

## 📱 Project Structure

```text
src/
├── components/     # Reusable UI components (Button, Input, TaskItem, etc.)
├── context/        # React Context providers (AuthContext)
├── hooks/          # Custom hooks (API mutations and queries)
├── navigation/     # Navigation configuration (Stacks and Tabs)
├── screens/        # Main application screens
├── theme/          # Theme constants and ThemeProvider
└── types/          # TypeScript interface definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and for educational purposes.
