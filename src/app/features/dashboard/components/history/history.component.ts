import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SearchHistoryItem } from '../../../../core/services/weather-state.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() history: SearchHistoryItem[] = [];
  @Output() select = new EventEmitter<SearchHistoryItem>();

  selectHistory(item: SearchHistoryItem) {
    this.select.emit(item);
  }
}
