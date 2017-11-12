import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_ORDER_STATUS_BASE_URL} from '../order.status.constants';

@Injectable()
export class OrderStatusDataService {

  constructor(private httpService: AppHttpService) {
  }

  getOrderStatuses(options?: ListOptions): Observable<ListModel> {
    return this.httpService.getList(API_ORDER_STATUS_BASE_URL, options);
  }

  getCountOrderStatuses(options?: ListOptions) {
    return this.httpService.get(API_ORDER_STATUS_BASE_URL + '/count', options);
  }

  getOrderStatusById(id: string) {
    return this.httpService.get(API_ORDER_STATUS_BASE_URL + '/' + id);
  }

  searchOrderStatuses(text: string, limit: number = 10) {
    return this.httpService.search(API_ORDER_STATUS_BASE_URL, text, limit, 'name');
  }

  saveOrderStatus(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createOrderStatus(model);
    } else {
      return this.updateOrderStatus(model, id);
    }
  }

  createOrderStatus(model: Object) {
    return this.httpService.create(API_ORDER_STATUS_BASE_URL, model);
  }

  updateOrderStatus(model: Object, id) {
    return this.httpService.update(API_ORDER_STATUS_BASE_URL + '/' + id, model);
  }

  removeOrderStatus(id: string) {
    return this.httpService.remove(API_ORDER_STATUS_BASE_URL + '/' + id);
  }
}
