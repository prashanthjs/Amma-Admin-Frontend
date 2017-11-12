import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProductFormModalComponent} from './components/form/product.form.modal.component';
import {ProductViewComponent} from './components/view/product.view.component';
import {ProductListComponent} from './components/list/product.list.component';
import {ProductDataService} from './services/product.data.service';
import {ProductMartFormModalComponent} from './components/form/product.mart.form.modal.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormModalComponent,
    ProductViewComponent,
    ProductMartFormModalComponent
  ],
  imports: [SharedModule],
  exports: [ProductFormModalComponent],
  providers: [ProductDataService],
  entryComponents: [
    ProductFormModalComponent,
    ProductMartFormModalComponent
  ]
})
export class ProductModule {
}
