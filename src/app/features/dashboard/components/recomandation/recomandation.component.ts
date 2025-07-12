import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherData } from '../../../../core/services/weather-state.service';
import { weatherFadeAnimation } from '../../../../animations/weather.animations';

@Component({
  selector: 'app-recomandation',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recomandation.component.html',
  styleUrl: './recomandation.component.scss',
  animations: [weatherFadeAnimation]
})
export class RecomandationComponent {
  @Input() weather: WeatherData | null = null;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.weather) {
      this.weather = data.weather;
    }
  }
}
