import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../../../../shared/services/app.config.service';
import {ReportOrderDataService} from '../../../../services/report.order.data.service';
import {
  CHART_BAR_CURRENCY_OPTIONS,
  CHART_BAR_NORMAL_OPTIONS,
  CHART_LINE_COLORS,
  CHART_LINE_COLORS1
} from '../../../../report.constants';
import {AppEventBus} from '../../../../../shared/services/app.event.bus';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-report-order-summary-month',
  templateUrl: './report.order.summary.month.template.html'
})
export class ReportOrderSummaryMonthComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  date = {start: moment().startOf('year'), end: moment()};
  chartAmountData = [];
  chartCountData = [];
  chartLabel = [];
  result = [];
  chartAmountColors = CHART_LINE_COLORS;
  chartCountColors = CHART_LINE_COLORS1;
  chartAmountOptions: any = CHART_BAR_CURRENCY_OPTIONS;
  chartCountOptions: Object = CHART_BAR_NORMAL_OPTIONS;

  constructor(private service: ReportOrderDataService, private eventBus: AppEventBus, public configService: AppConfigService) {
  }

  ngOnInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.init();
  }

  init() {
    this.getSummary();
  }

  selectedDate(value: any) {
    this.date.start = value.start;
    this.date.end = value.end;
    this.init();
  }

  getSummary() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 12);
    this.chartCountData = [];
    this.chartAmountData = [];
    this.chartLabel = [];
    this.service.getMonthSummary(listOptions).subscribe((result: any) => {
      const countData = [];
      const amountData = [];
      this.result = result;
      _.forEach(result, (value) => {
        this.chartLabel.push(value._id);
        countData.push(value.total);
        amountData.push(value.amount);
      });

      this.chartCountData = [{data: countData, label: 'Monthly'}];
      this.chartAmountData = [{data: amountData, label: 'Monthly'}];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}
