import {API_MART_BASE_URL} from '../mart.constants'
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';

@Injectable()
export class MartDataService {

  constructor(private httpService: AppHttpService) {
  }

  getMarts(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_MART_BASE_URL, options);
  }

  getCountMarts(options?: ListOptions) {
    return this.httpService.get(API_MART_BASE_URL + '/count', options);
  }

  getMartById(id: string) {
    return this.httpService.get(API_MART_BASE_URL + '/' + id);
  }

  searchMarts(text: string, limit: number = 10) {
    return this.httpService.search(API_MART_BASE_URL, text, limit, 'name');
  }

  saveMart(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createMart(model);
    } else {
      return this.updateMart(model, id);
    }
  }

  createMart(model: Object) {
    return this.httpService.create(API_MART_BASE_URL, model);
  }

  updateMart(model: Object, id) {
    return this.httpService.update(API_MART_BASE_URL + '/' + id, model);
  }

  removeMart(id: string) {
    return this.httpService.remove(API_MART_BASE_URL + '/' + id);
  }
}
