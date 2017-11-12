import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './components/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class DashboardModule {
}
