import {Routes} from '@angular/router';
import {OrderViewComponent} from './components/view/order.view.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {OrderListComponent} from './components/list/order.list.component';

export const ORDER_ROUTES: Routes = [
  {
    path: 'order/list',
    component: OrderListComponent,
    data: {privilege: ['view-order-basic-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'order/list/:id',
    component: OrderViewComponent,
    data: {privilege: ['view-order-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
