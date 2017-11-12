import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {OrderStatusListComponent} from './components/list/order.status.list.component';
import {OrderStatusFormModalComponent} from './components/form/order.status.form.modal.component';
import {OrderStatusDataService} from './services/order.status.data.service';

@NgModule({
  declarations: [
    OrderStatusListComponent,
    OrderStatusFormModalComponent
  ],
  imports: [SharedModule],
  exports: [OrderStatusFormModalComponent],
  providers: [OrderStatusDataService],
  entryComponents: [
    OrderStatusFormModalComponent
  ]
})
export class OrderStatusModule {
}
