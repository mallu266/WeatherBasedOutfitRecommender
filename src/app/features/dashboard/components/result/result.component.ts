import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherData } from '../../../../core/services/weather-state.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input() weather: WeatherData | null = null;
}
