import {NgModule} from '@angular/core';
import {AuthLoginComponent} from './components/login/auth.login.component';
import {AuthService} from './services/auth.service';
import {AuthHttpServiceFactory} from './Factory/auth.http.service.factory';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {AlertModule} from 'ngx-bootstrap';
import {AuthLogoutComponent} from './components/logout/auth.logout.component';
import {AuthGuard} from './services/auth.guard';

@NgModule({
    declarations: [AuthLoginComponent, AuthLogoutComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpModule, AlertModule],
    exports: [AuthLoginComponent, AuthLogoutComponent],
    providers: [AuthService, AuthGuard, {
        provide: AuthHttp,
        useFactory: AuthHttpServiceFactory,
        deps: [Http, RequestOptions, AuthService]
    }],
    entryComponents: []
})
export class AuthModule {
}
