import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
    }
];
