import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import { RecomandationComponent } from './components/recomandation/recomandation.component';
import { HistoryComponent } from "./components/history/history.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, SearchComponent, ResultComponent, RecomandationComponent, HistoryComponent, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  weather: any = null;

  constructor(private readonly http: HttpClient) { }

  searchResult(cityList: string[]) {
    if (!cityList || cityList.length === 0) {
      this.weather = null;
      return;
    }
    // Use the first city in the list
    const city = cityList[0];
    const apiKey = localStorage.getItem('weatherApiKey');
    if (!apiKey) {
      this.weather = null;
      return;
    }
    // Extract city name and country from the string
    const match = city.match(/^([^,]+),\s*([^,]+)$/);
    let cityName = city, country = '';
    if (match) {
      cityName = match[1];
      country = match[2];
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
    this.http.get(url).subscribe(
      data => this.weather = data,
      err => this.weather = null
    );
  }
}
