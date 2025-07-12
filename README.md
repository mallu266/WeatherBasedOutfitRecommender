# Weather-Based Outfit Recommender 🌤️👕

A modern Angular application that provides personalized clothing recommendations based on real-time weather data. Built with Angular 19, Material Design, and OpenWeatherMap API.

![Angular](https://img.shields.io/badge/Angular-19.2.14-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)
![Material Design](https://img.shields.io/badge/Material%20Design-3.0-purple.svg)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange.svg)

## ✨ Features

### 🌟 Core Features
- **Real-time Weather Data**: Fetch current weather conditions from OpenWeatherMap API
- **Smart Outfit Recommendations**: AI-powered clothing suggestions based on weather conditions
- **City Search with Autocomplete**: Intelligent city search with suggestions
- **Search History**: Track and review previous weather searches
- **Theme Toggle**: Light and dark theme support with system preference detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🎨 UI/UX Features
- **Modern Material Design**: Beautiful, accessible interface using Angular Material
- **Glass Morphism Effects**: Contemporary glass-like design elements
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Custom Scrollbars**: Beautiful, theme-aware scrollbars
- **Loading States**: Elegant loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery options

### 🔧 Technical Features
- **Angular 19 Standalone Components**: Modern Angular architecture
- **Reactive State Management**: Angular signals for efficient state handling
- **HTTP Interceptors**: Global error handling and request management
- **Route Protection**: Authentication guards for secure navigation
- **Local Storage**: Persistent user preferences and search history
- **TypeScript**: Full type safety and better development experience

## 🏗️ Architecture & Components

### 📁 Project Structure
```
src/
├── app/
│   ├── animations/           # Animation definitions
│   ├── core/
│   │   ├── services/         # Core services
│   │   └── snackbar.service.ts
│   ├── features/
│   │   └── dashboard/        # Main dashboard feature
│   │       ├── components/
│   │       │   ├── search/   # City search component
│   │       │   ├── result/   # Weather display component
│   │       │   ├── recommendation/ # Outfit suggestions
│   │       │   └── history/  # Search history component
│   │       └── dashboard.component.*
│   ├── app.component.*       # Root component
│   ├── app.config.ts         # App configuration
│   └── app.routes.ts         # Routing configuration
├── styles.scss               # Global styles and themes
└── main.ts                   # Application entry point
```

### 🧩 Core Components

#### 1. **Dashboard Component** (`dashboard.component`)
- **Purpose**: Main application container and layout manager
- **Features**: 
  - Responsive grid layout using Angular Material Grid List
  - Theme toggle functionality
  - User menu with logout option
  - Loading state management
  - Component orchestration

#### 2. **Search Component** (`search.component`)
- **Purpose**: City search with autocomplete functionality
- **Features**:
  - Real-time city search using OpenWeatherMap Geocoding API
  - Debounced input with 300ms delay
  - Beautiful glass morphism design
  - Loading indicators
  - Clear search functionality

#### 3. **Result Component** (`result.component`)
- **Purpose**: Display current weather information
- **Features**:
  - Temperature, humidity, wind speed display
  - Weather condition icons
  - Animated weather data transitions
  - Responsive design with gradients

#### 4. **Recommendation Component** (`recommendation.component`)
- **Purpose**: Provide outfit suggestions based on weather
- **Features**:
  - Smart clothing recommendations
  - Weather condition analysis
  - Scrollable recommendation list
  - Popup dialog for history items
  - Custom scrollbar styling

#### 5. **History Component** (`history.component`)
- **Purpose**: Track and display search history
- **Features**:
  - Last 5 searches display
  - Clickable history items
  - Stagger animations for list items
  - Beautiful gradient design
  - Custom scrollbar

### 🔧 Core Services

#### 1. **Weather Service** (`weather.service.ts`)
- **Purpose**: Handle OpenWeatherMap API interactions
- **Features**:
  - Weather data fetching
  - Error handling and retry logic
  - API response transformation
  - Rate limiting consideration

#### 2. **Weather State Service** (`weather-state.service.ts`)
- **Purpose**: Manage application state using Angular signals
- **Features**:
  - Current weather state management
  - Search history persistence
  - Loading state management
  - Error state handling

#### 3. **Theme Service** (`theme.service.ts`)
- **Purpose**: Manage light/dark theme switching
- **Features**:
  - Theme state management with signals
  - LocalStorage persistence
  - System theme detection
  - Meta theme color updates

#### 4. **Snackbar Service** (`snackbar.service.ts`)
- **Purpose**: Display user notifications
- **Features**:
  - Success, error, warning, info notifications
  - Theme-aware styling
  - Customizable duration
  - Beautiful animations

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **OpenWeatherMap API Key**: Free account at [OpenWeatherMap](https://openweathermap.org/api)

### Step 1: Clone the Repository
```bash
git clone https://github.com/mallu266/WeatherBasedOutfitRecommender.git
cd WeatherBasedOutfitRecommender
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "My API Keys" section
4. Copy your API key

### Step 4: Launch the Application
```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Step 5: Configure API Key
1. Open the application in your browser
2. Enter your OpenWeatherMap API key in the authentication form
3. Click "Authenticate" to start using the app

## 📦 Dependencies

### Core Dependencies
```json
{
  "@angular/animations": "^19.2.14",
  "@angular/cdk": "^19.2.14",
  "@angular/common": "^19.2.14",
  "@angular/compiler": "^19.2.14",
  "@angular/core": "^19.2.14",
  "@angular/forms": "^19.2.14",
  "@angular/material": "^19.2.14",
  "@angular/platform-browser": "^19.2.14",
  "@angular/platform-browser-dynamic": "^19.2.14",
  "@angular/router": "^19.2.14",
  "rxjs": "~7.8.1",
  "tslib": "^2.6.2",
  "zone.js": "~0.14.4"
}
```

### Development Dependencies
```json
{
  "@angular-devkit/build-angular": "^19.2.14",
  "@angular/cli": "^19.2.14",
  "@angular/compiler-cli": "^19.2.14",
  "@types/jasmine": "~5.1.4",
  "jasmine-core": "~5.1.1",
  "karma": "~6.4.3",
  "karma-chrome-launcher": "~3.2.0",
  "karma-coverage": "~2.2.1",
  "karma-jasmine": "~5.1.0",
  "karma-jasmine-html-reporter": "~2.1.0",
  "typescript": "~5.4.2"
}
```

## 🎯 Usage Guide

### 1. **Authentication**
- Enter your OpenWeatherMap API key
- Click "Authenticate" to proceed
- Your API key is stored locally for future use

### 2. **Searching for Weather**
- Use the search bar to find cities
- Type at least 2 characters for suggestions
- Select a city from the autocomplete list
- Weather data will load automatically

### 3. **Viewing Recommendations**
- After selecting a city, weather data appears
- Outfit recommendations are displayed based on:
  - Temperature conditions
  - Weather type (rain, snow, clear, etc.)
  - Wind speed and humidity
  - Extreme weather conditions

### 4. **Managing History**
- View your last 5 searches in the history section
- Click on any history item to see recommendations again
- History is automatically updated with new searches

### 5. **Theme Switching**
- Click the theme toggle button (sun/moon icon)
- Switch between light and dark themes
- Theme preference is saved automatically
- System theme detection is supported

### 6. **Logout**
- Click the menu button (three dots)
- Select "Logout & Clear Memory"
- API key and data are cleared from local storage

## 🎨 Theme System

### Light Theme
- Clean white backgrounds
- Dark text for readability
- Bright accent colors
- Subtle shadows and borders

### Dark Theme
- Dark backgrounds for reduced eye strain
- Light text for contrast
- Muted accent colors
- Enhanced shadows for depth

### Features
- **Automatic Detection**: Detects system theme preference
- **Persistent Storage**: Remembers user's theme choice
- **Smooth Transitions**: 0.3s transitions between themes
- **Mobile Support**: Updates mobile browser theme color

## 🔧 Configuration



## 🐛 Troubleshooting

### Common Issues

#### 1. **API Key Not Working**
- Verify your API key is correct
- Check if you've exceeded the daily limit
- Ensure the API key is active in your OpenWeatherMap account

#### 2. **City Not Found**
- Try searching with country code (e.g., "London, UK")
- Check spelling and use common city names
- Some cities may not be available in the free API

#### 3. **Theme Not Switching**
- Clear browser cache and localStorage
- Check if browser supports CSS custom properties
- Try refreshing the page

#### 4. **Responsive Issues**
- Ensure viewport meta tag is present
- Test on different screen sizes
- Check browser developer tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide
- Use TypeScript strict mode
- Write unit tests for new features
- Update documentation for changes
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap**: For providing weather data API
- **Angular Team**: For the amazing framework
- **Material Design**: For the beautiful design system
- **Angular Material**: For the component library
- **AI Development Assistant**: This project was developed with the assistance of AI coding tools, which helped generate efficient, modern, and well-structured code. The AI assistant provided valuable insights for component architecture, styling, animations, and best practices implementation.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/mallu266/WeatherBasedOutfitRecommender/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mallu266/WeatherBasedOutfitRecommender/discussions)
- **Email**: mallikarjun266@gmail.comm

---

**Made with ❤️ using Angular 19 and Material Design**
