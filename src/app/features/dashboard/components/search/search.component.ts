import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../../core/snackbar.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatCardModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchResult = new EventEmitter<string[]>();
  @Output() citySelected = new EventEmitter<string>();
  searchControl = new FormControl('');
  options: string[] = [];
  isLoading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly snackbarService: SnackbarService
  ) {
    this.initializeSearchSubscription();
  }

  private initializeSearchSubscription(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.fetchCitiesFromOpenWeatherMap(value))
      )
      .subscribe({
        next: (result) => {
          this.options = result;
          this.isLoading = false;
        },
        error: (error) => {
          this.snackbarService.showError('Failed to fetch city suggestions.');
          this.isLoading = false;
          console.error('Search subscription error:', error);
        }
      });
  }

  onOptionSelected(selectedValue: string): void {
    // Emit the selected city to trigger weather API call
    this.citySelected.emit(selectedValue);
  }

  fetchCitiesFromOpenWeatherMap(query: string | null) {
    if (!query || query.trim().length < 2) {
      return of([]);
    }

    const apiKey = this.getApiKey();
    if (!apiKey) {
      this.snackbarService.showError('API key not found. Please authenticate first.');
      return of([]);
    }

    this.isLoading = true;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
    
    return this.http.get<any[]>(url).pipe(
      switchMap((results: any[]) => {
        if (!results || !Array.isArray(results)) {
          return of([]);
        }
        const names = results.map(city => 
          `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
        );
        return of(names);
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return of([]);
      })
    );
  }

  private getApiKey(): string | null {
    return localStorage.getItem('weatherApiKey');
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'Failed to fetch city suggestions.';
    
    if (error.status === 401) {
      errorMessage = 'Invalid API key. Please check your authentication.';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please try again later.';
    } else if (error.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    this.snackbarService.showError(errorMessage);
  }
}
