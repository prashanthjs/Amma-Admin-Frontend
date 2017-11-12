import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MartFormModalComponent} from './components/form/mart.form.modal.component';
import {MartViewComponent} from './components/view/mart.view.component';
import {MartListComponent} from './components/list/mart.list.component';
import {MartDataService} from './services/mart.data.service';

@NgModule({
  declarations: [
    MartListComponent,
    MartFormModalComponent,
    MartViewComponent
  ],
  imports: [SharedModule],
  exports: [MartFormModalComponent],
  providers: [MartDataService],
  entryComponents: [
    MartFormModalComponent
  ]
})
export class MartModule {
}
