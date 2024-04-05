import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { customInterceptor } from './services/custom.interceptor';
//import { customInterceptor } from './services/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), 
    // provideAnimationsAsync(), 
    // provideAnimationsAsync(), 
    // provideAnimationsAsync(),
    provideToastr(),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: customInterceptor,
      multi: true
    }
  ]
};
