import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportUserDataService} from './services/report.user.data.service';
import {ReportOrderDataService} from './services/report.order.data.service';
import {ReportProductTopComponent} from './components/product/top/report.product.top.component';
import {ReportUserTopComponent} from './components/user/top/report.user.top.component';
import {ReportOrderStatusComponent} from './components/order/status/report.order.status.component';
import {ReportOrderSummaryDayComponent} from './components/order/summary/day/report.order.summary.day.component';
import {ReportOrderSummaryMonthComponent} from './components/order/summary/month/report.order.summary.month.component';
import {ReportOrderSummaryYearComponent} from './components/order/summary/year/report.order.summary.year.component';
import {ReportUserSummaryDayComponent} from './components/user/summary/day/report.user.summary.day.component';
import {ReportUserSummaryMonthComponent} from './components/user/summary/month/report.user.summary.month.component';
import {ReportUserSummaryYearComponent} from './components/user/summary/year/report.user.summary.year.component';

@NgModule({
  declarations: [
    ReportProductTopComponent,
    ReportUserTopComponent,
    ReportOrderStatusComponent,
    ReportOrderSummaryDayComponent,
    ReportOrderSummaryMonthComponent,
    ReportOrderSummaryYearComponent,
    ReportUserSummaryDayComponent,
    ReportUserSummaryMonthComponent,
    ReportUserSummaryYearComponent
  ],
  imports: [SharedModule],
  exports: [],
  providers: [ReportUserDataService, ReportOrderDataService],
  entryComponents: []
})
export class ReportModule {
}
