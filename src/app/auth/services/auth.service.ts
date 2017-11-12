import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {API_AUTH_PROFILE_URL, API_AUTH_URL, API_AUTH_USER_GROUPS} from '../auth.constants';
import {JwtHelper} from 'angular2-jwt';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';

@Injectable()
export class AuthService {
  token: string;
  options: Object;
  user: Object;
  userPrivileges: string[];
  private jwtHelper: JwtHelper = new JwtHelper();
  userChanged$: EventEmitter<string> = new EventEmitter();

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.options = currentUser && currentUser.options;
  }

  login(username: string, password: string): Observable<Object | boolean> {
    return this.http.post(API_AUTH_URL, {username: username, password: password})
      .map((response: Response) => {
        const token = response.json() && response.json().token;
        if (token && username) {
          this.token = token;
          this.options = {};
          this.save();
          return true;
        } else {
          throw new Error('Invalid dataService');
        }
      }).catch((error: any) => {
        this.token = null;
        this.user = null;
        throw error;
      });
  }

  loadUser(): Observable<Object> {
    const headers = new Headers({'Accept': 'application/json'});
    headers.append('Authorization', `Bearer ${this.token}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(API_AUTH_PROFILE_URL, options).map((response: Response) => {
      this.user = response.json();
      return this.user;
    }).flatMap((res) => {
      return this.loadPrivileges().map(() => res);
    });
  }

  loadPrivileges(): Observable<Object> {
    const headers = new Headers({'Accept': 'application/json'});
    headers.append('Authorization', `Bearer ${this.token}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(API_AUTH_USER_GROUPS + '/' + this.user['userGroup'], options).map((response: Response) => {
      this.userPrivileges = response.json().privileges;
      this.triggerUserChanged();
      return this.userPrivileges;
    });
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): Observable<Object | boolean> {
    let sub;
    if (!this.token || this.jwtHelper.isTokenExpired(this.token)) {
      sub = ArrayObservable.of(false);
    }
    if (this.user) {
      sub = ArrayObservable.of(this.user);
    } else {
      sub = this.loadUser();
    }

    return sub.catch(() => ArrayObservable.of(false));
  }

  triggerUserChanged() {
    this.userChanged$.emit(this.user['_id']);
  }


  setOption(key, value) {
    if (!this.options) {
      this.options = {};
    }
    this.options[key] = value;
    this.save();
  }

  hasOption(key) {
    return this.options && this.options.hasOwnProperty(key);
  }

  getOption(key) {
    if (!this.hasOption(key)) {
      return null;
    }
    return this.options[key];
  }

  hasPrivilege(privileges: string[]): boolean {
    if (!this.userPrivileges || !this.userPrivileges.length) {
      return false;
    }
    if (privileges && privileges.length) {

      for (let i = 0; i < privileges.length; i++) {
        if (this.userPrivileges.indexOf(privileges[i]) === -1) {
          return false;
        }
      }
    }
    return true;
  }

  private save() {
    localStorage.setItem('currentUser', JSON.stringify({
      token: this.token,
      options: this.options
    }));
  }
}
