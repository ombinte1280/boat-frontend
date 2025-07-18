import {provideRouter, Routes, withComponentInputBinding} from '@angular/router';
import {BoatListComponent} from './pages/boat/boat-list/boat-list.component';
import {BoatDetailComponent} from './pages/boat/boat-detail/boat-detail.component';
import {AuthLoginComponent} from './pages/authentication/auth-login/auth-login.component';
import {LayoutComponent} from './core/layout/layout.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'boat-list', pathMatch: 'full' },
      { path: 'boat-list', component: BoatListComponent },
      { path: 'boat-detail', component: BoatDetailComponent },
      { path: 'boat-detail/:id', component: BoatDetailComponent }
    ]
  },
  { path: 'login', component: AuthLoginComponent },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTING = provideRouter(routes, withComponentInputBinding());
