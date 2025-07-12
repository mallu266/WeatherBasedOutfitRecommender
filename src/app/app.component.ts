import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

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
export class AppComponent implements OnInit {
  title = 'WeatherBasedOutfitRecommender';
  apiKeyForm: FormGroup;
  private readonly router = inject(Router);

  // Signal to track authentication state
  private readonly authState = signal(!!localStorage.getItem('weatherApiKey'));

  // Computed property to check if user is logged in
  isLoggedIn = computed(() => this.authState());

  constructor(readonly fb: FormBuilder) {
    this.apiKeyForm = this.fb.group({
      apiKey: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // If user is authenticated and on root path, redirect to dashboard
    if (this.isLoggedIn() && this.router.url === '/') {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.apiKeyForm.valid) {
      const apiKey = this.apiKeyForm.value.apiKey;
      localStorage.setItem('weatherApiKey', apiKey);
      
      // Update authentication state
      this.authState.set(true);
      
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  // Method to update auth state (can be called from other components)
  updateAuthState(): void {
    this.authState.set(!!localStorage.getItem('weatherApiKey'));
  }
}
