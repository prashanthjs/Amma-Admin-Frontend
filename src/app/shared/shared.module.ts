import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridModule} from '@progress/kendo-angular-grid';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {AlertModule} from 'ngx-bootstrap/alert';
import {AppFormMessagesComponent} from './components/app.form.messages.component';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {CustomFormsModule} from 'ng2-validation';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {LabelModule} from '@progress/kendo-angular-label';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {AppConfigService} from './services/app.config.service';
import {AppFileInputComponent} from './components/app.file.input.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AuthModule} from '../auth/auth.module';
import * as moment from 'moment';
import {Daterangepicker, DaterangepickerConfig} from 'ng2-daterangepicker';
import {AppEventBus} from './services/app.event.bus';
import {TagInputModule} from 'ngx-chips';
import {AppHttpServiceFactory} from './services/app.http.factory';
import {AppFormFactory} from './services/app.form.factory';
import {AppGridFactory} from './services/app.grid.factory';
import {AppFileUploadService, AppFileUploadServiceFactory} from './services/app.file.upload.service';
import {AppSearchSelectInputComponent} from './components/app.search.select.input.component';
import {AppHttpService} from './services/app.http.service';
import {AppViewResourceFactory} from './services/app.view.resource.factory';
import {ChartsModule} from 'ng2-charts';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AppPageErrorHandler} from './services/app.page.error.handler';
import {AppHasPrivilegeDirective} from './directives/app.has.privilege.directive';

@NgModule({
  declarations: [AppFormMessagesComponent, AppFileInputComponent, AppSearchSelectInputComponent, AppHasPrivilegeDirective],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpModule,
    AlertModule, TypeaheadModule, DropDownsModule, TagInputModule, FileUploadModule,
    Daterangepicker,
    AuthModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GridModule,
    AuthModule,
    FileUploadModule,
    ModalModule,
    CarouselModule,
    BsDropdownModule,
    AlertModule,
    TypeaheadModule,
    ConfirmationPopoverModule,
    CustomFormsModule,
    DateInputsModule,
    DropDownsModule,
    TagInputModule,
    LabelModule,
    AppFormMessagesComponent,
    AppFileInputComponent,
    Daterangepicker,
    AppSearchSelectInputComponent,
    ChartsModule,
    MultiselectDropdownModule,
    AppHasPrivilegeDirective
  ],
  providers: [
    {
      provide: Http,
      useFactory: AppHttpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    },

    AppHttpService,
    AppConfigService,
    AppEventBus,
    AppFormFactory,
    AppGridFactory,
    AppViewResourceFactory,
    AppFileUploadServiceFactory,
    AppFileUploadService,
    AppPageErrorHandler
  ]
})

export class SharedModule {
  constructor(private daterangepickerOptions: DaterangepickerConfig) {
    this.daterangepickerOptions.settings = {
      locale: {format: 'DD/MM/YYYY'},
      alwaysShowCalendars: true,
      ranges: {
        'Today': [moment().startOf('day'), moment()],
        'Last Month': [moment().subtract(1, 'month'), moment()],
        'Last 3 Months': [moment().subtract(4, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
      }
    };
  }
}
