import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {APP_ROUTING} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    APP_ROUTING
  ]
}).catch((err) => console.error(err));
