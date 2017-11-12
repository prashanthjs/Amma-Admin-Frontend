import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ShippingStatusListComponent} from './components/list/shipping.status.list.component';
import {ShippingStatusFormModalComponent} from './components/form/shipping.status.form.modal.component';
import {ShippingStatusDataService} from './services/shipping.status.data.service';

@NgModule({
    declarations: [
      ShippingStatusListComponent,
      ShippingStatusFormModalComponent
    ],
    imports: [SharedModule],
    exports: [ShippingStatusFormModalComponent],
    providers: [ShippingStatusDataService],
    entryComponents: [
      ShippingStatusFormModalComponent
    ]
})
export class ShippingStatusModule {
}
