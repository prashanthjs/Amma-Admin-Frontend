import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {OrderFormModalComponent} from './components/form/order.form.modal.component';
import {OrderViewComponent} from './components/view/order.view.component';
import {OrderListComponent} from './components/list/order.list.component';
import {OrderDataService} from './services/order.data.service';
import {OrderMartFormModalComponent} from './components/form/order.mart.form.modal.component';
import {OrderFormAddressBillingModalComponent} from './components/form/helper/address/order.form.address.billing.modal.component';
import {OrderFormAddressShippingModalComponent} from './components/form/helper/address/order.form.address.shipping.modal.component';
import {OrderFormItemModalComponent} from './components/form/helper/item/order.form.item.modal.component';
import {OrderFormItemInModalComponent} from './components/form/helper/item/order.form.item.in.modal.component';
import {OrderFormItemOutModalComponent} from './components/form/helper/item/order.form.item.out.modal.component';
import {OrderFormOutItemModalComponent} from './components/form/helper/outitem/order.form.out.item.modal.component';
import {OrderFormPaymentModalComponent} from './components/form/helper/payment/order.form.payment.modal.component';
import {OrderFormShippingModalComponent} from './components/form/helper/shipping/order.form.shipping.modal.component';
import {OrderFormNotesModalComponent} from './components/form/helper/notes/order.form.notes.modal.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderFormModalComponent,
    OrderViewComponent,
    OrderMartFormModalComponent,
    OrderFormAddressBillingModalComponent,
    OrderFormAddressShippingModalComponent,
    OrderFormItemModalComponent,
    OrderFormItemInModalComponent,
    OrderFormItemOutModalComponent,
    OrderFormOutItemModalComponent,
    OrderFormPaymentModalComponent,
    OrderFormShippingModalComponent,
    OrderFormNotesModalComponent
  ],
  imports: [SharedModule],
  exports: [OrderFormModalComponent],
  providers: [OrderDataService],
  entryComponents: [
    OrderFormModalComponent,
    OrderMartFormModalComponent,
    OrderFormAddressBillingModalComponent,
    OrderFormAddressShippingModalComponent,
    OrderFormItemModalComponent,
    OrderFormItemInModalComponent,
    OrderFormItemOutModalComponent,
    OrderFormOutItemModalComponent,
    OrderFormPaymentModalComponent,
    OrderFormShippingModalComponent,
    OrderFormNotesModalComponent
  ]
})
export class OrderModule {
}
