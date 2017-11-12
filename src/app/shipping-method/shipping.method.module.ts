import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ShippingMethodListComponent} from './components/list/shipping.method.list.component';
import {ShippingMethodFormModalComponent} from './components/form/shipping.method.form.modal.component';
import {ShippingMethodDataService} from './services/shipping.method.data.service';

@NgModule({
    declarations: [
      ShippingMethodListComponent,
      ShippingMethodFormModalComponent
    ],
    imports: [SharedModule],
    exports: [ShippingMethodFormModalComponent],
    providers: [ShippingMethodDataService],
    entryComponents: [
      ShippingMethodFormModalComponent
    ]
})
export class ShippingMethodModule {
}
