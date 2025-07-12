import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherData } from './weather-state.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeatherData(cityName: string, apiKey: string): Observable<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
    
    return this.http.get<WeatherData>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleHttpError(error));
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Network error. Please check your internet connection.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Invalid API key. Please check your authentication.';
      case 404:
        return 'City not found. Please check the spelling.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. Please try again later.';
      default:
        return `Server error (${error.status}). Please try again later.`;
    }
  }
} 