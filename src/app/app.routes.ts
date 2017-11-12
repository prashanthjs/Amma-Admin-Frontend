import {BlankLayoutComponent} from './layouts/components/layouts/blank.layout.component';
import {AuthLoginComponent} from './auth/components/login/auth.login.component';
import {AuthLogoutComponent} from './auth/components/logout/auth.logout.component';
import {CATEGORY_ROUTES} from './category/category.route';
import * as _ from 'lodash';
import {TopNavigationLayoutComponent} from './layouts/components/layouts/top.navigation.layout.component';
import {MART_ROUTES} from './mart/mart.route';
import {PRODUCT_ROUTES} from './product/product.route';
import {USER_GROUP_ROUTES} from './user-group/user.group.route';
import {USER_ROUTES} from './user/user.route';
import {SHIPPING_METHOD_ROUTES} from './shipping-method/shipping.method.route';
import {SHIPPING_STATUS_ROUTES} from './shipping-status/shipping.status.route';
import {PAYMENT_METHOD_ROUTES} from './payment-method/payment.method.route';
import {PAYMENT_STATUS_ROUTES} from './payment-status/payment.status.route';
import {ORDER_STATUS_ROUTES} from './order-status/order.status.route';
import {ORDER_ROUTES} from './order/order.route';
import {REPORT_ROUTES} from './report/report.route';
import {DASHBOARD_ROUTES} from './dashboard/dashboard.route';
import {NotFoundComponent} from './layouts/components/not-found/not.found.component';
import {AccessDeniedComponent} from './layouts/components/access-denied/access.denied.component';
import {ServerErrorComponent} from './layouts/components/server-error/server.error.component';
import {LAYOUT_ROUTES} from './layouts/layout.route';

let routes = [];
routes = _.concat(routes, MART_ROUTES);
routes = _.concat(routes, USER_GROUP_ROUTES);
routes = _.concat(routes, USER_ROUTES);
routes = _.concat(routes, CATEGORY_ROUTES);
routes = _.concat(routes, PRODUCT_ROUTES);
routes = _.concat(routes, SHIPPING_METHOD_ROUTES);
routes = _.concat(routes, SHIPPING_STATUS_ROUTES);
routes = _.concat(routes, PAYMENT_METHOD_ROUTES);
routes = _.concat(routes, PAYMENT_STATUS_ROUTES);
routes = _.concat(routes, ORDER_STATUS_ROUTES);
routes = _.concat(routes, ORDER_ROUTES);
routes = _.concat(routes, REPORT_ROUTES);
routes = _.concat(routes, DASHBOARD_ROUTES);
routes = _.concat(routes, LAYOUT_ROUTES);

export const ROUTES = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: '', component: BlankLayoutComponent,
        children: [
            {path: 'login', component: AuthLoginComponent},
            {path: 'logout', component: AuthLogoutComponent}
        ]
    },
    {
        path: '', component: TopNavigationLayoutComponent,
        children: routes
    },
    {path: '**', redirectTo: ''}
];
