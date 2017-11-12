import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import {ReportProductTopComponent} from './components/product/top/report.product.top.component';
import {ReportUserTopComponent} from './components/user/top/report.user.top.component';
import {ReportOrderStatusComponent} from './components/order/status/report.order.status.component';
import {ReportOrderSummaryDayComponent} from './components/order/summary/day/report.order.summary.day.component';
import {ReportOrderSummaryMonthComponent} from './components/order/summary/month/report.order.summary.month.component';
import {ReportOrderSummaryYearComponent} from './components/order/summary/year/report.order.summary.year.component';
import {ReportUserSummaryDayComponent} from './components/user/summary/day/report.user.summary.day.component';
import {ReportUserSummaryMonthComponent} from './components/user/summary/month/report.user.summary.month.component';
import {ReportUserSummaryYearComponent} from './components/user/summary/year/report.user.summary.year.component';

export const REPORT_ROUTES: Routes = [
  {
    path: 'report/top-products',
    component: ReportProductTopComponent,
    data: {privilege: ['view-report-order-top-products-amount-privilege', 'view-report-order-top-products-count-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/top-users',
    component: ReportUserTopComponent,
    data: {privilege: ['view-report-order-top-users-amount-privilege', 'view-report-order-top-users-count-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/sales/status',
    component: ReportOrderStatusComponent,
    data: {privilege: ['view-report-order-status-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/sales/summary/day',
    component: ReportOrderSummaryDayComponent,
    data: {privilege: ['view-report-order-day-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/sales/summary/month',
    component: ReportOrderSummaryMonthComponent,
    data: {privilege: ['view-report-order-month-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/sales/summary/year',
    component: ReportOrderSummaryYearComponent,
    data: {privilege: ['view-report-order-year-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/user/summary/day',
    component: ReportUserSummaryDayComponent,
    data: {privilege: ['view-report-user-day-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/user/summary/month',
    component: ReportUserSummaryMonthComponent,
    data: {privilege: ['view-report-user-month-summary-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'report/user/summary/year',
    component: ReportUserSummaryYearComponent,
    data: {privilege: ['view-report-user-year-summary-privilege']},
    canActivate: [AuthGuard]
  }
];
