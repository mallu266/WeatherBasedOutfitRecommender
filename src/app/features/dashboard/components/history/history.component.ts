import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() history: any[] = [];
  @Output() select = new EventEmitter<any>();

  selectHistory(item: any) {
    this.select.emit(item);
  }
}
