import { Injectable, ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private snackBar = inject(MatSnackBar);
  
  handleError(error: Error | HttpErrorResponse): void {
    let errorMessage = 'An unexpected error occurred.';
    
    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      errorMessage = this.getHttpErrorMessage(error);
    } else {
      // Client Error
      errorMessage = this.getClientErrorMessage(error);
    }
    
    // Log error for debugging
    console.error('Global Error Handler:', error);
    
    // You can also send to external logging service here
    // this.logErrorToService(error, errorMessage);
    
    // Display user-friendly message via snackbar
    this.displayErrorMessage(errorMessage);
  }
  
  private getHttpErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Network error. Please check your internet connection.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please check your authentication.';
      case 403:
        return 'Access forbidden. You don\'t have permission to access this resource.';
      case 404:
        return 'Resource not found. Please check the URL or search term.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. Please try again later.';
      default:
        return `Server error (${error.status}). Please try again later.`;
    }
  }
  
  private getClientErrorMessage(error: Error): string {
    if (error.name === 'TypeError') {
      return 'Type error occurred. Please refresh the page.';
    } else if (error.name === 'ReferenceError') {
      return 'Reference error occurred. Please refresh the page.';
    } else if (error.name === 'RangeError') {
      return 'Range error occurred. Please check your input.';
    } else if (error.message.includes('localStorage')) {
      return 'Storage error. Please check your browser settings.';
    } else if (error.message.includes('API')) {
      return 'API error. Please try again later.';
    } else {
      return error.message || 'An unexpected error occurred.';
    }
  }
  
  private displayErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', { 
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
  
  // Optional: Send errors to external logging service
  private logErrorToService(error: Error | HttpErrorResponse, userMessage: string): void {
    // Example implementation for external logging
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      userMessage,
      stack: error instanceof Error ? error.stack : undefined,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Send to your logging service
    // this.http.post('/api/logs/error', errorLog).subscribe();
  }
} 