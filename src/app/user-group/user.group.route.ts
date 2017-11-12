import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {UserGroupListComponent} from './components/list/user.group.list.component';

export const USER_GROUP_ROUTES: Routes = [
  {
    path: 'user/group/list',
    component: UserGroupListComponent,
    data: {privilege: ['view-user-group-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
