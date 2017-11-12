import {Routes} from '@angular/router';
import {UserViewComponent} from './components/view/user.view.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {UserListComponent} from './components/list/user.list.component';

export const USER_ROUTES: Routes = [
  {
    path: 'user/list',
    component: UserListComponent,
    data: {privilege: ['view-user-basic-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'user/list/:id',
    component: UserViewComponent,
    data: {privilege: ['view-user-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
