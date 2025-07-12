import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recomandation',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recomandation.component.html',
  styleUrl: './recomandation.component.scss'
})
export class RecomandationComponent {
  @Input() weather: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.weather) {
      this.weather = data.weather;
    }
  }
}
