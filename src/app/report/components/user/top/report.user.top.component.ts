import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../../../shared/services/app.config.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import {ReportOrderDataService} from '../../../services/report.order.data.service';
import {
  CHART_BAR_COLORS,
  CHART_BAR_COLORS1,
  CHART_BAR_CURRENCY_OPTIONS,
  CHART_BAR_NORMAL_OPTIONS
} from '../../../report.constants';
import {Subscription} from 'rxjs/Subscription';
import {AppEventBus} from '../../../../shared/services/app.event.bus';

@Component({
  selector: 'app-report-user-top',
  templateUrl: './report.user.top.template.html'
})
export class ReportUserTopComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  chartAmountLabel = [];
  chartAmountData = [];
  amountResult = [];

  chartCountLabel = [];
  chartCountData = [];
  countResult = [];

  chartAmountColors = CHART_BAR_COLORS;
  chartCountColors = CHART_BAR_COLORS1;
  chartAmountOptions: any = CHART_BAR_CURRENCY_OPTIONS;
  chartCountOptions: Object = CHART_BAR_NORMAL_OPTIONS;

  date = {start: moment().startOf('year'), end: moment()};


  constructor(private service: ReportOrderDataService, private eventBus: AppEventBus, public configService: AppConfigService) {
  }

  ngOnInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.init();
  }

  init() {
    this.getTopUsersByAmount();
    this.getTopUsersByCount();
  }

  selectedDate(value: any) {
    this.date.start = value.start;
    this.date.end = value.end;
    this.init();
  }

  getTopUsersByAmount() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 10);
    this.chartAmountData = [];
    this.chartAmountLabel = [];
    this.service.getTopUsersByAmount(listOptions).subscribe((result: any) => {
      const data = [];
      this.amountResult = result;
      _.forEach(result, (value) => {
        this.chartAmountLabel.push(value._id);
        data.push(value.total);
      });
      this.chartAmountData = [{data: data, label: 'Top users by amount'}];
    });
  }

  getTopUsersByCount() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 10);
    this.chartCountData = [];
    this.chartCountLabel = [];
    this.service.getTopUsersByCount(listOptions).subscribe((result: any) => {
      const data = [];
      this.countResult = result;
      _.forEach(result, (value) => {
        this.chartCountLabel.push(value._id);
        data.push(value.total);
      });
      this.chartCountData = [{data: data, label: 'Top users by count'}];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}
