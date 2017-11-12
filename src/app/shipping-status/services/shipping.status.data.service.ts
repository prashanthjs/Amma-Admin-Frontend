import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_SHIPPING_STATUS_BASE_URL} from '../shipping.status.constants';

@Injectable()
export class ShippingStatusDataService {

  constructor(private httpService: AppHttpService) {
  }

  getShippingStatuses(options?: ListOptions): Observable<ListModel> {
    return this.httpService.getList(API_SHIPPING_STATUS_BASE_URL, options);
  }

  getCountShippingStatuses(options?: ListOptions) {
    return this.httpService.get(API_SHIPPING_STATUS_BASE_URL + '/count', options);
  }

  getShippingStatusById(id: string) {
    return this.httpService.get(API_SHIPPING_STATUS_BASE_URL + '/' + id);
  }

  searchShippingStatuses(text: string, limit: number = 10) {
    return this.httpService.search(API_SHIPPING_STATUS_BASE_URL, text, limit, 'name');
  }

  saveShippingStatus(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createShippingStatus(model);
    } else {
      return this.updateShippingStatus(model, id);
    }
  }

  createShippingStatus(model: Object) {
    return this.httpService.create(API_SHIPPING_STATUS_BASE_URL, model);
  }

  updateShippingStatus(model: Object, id) {
    return this.httpService.update(API_SHIPPING_STATUS_BASE_URL + '/' + id, model);
  }

  removeShippingStatus(id: string) {
    return this.httpService.remove(API_SHIPPING_STATUS_BASE_URL + '/' + id);
  }
}
