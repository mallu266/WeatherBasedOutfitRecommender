# WeatherBasedOutfitRecommender

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Project Requirement Document
Requirements
1. Core Features
● City Search Input
○ Type a city name and trigger fetch from OpenWeatherMap API or similar
(mocked API also okay).

● Weather Display
○ Show temperature, condition (cloudy, sunny, rainy), wind speed, and humidity.
● Outfit Recommendation
○ Based on weather (e.g., "Take an umbrella", "Wear a jacket", "Sunglasses
suggested").

● History
○ Show a small list of the last 5 searched cities (in-memory is fine).

2. Technical Requirements
● Use React or your preferred modern framework.
● Use state management for search history and current weather (Context, Redux, etc.).
● Focus on modular component design and code structure.
● Provide graceful error handling (e.g., invalid city, API failure).
● Responsive design with attention to layout and interactions.

Bonus Features
● Use auto-suggest while typing city names (e.g., debounce + suggestions from API).
● Add animations for changing weather state or card transitions.
● Allow theme toggle (light/dark) for visual polish.
● Mock offline behavior or retry logic.


## Install Material Angular
Angular Material is an official Angular library that implements Material Design components for Angular apps.
To install liberary use command
        ng add @angular/material@19