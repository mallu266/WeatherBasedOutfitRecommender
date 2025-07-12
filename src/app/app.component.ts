import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'WeatherBasedOutfitRecommender';
  apiKeyForm: FormGroup;
  private readonly destroy$ = new Subject<void>();
  isLoggedIn: boolean = false
  constructor(readonly fb: FormBuilder, readonly router: Router, private readonly authService: AuthService) {
    this.apiKeyForm = this.fb.group({
      apiKey: ['', Validators.required],
    });

    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        console.log("isAuth", isAuth)
        this.isLoggedIn = isAuth
      });
  }

  onSubmit() {
    if (this.apiKeyForm.valid) {
      const apiKey = this.apiKeyForm.value.apiKey;
      localStorage.setItem('weatherApiKey', apiKey);
      this.authService.updateAuthStatus();
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
