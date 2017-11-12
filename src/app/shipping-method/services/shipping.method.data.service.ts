import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_SHIPPING_METHOD_BASE_URL} from '../shipping.method.constants';

@Injectable()
export class ShippingMethodDataService {

  constructor(private httpService: AppHttpService) {
  }

  getShippingMethods(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_SHIPPING_METHOD_BASE_URL, options);
  }

  getCountShippingMethods(options?: ListOptions) {
    return this.httpService.get(API_SHIPPING_METHOD_BASE_URL + '/count', options);
  }

  getShippingMethodById(id: string) {
    return this.httpService.get(API_SHIPPING_METHOD_BASE_URL + '/' + id);
  }

  searchShippingMethods(text: string, limit: number = 10) {
    return this.httpService.search(API_SHIPPING_METHOD_BASE_URL, text, limit, 'name');
  }

  saveShippingMethod(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createShippingMethod(model);
    } else {
      return this.updateShippingMethod(model, id);
    }
  }

  createShippingMethod(model: Object) {
    return this.httpService.create(API_SHIPPING_METHOD_BASE_URL, model);
  }

  updateShippingMethod(model: Object, id) {
    return this.httpService.update(API_SHIPPING_METHOD_BASE_URL + '/' + id, model);
  }

  removeShippingMethod(id: string) {
    return this.httpService.remove(API_SHIPPING_METHOD_BASE_URL + '/' + id);
  }
}
