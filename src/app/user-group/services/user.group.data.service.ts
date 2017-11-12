import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_USER_GROUP_BASE_URL, API_USER_PRIVILAGES_URL} from '../user.group.constants';

@Injectable()
export class UserGroupDataService {

  constructor(private httpService: AppHttpService) {
  }

  getUserGroups(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_USER_GROUP_BASE_URL, options);
  }

  getCountUserGroups(options?: ListOptions) {
    return this.httpService.get(API_USER_GROUP_BASE_URL + '/count', options);
  }

  getUserGroupById(id: string) {
    return this.httpService.get(API_USER_GROUP_BASE_URL + '/' + id);
  }

  searchUserGroups(text: string, limit: number = 10) {
    return this.httpService.search(API_USER_GROUP_BASE_URL, text, limit, 'name');
  }

  saveUserGroup(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createUserGroup(model);
    } else {
      return this.updateUserGroup(model, id);
    }
  }

  createUserGroup(model: Object) {
    return this.httpService.create(API_USER_GROUP_BASE_URL, model);
  }

  updateUserGroup(model: Object, id) {
    return this.httpService.update(API_USER_GROUP_BASE_URL + '/' + id, model);
  }

  removeUserGroup(id: string) {
    return this.httpService.remove(API_USER_GROUP_BASE_URL + '/' + id);
  }

  getPrivileges(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_USER_PRIVILAGES_URL);
  }
}
