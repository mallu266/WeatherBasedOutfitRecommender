import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WeatherBasedOutfitRecommender';
  apiKeyForm: FormGroup;

  constructor(readonly fb: FormBuilder, readonly router: Router) {
    this.apiKeyForm = this.fb.group({
      apiKey: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.apiKeyForm.valid) {
      const apiKey = this.apiKeyForm.value.apiKey;
      localStorage.setItem('weatherApiKey', apiKey);
      this.router.navigate(['/dashboard']);
    }
  }
}
