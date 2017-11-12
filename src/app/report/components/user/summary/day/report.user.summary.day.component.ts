import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../../../../shared/services/app.config.service';
import {
  CHART_BAR_NORMAL_OPTIONS,
  CHART_LINE_COLORS
} from '../../../../report.constants';
import {ReportUserDataService} from '../../../../services/report.user.data.service';
import {AppEventBus} from '../../../../../shared/services/app.event.bus';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-report-user-summary-day',
  templateUrl: './report.user.summary.day.template.html'
})
export class ReportUserSummaryDayComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  date = {start: moment().startOf('year'), end: moment()};
  chartCountData = [];
  chartLabel = [];
  result = [];
  chartCountColors = CHART_LINE_COLORS;
  chartCountOptions: Object = CHART_BAR_NORMAL_OPTIONS;

  constructor(private service: ReportUserDataService, private eventBus: AppEventBus, public configService: AppConfigService) {
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
    const listOptions = this.service.getFilterListOptions(this.date.start, this.date.end, 1000);
    this.chartCountData = [];
    this.chartLabel = [];
    this.service.getDaySummary(listOptions).subscribe((result: any) => {
      const countData = [];
      this.result = result;
      _.forEach(result, (value) => {
        this.chartLabel.push(value._id);
        countData.push(value.total);
      });

      this.chartCountData = [{data: countData, label: 'Daily'}];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}
