import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recomandation',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recomandation.component.html',
  styleUrl: './recomandation.component.scss'
})
export class RecomandationComponent {
  @Input() weather: any;
}
