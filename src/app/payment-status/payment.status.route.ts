import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {PaymentStatusListComponent} from './components/list/payment.status.list.component';

export const PAYMENT_STATUS_ROUTES: Routes = [
  {
    path: 'payment/status/list',
    component: PaymentStatusListComponent,
    data: {privilege: ['view-payment-status-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
