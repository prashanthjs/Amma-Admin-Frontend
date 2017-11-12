import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {ShippingMethodListComponent} from './components/list/shipping.method.list.component';

export const SHIPPING_METHOD_ROUTES: Routes = [
  {
    path: 'shipping/method/list',
    component: ShippingMethodListComponent,
    data: {privilege: ['view-shipping-method-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
