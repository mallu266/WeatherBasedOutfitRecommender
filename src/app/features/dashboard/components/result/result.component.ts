import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { WeatherData } from '../../../../core/services/weather-state.service';
import { weatherFadeAnimation, temperatureAnimation, weatherIconAnimation } from '../../../../animations/weather.animations';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  animations: [
    weatherFadeAnimation,
    temperatureAnimation,
    weatherIconAnimation
  ]
})
export class ResultComponent {
  @Input() weather: WeatherData | null = null;
}
