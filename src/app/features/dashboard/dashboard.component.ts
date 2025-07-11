import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import { RecomandationComponent } from './components/recomandation/recomandation.component';
import { HistoryComponent } from "./components/history/history.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, SearchComponent, ResultComponent, RecomandationComponent, HistoryComponent, HistoryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
