import {API_USER_BASE_URL} from '../user.constants'
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';

@Injectable()
export class UserDataService {

  constructor(private httpService: AppHttpService) {
  }

  getUsers(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_USER_BASE_URL, options);
  }

  getCountUsers(options?: ListOptions) {
    return this.httpService.get(API_USER_BASE_URL + '/count', options);
  }

  getUserById(id: string) {
    return this.httpService.get(API_USER_BASE_URL + '/' + id);
  }

  searchUsers(text: string, limit: number = 10) {
    return this.httpService.search(API_USER_BASE_URL, text, limit, 'username');
  }

  saveUser(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createUser(model);
    } else {
      return this.updateUser(model, id);
    }
  }

  createUser(model: Object) {
    return this.httpService.create(API_USER_BASE_URL, model);
  }

  updateUser(model: Object, id) {
    return this.httpService.update(API_USER_BASE_URL + '/' + id, model);
  }

  removeUser(id: string) {
    return this.httpService.remove(API_USER_BASE_URL + '/' + id);
  }

  updateUserMart(model: Object, id) {
    return this.httpService.update(API_USER_BASE_URL + '/' + id + '/mart', model);
  }

  changePassword(model: Object, id: string): Observable<Object> {
    return this.httpService.update(API_USER_BASE_URL + '/' + id + '/change-password', model);
  }

  getMyProfile() {
    return this.httpService.get(API_USER_BASE_URL + '/my-profile');
  }

  updateMyUser(model: Object) {
    return this.httpService.update(API_USER_BASE_URL + '/my-profile/edit', model);
  }

  changeMyPassword(model: Object) {
    return this.httpService.update(API_USER_BASE_URL + '/my-profile/change-password', model);
  }
}
