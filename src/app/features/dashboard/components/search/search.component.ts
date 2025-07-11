import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatCardModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchResult = new EventEmitter<any>();
  searchControl = new FormControl('');
  options: string[] = [];

  constructor(private readonly http: HttpClient) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.fetchCitiesFromOpenWeatherMap(value))
      )
      .subscribe(result => {
        this.options = result;
        this.searchResult.emit(result);
      });
  }

  fetchCitiesFromOpenWeatherMap(query: string | null) {
    if (!query) return of([]);
    const apiKey = localStorage.getItem('weatherApiKey');
    if (!apiKey) return of([]);
    // OpenWeatherMap city search API (geocoding)
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
    return this.http.get<any[]>(url).pipe(
      // Map the result to city names for autocomplete
      switchMap((results: any[]) => {
        if (!results || !Array.isArray(results)) return of([]);
        const names = results.map(city => `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`);
        return of(names);
      })
    );
  }
}
