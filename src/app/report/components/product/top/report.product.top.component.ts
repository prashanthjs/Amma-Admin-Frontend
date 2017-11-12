import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../../../shared/services/app.config.service';
import {ReportOrderDataService} from '../../../services/report.order.data.service';
import {
  CHART_BAR_COLORS, CHART_BAR_COLORS1, CHART_BAR_CURRENCY_OPTIONS,
  CHART_BAR_NORMAL_OPTIONS
} from '../../../report.constants';
import {Subscription} from 'rxjs/Subscription';
import {AppEventBus} from '../../../../shared/services/app.event.bus';

@Component({
  selector: 'app-report-product-top',
  templateUrl: './report.product.top.template.html'
})
export class ReportProductTopComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  date = {start: moment().startOf('year'), end: moment()};
  chartAmountLabel = [];
  chartAmountData = [];
  amountResult = [];
  chartCountLabel = [];
  chartCountData = [];
  chartAmountColors = CHART_BAR_COLORS1;
  chartCountColors = CHART_BAR_COLORS;
  chartAmountOptions: any = CHART_BAR_CURRENCY_OPTIONS;
  chartCountOptions: Object = CHART_BAR_NORMAL_OPTIONS;
  countResult = [];

  constructor(private service: ReportOrderDataService, private eventBus: AppEventBus, public configService: AppConfigService) {
  }

  ngOnInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.init();
  }

  init() {
    this.getTopProductsByAmount();
    this.getTopProductsByCount();
  }

  selectedDate(value: any) {
    this.date.start = value.start;
    this.date.end = value.end;
    this.init();
  }

  getTopProductsByAmount() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 10);
    this.chartAmountData = [];
    this.chartAmountLabel = [];
    this.service.getTopProductsByAmount(listOptions).subscribe((result: any) => {
      const data = [];
      this.amountResult = result;
      _.forEach(result, (value) => {
        this.chartAmountLabel.push(value._id);
        data.push(value.total);
      });

      this.chartAmountData = [{data: data, label: 'Top Products by amount'}];
    });
  }

  getTopProductsByCount() {
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 10);
    this.chartCountData = [];
    this.chartCountLabel = [];
    this.service.getTopProductsByCount(listOptions).subscribe((result: any) => {
      const data = [];
      this.countResult = result;
      _.forEach(result, (value) => {
        this.chartCountLabel.push(value._id);
        data.push(value.total);
      });

      this.chartCountData = [{data: data, label: 'Top Products by count'}];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}
