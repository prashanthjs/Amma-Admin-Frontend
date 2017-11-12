import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {ShippingStatusListComponent} from './components/list/shipping.status.list.component';

export const SHIPPING_STATUS_ROUTES: Routes = [
  {
    path: 'shipping/status/list',
    component: ShippingStatusListComponent,
    data: {privilege: ['view-shipping-status-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
