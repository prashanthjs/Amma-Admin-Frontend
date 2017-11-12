import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {LayoutsModule} from './layouts/layouts.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {CategoryModule} from './category/category.module';
import {MartModule} from './mart/mart.module';
import {ProductModule} from './product/product.module';
import {UserGroupModule} from './user-group/user.group.module';
import {UserModule} from './user/user.module';
import {ShippingMethodModule} from './shipping-method/shipping.method.module';
import {ShippingStatusModule} from './shipping-status/shipping.status.module';
import {PaymentMethodModule} from './payment-method/payment.method.module';
import {PaymentStatusModule} from './payment-status/payment.status.module';
import {OrderStatusModule} from './order-status/order.status.module';
import {OrderModule} from './order/order.module';
import {ReportModule} from './report/report.module';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    RouterModule.forRoot(ROUTES),
    AuthModule,
    SharedModule,
    LayoutsModule,
    MartModule,
    UserGroupModule,
    UserModule,
    CategoryModule,
    ProductModule,
    ShippingMethodModule,
    ShippingStatusModule,
    PaymentMethodModule,
    PaymentStatusModule,
    OrderStatusModule,
    OrderModule,
    ReportModule,
    DashboardModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
