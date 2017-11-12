import {Http, RequestOptions} from '@angular/http';
import {AuthConfig} from 'angular2-jwt';
import {AuthService} from '../services/auth.service';
import {AuthHttp} from './auth.http';

export function AuthHttpServiceFactory(http: Http, options: RequestOptions, authService: AuthService) {
    return new AuthHttp(authService, new AuthConfig({
        tokenName: 'token',
        noClientCheck: true,
        tokenGetter: (() => authService.token),
        globalHeaders: [{'Content-Type': 'application/json'}],

    }), http, options);
}
