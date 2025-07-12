import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = getServerErrorMessage(error);
      }
      
      // Log the error
      console.error('HTTP Error Interceptor:', errorMessage);
      
      // Handle global HTTP errors
      handleGlobalHttpError(error, errorMessage);
      
      return throwError(() => error);
    })
  );
};

function getServerErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return 'Network error - please check your internet connection';
    case 400:
      return 'Bad request - please check your input';
    case 401:
      return 'Unauthorized - please check your authentication';
    case 403:
      return 'Access forbidden - you don\'t have permission';
    case 404:
      return 'Resource not found - please check the URL';
    case 429:
      return 'Too many requests - please try again later';
    case 500:
      return 'Server error - please try again later';
    case 502:
      return 'Bad gateway - please try again later';
    case 503:
      return 'Service unavailable - please try again later';
    case 504:
      return 'Gateway timeout - please try again later';
    default:
      return `Server error (${error.status}) - please try again later`;
  }
}

function handleGlobalHttpError(error: HttpErrorResponse, message: string): void {
  // Log to external service
  logErrorToService(error, message);
  
  // Handle authentication errors
  if (error.status === 401) {
    // Clear auth data
    localStorage.removeItem('weatherApiKey');
  }
}

function logErrorToService(error: HttpErrorResponse, message: string): void {
  const errorLog = {
    timestamp: new Date().toISOString(),
    url: error.url,
    status: error.status,
    statusText: error.statusText,
    message,
    userAgent: navigator.userAgent
  };
  
  // Send to your logging service
  // this.http.post('/api/logs/http-error', errorLog).subscribe();
  console.log('HTTP Error Log:', errorLog);
} 