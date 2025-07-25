import { Component, inject, computed } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import { RecomandationComponent } from './components/recomandation/recomandation.component';
import { HistoryComponent } from "./components/history/history.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/snackbar.service';
import { WeatherStateService, WeatherData, SearchHistoryItem } from '../../core/services/weather-state.service';
import { WeatherService } from '../../core/services/weather.service';
import { AppComponent } from '../../app.component';
import { ThemeService } from '../../core/services/theme.service';
import {
  weatherFadeAnimation,
  cardSlideAnimation,
  loadingAnimation,
  historyStaggerAnimation,
  gridTileAnimation,
  errorSlideAnimation
} from '../../animations/weather.animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SearchComponent,
    ResultComponent,
    RecomandationComponent,
    HistoryComponent,
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    weatherFadeAnimation,
    cardSlideAnimation,
    loadingAnimation,
    historyStaggerAnimation,
    gridTileAnimation,
    errorSlideAnimation
  ]
})
export class DashboardComponent {
  // Inject services
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);
  private readonly weatherStateService = inject(WeatherStateService);
  private readonly weatherService = inject(WeatherService);
  private readonly appComponent = inject(AppComponent);
  private readonly themeService = inject(ThemeService);

  // Layout properties
  cols = 2;
  appSearch = 2;
  appResult = 1;
  appRecomandation = 1;
  appHistory = 1;

  // Computed values for template
  weather = computed(() => this.weatherStateService.currentWeather());
  history = computed(() => this.weatherStateService.searchHistory());
  isLoading = computed(() => this.weatherStateService.isLoading());
  error = computed(() => this.weatherStateService.error());
  isDarkTheme = computed(() => this.themeService.isDarkTheme());

  constructor() {
    this.initializeResponsiveLayout();
    this.themeService.listenForSystemThemeChanges();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    const newTheme = this.isDarkTheme() ? 'Dark' : 'Light';
    this.snackbarService.showSuccess(`${newTheme} theme activated`);
  }

  private initializeResponsiveLayout(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe({
      next: (result) => {
        this.updateLayoutForBreakpoint(result);
      },
      error: () => {
        this.snackbarService.showError('Layout error. Using default layout.');
        // Fallback to default layout
        this.setDefaultLayout();
      }
    });
  }

  private updateLayoutForBreakpoint(result: any): void {
    if (result.breakpoints[Breakpoints.XSmall]) {
      this.cols = 1;
      this.appSearch = 1;
      this.appResult = 1;
      this.appRecomandation = 1;
      this.appHistory = 1;
    } else if (result.breakpoints[Breakpoints.Small]) {
      this.setSmallLayout()
    } else {
      this.setDefaultLayout();
    }
  }

  private setDefaultLayout(): void {
    this.cols = 3;
    this.appSearch = 3;
    this.appResult = 1;
    this.appRecomandation = 1;
    this.appHistory = 1;
  }

  onCitySelected(selectedCity: string): void {
    if (!selectedCity) {
      this.weatherStateService.clearCurrentWeather();
      return;
    }

    const apiKey = this.getApiKey();
    if (!apiKey) {
      this.snackbarService.showError('API key not found. Please authenticate first.');
      return;
    }

    const cityName = this.extractCityName(selectedCity);
    this.fetchWeatherData(cityName, apiKey);
  }

  onSearchCleared(): void {
    // Clear current weather data when search is cleared
    this.weatherStateService.clearCurrentWeather();
  }

  private getApiKey(): string | null {
    return localStorage.getItem('weatherApiKey');
  }

  private extractCityName(city: string): string {
    const match = city.match(/^([^,]+),\s*([^,]+)$/);
    return match ? match[1] : city;
  }

  private fetchWeatherData(cityName: string, apiKey: string): void {
    this.weatherStateService.setLoading(true);
    this.weatherStateService.clearError();

    this.weatherService.getWeatherData(cityName, apiKey).subscribe({
      next: (data: WeatherData) => {
        this.weatherStateService.setCurrentWeather(data);
        this.snackbarService.showSuccess(`Weather data loaded for ${cityName}`);
        this.weatherStateService.setLoading(false);
      },
      error: (errorMessage: string) => {
        this.weatherStateService.setError(errorMessage);
        this.snackbarService.showError(errorMessage);
        this.weatherStateService.setLoading(false);
      }
    });
  }

  showRecommendationPopup(historyItem: SearchHistoryItem): void {
    if (!historyItem || !historyItem.weather) {
      this.snackbarService.showError('No weather data available for recommendations.');
      return;
    }

    this.dialog.open(RecomandationComponent, {
      data: { weather: historyItem.weather },
      width: '350px',
      maxWidth: '90vw',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-panel',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: false
    });
  }

  logout(): void {
    // Clear API key from localStorage
    localStorage.removeItem('weatherApiKey');

    // Reset all state
    this.weatherStateService.resetState();

    // Update app component auth state
    this.appComponent.updateAuthState();

    // Show success message
    this.snackbarService.showSuccess('Logged out successfully. API key cleared from memory.');

    // Navigate to root - app component will handle showing landing page
    this.router.navigate(['/']);
  }
  private setSmallLayout(): void {
    this.cols = 2;
    this.appSearch = 2;
    this.appResult = 1;
    this.appRecomandation = 1;
    this.appHistory = 2;
  }
}
