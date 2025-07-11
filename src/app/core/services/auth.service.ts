import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  private checkAuth(): boolean {
    return !!localStorage.getItem('weatherApiKey');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  updateAuthStatus(): void {
    this.isAuthenticatedSubject.next(this.checkAuth());
  }
}
