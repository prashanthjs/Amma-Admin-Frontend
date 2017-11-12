import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../shared/services/app.config.service';
import {ListOptions} from '../../shared/models/list.options';
import * as _ from 'lodash';
import {ReportOrderDataService} from '../../report/services/report.order.data.service';
import * as moment from 'moment';
import {
  CHART_BAR_COLORS, CHART_BAR_COLORS1, CHART_BAR_CURRENCY_OPTIONS, CHART_BAR_NORMAL_OPTIONS, CHART_LINE_COLORS,
  CHART_LINE_COLORS1,
  CHART_PIE_CURRENCY_OPTIONS
} from '../../report/report.constants';
import {ReportUserDataService} from '../../report/services/report.user.data.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/services/auth.service';
import {AppEventBus} from '../../shared/services/app.event.bus';
import {OrderDataService} from '../../order/services/order.data.service';
import {UserDataService} from '../../user/services/user.data.service';
import {ProductDataService} from '../../product/services/product.data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  users = {total: 0, active: 0};
  products = {total: 0, active: 0, outOfStock: 0};
  orders = {total: 0, completed: 0};
  sales = {total: 0, profit: 0};
  categories = {total: 0};
  marts = {total: 0};

  productsOutOfStock = [];
  recentOrders = [];
  recentUsers = [];

  productChart = {
    label: [],
    data: [],
    colors: CHART_BAR_COLORS,
    options: CHART_BAR_CURRENCY_OPTIONS
  };

  userChart = {
    label: [],
    data: [],
    colors: CHART_BAR_COLORS1,
    options: CHART_BAR_CURRENCY_OPTIONS
  };

  salesStatusChart = {
    label: [],
    data: [],
    options: CHART_PIE_CURRENCY_OPTIONS
  };

  orderDaySummary = {
    label: [],
    data: [],
    colors: CHART_LINE_COLORS,
    options: CHART_BAR_NORMAL_OPTIONS
  };

  salesDaySummary = {
    label: [],
    data: [],
    colors: CHART_LINE_COLORS1,
    options: CHART_BAR_CURRENCY_OPTIONS
  };

  userDaySummary = {
    label: [],
    data: [],
    colors: CHART_LINE_COLORS,
    options: CHART_BAR_NORMAL_OPTIONS
  };

  date = {
    start: moment().startOf('day'),
    end: moment()
  };

  subscriptions: Subscription[] = [];

  constructor(private reportOrderDataService: ReportOrderDataService,
              private reportUserDataService: ReportUserDataService,
              private orderService: OrderDataService,
              public configService: AppConfigService,
              private userService: UserDataService,
              private authService: AuthService,
              private productService: ProductDataService,
              private eventBusService: AppEventBus) {
  }

  ngOnInit() {
    this.init();
    this.subscriptions.push(this.eventBusService.pageRedraw$.subscribe(() => this.init()));
    this.subscriptions.push(this.authService.userChanged$.subscribe(() => this.init()));
    this.subscriptions.push(this.eventBusService.pageRedraw$.subscribe(() => this.init()));
  }

  init() {
    if (this.authService.hasOption('dashboardDateRange')) {
      this.date = this.authService.getOption('dashboardDateRange');
    }
    this.getUserSummary();
    this.getOrderSummary();
    this.getSalesSummary();
    this.getProductsSummary();
    this.getTopProducts();
    this.getRecentOrders();
    this.getRecentUsers();
    this.getTopUsers();
    this.getProductsOutOfStock();
    this.getSalesSummaryByStatus();
    this.getSalesProgressSummary();
    this.getUserProgressSummary();
  }

  selectedDate(value: any) {
    this.date.start = value.start;
    this.date.end = value.end;
    this.authService.setOption('dashboardDateRange', this.date);
    this.init();
  }

  getUserSummary() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end);

    this.userService.getCountUsers(listOptions).subscribe((result) => {
      this.users.total = result.total;
    });

    listOptions.filter.filters.push({'field': 'isActive', 'operator': 'eq', 'value': true});
    this.userService.getCountUsers(listOptions).subscribe((result) => {
      this.users.active = result.total;
    });
  }

  getOrderSummary() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end);

    this.orderService.getCountOrders(listOptions).subscribe((result) => {
      this.orders.total = result.total;
    });
    this.reportOrderDataService.getSummary(listOptions).subscribe((result) => {
      this.orders.completed = result.total;
    });
  }

  getSalesSummary() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end);
    this.reportOrderDataService.getSummary(listOptions).subscribe((result) => {
      this.sales.total = result['sell'];
      this.sales.profit = result['sell'] - result['cost'];
    });
  }

  getProductsSummary() {
    this.productService.getCountProducts().subscribe((result) => {
      this.products.total = result.total;
    });
    const listOptions = new ListOptions();
    listOptions.filter = {'filters': [{'field': 'isActive', 'operator': 'eq', 'value': true}], 'logic': 'and'};

    this.productService.getCountProducts(listOptions).subscribe((result) => {
      this.products.active = result.total;
    });

    const listOptions1 = new ListOptions();
    listOptions1.filter = {
      'filters': [{'field': 'inventory.stock', 'operator': 'lte', 'value': 0}],
      'logic': 'and'
    };

    this.productService.getCountProducts(listOptions1).subscribe((result) => {
      this.products.outOfStock = result.total;
    });
  }

  getProductsOutOfStock() {
    const listOptions = new ListOptions();
    listOptions.filter = {
      'filters': [{'field': 'inventory.stock', 'operator': 'lte', 'value': 0}],
      'logic': 'and'
    };
    listOptions.pageSize = 5;

    this.productService.getProducts(listOptions).subscribe((result) => {
      this.productsOutOfStock = result.data;
    });
  }

  getTopProducts() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end, 5);

    this.reportOrderDataService.getTopProductsByAmount(listOptions).subscribe((result) => {
      this.productChart.data = [];
      this.productChart.label = [];
      const data = [];
      _.forEach(result, (value) => {
        this.productChart.label.push(value._id);
        data.push(value.total);
      });
      this.productChart.data = [
        {data: data, label: 'Popular Products'}
      ];

    });
  }

  getTopUsers() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end, 5);
    this.reportOrderDataService.getTopUsersByAmount(listOptions).subscribe((result) => {
      this.userChart.label = [];
      this.userChart.data = [];
      const data = [];
      _.forEach(result, (value) => {
        this.userChart.label.push(value._id);
        data.push(value.total);
      });
      this.userChart.data = [
        {data: data, label: 'Popular users'}
      ];

    });
  }

  getRecentOrders() {
    const listOptions = new ListOptions();
    listOptions.pageSize = 5;
    listOptions.sort = [{dir: 'desc', field: 'createdAt'}];

    this.orderService.getOrders(listOptions).subscribe((result) => {
      this.recentOrders = result.data || [];
    });
  }

  getRecentUsers() {
    const listOptions = new ListOptions();
    listOptions.pageSize = 5;
    listOptions.sort = [{dir: 'desc', field: 'createdAt'}];

    this.userService.getUsers(listOptions).subscribe((result) => {
      this.recentUsers = result.data || [];
    });
  }

  getSalesSummaryByStatus() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end, 10);
    this.salesStatusChart.data = [];
    this.salesStatusChart.label = [];
    this.reportOrderDataService.getStatusSummary(listOptions).subscribe((result: any) => {
      _.forEach(result, (value) => {
        this.salesStatusChart.label.push(value._id);
        this.salesStatusChart.data.push(value.amount);
      });
    });
  }

  getSalesProgressSummary() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end, 10);
    this.salesDaySummary.label = [];
    this.orderDaySummary.label = [];
    this.salesDaySummary.data = [];
    this.orderDaySummary.label = [];

    this.reportOrderDataService.getDaySummary(listOptions).subscribe((result: any) => {
      const countData = [];
      const amountData = [];
      _.forEach(result, (value) => {
        this.salesDaySummary.label.push(value._id);
        this.orderDaySummary.label.push(value._id);
        countData.push(value.total);
        amountData.push(value.amount);
      });

      this.orderDaySummary.data = [
        {
          data: countData, label: 'Daily'
        }
      ];


      this.salesDaySummary.data = [
        {
          data: amountData, label: 'Daily'
        }
      ];
    });
  }

  getUserProgressSummary() {
    const listOptions = this.reportOrderDataService.getFilterListOptions(this.date.start, this.date.end, 10);
    this.userDaySummary.label = [];
    this.userDaySummary.data = [];

    this.reportUserDataService.getDaySummary(listOptions).subscribe((result: any) => {
      const countData = [];
      _.forEach(result, (value) => {
        this.userDaySummary.label.push(value._id);
        countData.push(value.total);
      });

      this.userDaySummary.data = [
        {
          data: countData, label: 'Daily'
        }
      ];
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
