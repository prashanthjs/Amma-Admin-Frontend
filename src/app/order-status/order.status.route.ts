import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {OrderStatusListComponent} from './components/list/order.status.list.component';

export const ORDER_STATUS_ROUTES: Routes = [
  {
    path: 'order/status/list',
    component: OrderStatusListComponent,
    data: {privilege: ['view-order-status-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
