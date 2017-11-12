import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {
  API_REPORT_USER_DAY_SUMMARY, API_REPORT_USER_MONTH_SUMMARY,
  API_REPORT_USER_YEAR_SUMMARY
} from '../report.constants';
import {AppHttpService} from '../../shared/services/app.http.service';


@Injectable()
export class ReportUserDataService {

  constructor(private httpService: AppHttpService) {
  }


  getDaySummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_USER_DAY_SUMMARY, options);
  }

  getMonthSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_USER_MONTH_SUMMARY, options);
  }

  getYearSummary(options?: ListOptions): Observable<any> {
    return this.httpService.get(API_REPORT_USER_YEAR_SUMMARY, options);
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
