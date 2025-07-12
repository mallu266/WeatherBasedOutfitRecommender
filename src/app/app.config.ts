import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandlerService } from './core/global-error-handler.service';
import { ErrorHandler } from '@angular/core';
import { errorInterceptor } from './core/error-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ]
};
