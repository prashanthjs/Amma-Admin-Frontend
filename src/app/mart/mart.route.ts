import {Routes} from '@angular/router';
import {MartViewComponent} from './components/view/mart.view.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {MartListComponent} from './components/list/mart.list.component';

export const MART_ROUTES: Routes = [
  {
    path: 'mart/list',
    component: MartListComponent,
    data: {privilege: ['view-mart-basic-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'mart/list/:id',
    component: MartViewComponent,
    data: {privilege: ['view-mart-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
