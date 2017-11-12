import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard.component';
import {AuthGuard} from '../auth/services/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];
