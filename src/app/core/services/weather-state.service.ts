import { Injectable, signal, computed } from '@angular/core';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface SearchHistoryItem {
  weather: WeatherData;
  timestamp: Date;
  cityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {
  // State signals
  private _currentWeather = signal<WeatherData | null>(null);
  private _searchHistory = signal<SearchHistoryItem[]>([]);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Computed signals
  public currentWeather = this._currentWeather.asReadonly();
  public searchHistory = this._searchHistory.asReadonly();
  public isLoading = this._isLoading.asReadonly();
  public error = this._error.asReadonly();

  // Computed values
  public hasWeatherData = computed(() => this._currentWeather() !== null);
  public historyCount = computed(() => this._searchHistory().length);
  public recentSearches = computed(() => this._searchHistory().slice(0, 5));

  constructor() {
    // Load history from localStorage on service initialization
    this.loadHistoryFromStorage();
  }

  // Actions
  setCurrentWeather(weather: WeatherData): void {
    this._currentWeather.set(weather);
    this._error.set(null);
    this.addToHistory(weather);
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  setError(error: string | null): void {
    this._error.set(error);
    this._isLoading.set(false);
  }

  clearCurrentWeather(): void {
    this._currentWeather.set(null);
  }

  clearError(): void {
    this._error.set(null);
  }

  addToHistory(weather: WeatherData): void {
    const historyItem: SearchHistoryItem = {
      weather,
      timestamp: new Date(),
      cityName: weather.name
    };

    const currentHistory = this._searchHistory();
    const updatedHistory = [historyItem, ...currentHistory].slice(0, 10); // Keep last 10 items
    this._searchHistory.set(updatedHistory);
    
    // Save to localStorage
    this.saveHistoryToStorage(updatedHistory);
  }

  getHistoryItem(index: number): SearchHistoryItem | null {
    const history = this._searchHistory();
    return history[index] || null;
  }

  clearHistory(): void {
    this._searchHistory.set([]);
    localStorage.removeItem('weatherSearchHistory');
  }

  // Local storage persistence
  private saveHistoryToStorage(history: SearchHistoryItem[]): void {
    try {
      const serializedHistory = history.map(item => ({
        ...item,
        timestamp: item.timestamp.toISOString()
      }));
      localStorage.setItem('weatherSearchHistory', JSON.stringify(serializedHistory));
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
    }
  }

  private loadHistoryFromStorage(): void {
    try {
      const storedHistory = localStorage.getItem('weatherSearchHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        const historyWithDates = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        this._searchHistory.set(historyWithDates);
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      this._searchHistory.set([]);
    }
  }

  // Reset all state (for logout)
  resetState(): void {
    this._currentWeather.set(null);
    this._searchHistory.set([]);
    this._isLoading.set(false);
    this._error.set(null);
    localStorage.removeItem('weatherSearchHistory');
  }
} 