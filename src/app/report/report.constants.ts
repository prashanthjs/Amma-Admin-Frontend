import {API_BASE_URL} from '../app.constants';

export const API_REPORT_ORDER_SUMMARY = API_BASE_URL + '/reports/order/summary';
export const API_REPORT_TOP_USERS_AMOUNT = API_BASE_URL + '/reports/order/top/users/amount';
export const API_REPORT_TOP_USERS_COUNT = API_BASE_URL + '/reports/order/top/users/count';

export const API_REPORT_TOP_PRODUCTS_AMOUNT = API_BASE_URL + '/reports/order/top/products/amount';
export const API_REPORT_TOP_PRODUCTS_COUNT = API_BASE_URL + '/reports/order/top/products/count';

export const API_REPORT_ORDER_STATUS_SUMMARY = API_BASE_URL + '/reports/order/status/summary';
export const API_REPORT_ORDER_STATUS_TYPE_SUMMARY = API_BASE_URL + '/reports/order/status/type/summary';

export const API_REPORT_ORDER_DAY_SUMMARY = API_BASE_URL + '/reports/order/day/summary';
export const API_REPORT_ORDER_MONTH_SUMMARY = API_BASE_URL + '/reports/order/month/summary';
export const API_REPORT_ORDER_YEAR_SUMMARY = API_BASE_URL + '/reports/order/year/summary';

export const API_REPORT_USER_DAY_SUMMARY = API_BASE_URL + '/reports/user/day/summary';
export const API_REPORT_USER_MONTH_SUMMARY = API_BASE_URL + '/reports/user/month/summary';
export const API_REPORT_USER_YEAR_SUMMARY = API_BASE_URL + '/reports/user/year/summary';


export const CHART_BAR_NORMAL_OPTIONS = {
  scales: {
    min: 0,
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  }
};

export const CHART_BAR_CURRENCY_OPTIONS = {
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        return `£${tooltipItem.yLabel}`;
      }
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: (originalValue) => {
          return `£${originalValue}`;
        }
      },
    }],
  }
};

export const CHART_LINE_COLORS = [
  {
    pointRadius: 0,
    pointBorderWidth: 0,
    pointBorderColor: 'rgba(26, 179, 148, 1)',
    pointBackgroundColor: 'rgba(26, 179, 148, 1)',
    borderColor: 'rgba(26, 179, 148, 1)',
    backgroundColor: 'rgba(26, 179, 148, 0.7)',
    fill: true,
  }
];


export const CHART_LINE_COLORS1 = [
  {
    pointRadius: 0,
    pointBorderWidth: 0,
    pointBorderColor: 'rgba(248, 172, 89, 1)',
    pointBackgroundColor: 'rgba(248, 172, 89, 1)',
    borderColor: 'rgba(248, 172, 89, 1)',
    backgroundColor: 'rgba(248, 172, 89, 0.7)',
    fill: true,
  }
];

export const CHART_BAR_COLORS = [
  {
    pointRadius: 0,
    pointBorderWidth: 0,
    pointBorderColor: 'rgba(26, 179, 148, 1)',
    pointBackgroundColor: 'rgba(26, 179, 148, 1)',
    borderColor: 'rgba(26, 179, 148, 1)',
    backgroundColor: 'rgba(26, 179, 148, 0.7)',
    fill: true,
  }
];

export const CHART_BAR_COLORS1 = [
  {
    pointRadius: 0,
    pointBorderWidth: 0,
    pointBorderColor: 'rgba(248, 172, 89, 1)',
    pointBackgroundColor: 'rgba(248, 172, 89, 1)',
    borderColor: 'rgba(248, 172, 89, 1)',
    backgroundColor: 'rgba(248, 172, 89, 0.7)',
    fill: true,
  }
];

export const  CHART_PIE_CURRENCY_OPTIONS: any = {
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        return `£${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}`;
      }
    }
  }
};
