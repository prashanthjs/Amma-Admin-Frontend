import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {PaymentMethodListComponent} from './components/list/payment.method.list.component';

export const PAYMENT_METHOD_ROUTES: Routes = [
  {
    path: 'payment/method/list',
    component: PaymentMethodListComponent,
    data: {privilege: ['view-payment-method-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
