import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../../../shared/services/app.config.service';
import {ReportOrderDataService} from '../../../services/report.order.data.service';
import {CHART_PIE_CURRENCY_OPTIONS} from '../../../report.constants';
import {AppEventBus} from '../../../../shared/services/app.event.bus';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-report-order-status',
  templateUrl: './report.order.status.template.html'
})
export class ReportOrderStatusComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  chartLabel = [];
  chartCountData = [];
  chartAmountData = [];
  result = [];
  date = {start: moment().startOf('year'), end: moment()};
  chartAmountOptions: any = CHART_PIE_CURRENCY_OPTIONS;

  constructor(private service: ReportOrderDataService, private eventBus: AppEventBus, public configService: AppConfigService) {
  }

  ngOnInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.init();
  }

  selectedDate(value: any) {
    this.date.start = value.start;
    this.date.end = value.end;
    this.init();
  }

  init() {
    this.getStatus();
  }

  getStatus() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 10);
    this.chartCountData = [];
    this.chartAmountData = [];
    this.chartLabel = [];
    this.service.getStatusSummary(listOptions).subscribe((result: any) => {
      this.result = result;
      _.forEach(result, (value) => {
        this.chartLabel.push(value._id);
        this.chartCountData.push(value.total);
        this.chartAmountData.push(value.amount);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}
