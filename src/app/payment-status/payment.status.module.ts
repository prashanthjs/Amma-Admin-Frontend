import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PaymentStatusListComponent} from './components/list/payment.status.list.component';
import {PaymentStatusFormModalComponent} from './components/form/payment.status.form.modal.component';
import {PaymentStatusDataService} from './services/payment.status.data.service';

@NgModule({
    declarations: [
      PaymentStatusListComponent,
      PaymentStatusFormModalComponent
    ],
    imports: [SharedModule],
    exports: [PaymentStatusFormModalComponent],
    providers: [PaymentStatusDataService],
    entryComponents: [
      PaymentStatusFormModalComponent
    ]
})
export class PaymentStatusModule {
}
