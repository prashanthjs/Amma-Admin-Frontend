import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PaymentMethodListComponent} from './components/list/payment.method.list.component';
import {PaymentMethodFormModalComponent} from './components/form/payment.method.form.modal.component';
import {PaymentMethodDataService} from './services/payment.method.data.service';

@NgModule({
    declarations: [
      PaymentMethodListComponent,
      PaymentMethodFormModalComponent
    ],
    imports: [SharedModule],
    exports: [PaymentMethodFormModalComponent],
    providers: [PaymentMethodDataService],
    entryComponents: [
      PaymentMethodFormModalComponent
    ]
})
export class PaymentMethodModule {
}
