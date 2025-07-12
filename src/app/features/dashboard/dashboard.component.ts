import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import { RecomandationComponent } from './components/recomandation/recomandation.component';
import { HistoryComponent } from "./components/history/history.component";
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { SnackbarService } from '../../core/snackbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, SearchComponent, ResultComponent, RecomandationComponent, HistoryComponent, HttpClientModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  weather: any = null;
  history: any[] = [];
  cols = 2;
  appSearch = 2;
  appResult = 1;
  appRecomandation = 1;
  appHistory = 2;
  isLoading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService
  ) {
    this.initializeResponsiveLayout();
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
      error: (error) => {
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
    } else {
      this.setDefaultLayout();
    }
  }

  private setDefaultLayout(): void {
    this.cols = 2;
    this.appSearch = 2;
    this.appResult = 1;
    this.appRecomandation = 1;
    this.appHistory = 2;
  }

  searchResult(cityList: string[]): void {
    if (!cityList || cityList.length === 0) {
      this.weather = null;
      return;
    }

    const apiKey = this.getApiKey();
    if (!apiKey) {
      this.snackbarService.showError('API key not found. Please authenticate first.');
      return;
    }
    const city = cityList[0];
    const cityName = this.extractCityName(city);
    this.fetchWeatherData(cityName, apiKey);
  }

  private getApiKey(): string | null {
    return localStorage.getItem('weatherApiKey');
  }

  private extractCityName(city: string): string {
    const match = city.match(/^([^,]+),\s*([^,]+)$/);
    return match ? match[1] : city;
  }

  private fetchWeatherData(cityName: string, apiKey: string): void {
    this.isLoading = true;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
    this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return of(null);
      })
    ).subscribe({
      next: (data: any) => {
        if (data) {
          this.weather = data;
          this.addToHistory(data);
          this.snackbarService.showSuccess(`Weather data loaded for ${cityName}`);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.snackbarService.showError('Failed to fetch weather data.');
        this.isLoading = false;
        console.error('Weather fetch error:', error);
      }
    });
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'Failed to fetch weather data.';
    if (error.status === 401) {
      errorMessage = 'Invalid API key. Please check your authentication.';
    } else if (error.status === 404) {
      errorMessage = 'City not found. Please check the spelling.';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please try again later.';
    } else if (error.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    this.snackbarService.showError(errorMessage);
  }

  private addToHistory(weatherData: any): void {
    this.history = [weatherData, ...this.history].slice(0, 5);
  }

  showRecommendationPopup(weather: any): void {
    if (!weather) {
      this.snackbarService.showError('No weather data available for recommendations.');
      return;
    }

    this.dialog.open(RecomandationComponent, {
      data: { weather },
      width: '350px',
      maxWidth: '90vw',
    });
  }
}
