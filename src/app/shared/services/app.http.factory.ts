import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, XHRBackend} from '@angular/http';

@Injectable()
export class AppHttp extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
}

export function AppHttpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions): AppHttp {
    return new AppHttp(backend, defaultOptions);
}
