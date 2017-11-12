import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {
  API_REPORT_ORDER_DAY_SUMMARY, API_REPORT_ORDER_MONTH_SUMMARY,
  API_REPORT_ORDER_STATUS_SUMMARY, API_REPORT_ORDER_STATUS_TYPE_SUMMARY,
  API_REPORT_ORDER_SUMMARY, API_REPORT_ORDER_YEAR_SUMMARY, API_REPORT_TOP_PRODUCTS_AMOUNT,
  API_REPORT_TOP_PRODUCTS_COUNT, API_REPORT_TOP_USERS_AMOUNT, API_REPORT_TOP_USERS_COUNT
} from '../report.constants';

@Injectable()
export class ReportOrderDataService {

  constructor(private httpService: AppHttpService) {
  }

  getSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_SUMMARY, options);
  }

  getTopProductsByAmount(options: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_TOP_PRODUCTS_AMOUNT, options);
  }

  getTopProductsByCount(options: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_TOP_PRODUCTS_COUNT, options);
  }

  getTopUsersByAmount(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_TOP_USERS_AMOUNT, options);
  }

  getTopUsersByCount(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_TOP_USERS_COUNT, options);
  }

  getStatusSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_STATUS_SUMMARY, options);
  }

  getStatusTypeSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_STATUS_TYPE_SUMMARY, options);
  }

  getDaySummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_DAY_SUMMARY, options);
  }

  getMonthSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_MONTH_SUMMARY, options);
  }

  getYearSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_ORDER_YEAR_SUMMARY, options);
  }

  getFilterListOptions(fromDate = null, toDate = null, pageSize = null): ListOptions {
    const listOptions = new ListOptions();
    if (pageSize) {
      listOptions.pageSize = pageSize;
    }

    if (toDate || fromDate) {

      listOptions.filter = {
        filters: [],
        logic: 'and'
      };
      if (toDate) {
        listOptions.filter.filters.push({'field': 'createdAt', 'operator': 'lte', 'value': toDate});
      }
      if (fromDate) {
        listOptions.filter.filters.push({'field': 'createdAt', 'operator': 'gte', 'value': fromDate});
      }
    }

    return listOptions;
  }
}
