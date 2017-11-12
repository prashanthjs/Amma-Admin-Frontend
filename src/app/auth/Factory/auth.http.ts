import {AuthConfig, AuthHttp as BaseAuthHttp} from 'angular2-jwt';
import {Http, Request, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

export class AuthHttp extends BaseAuthHttp {

    constructor(private authService: AuthService, options: AuthConfig, http: Http, defOpts?: RequestOptions) {
        super(options, http, defOpts);
    }

    requestWithToken(req: Request, token: string): Observable<Response> {
        if (this.authService.hasOption('mart')) {
            req.headers.set('X-MART', this.authService.getOption('mart'));
        }
        return super.requestWithToken(req, token);
    }
}
