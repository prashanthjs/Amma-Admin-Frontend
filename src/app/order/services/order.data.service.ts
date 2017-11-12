import {API_ORDER_BASE_URL} from '../order.constants'
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {del} from 'selenium-webdriver/http';

@Injectable()
export class OrderDataService {

  constructor(private httpService: AppHttpService) {
  }

  getOrders(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_ORDER_BASE_URL, options);
  }

  getCountOrders(options?: ListOptions) {
    return this.httpService.get(API_ORDER_BASE_URL + '/count', options);
  }

  getOrderById(id: string) {
    return this.httpService.get(API_ORDER_BASE_URL + '/' + id);
  }

  searchOrders(text: string, limit: number = 10) {
    return this.httpService.search(API_ORDER_BASE_URL, text, limit, 'name');
  }

  saveOrder(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createOrder(model);
    } else {
      return this.updateOrder(model, id);
    }
  }

  createOrder(model: Object) {
    return this.httpService.create(API_ORDER_BASE_URL, this.cleanModel(model));
  }

  updateOrder(model: Object, id) {
    return this.httpService.update(API_ORDER_BASE_URL + '/' + id, this.cleanModel(model));
  }

  removeOrder(id: string) {
    return this.httpService.remove(API_ORDER_BASE_URL + '/' + id);
  }

  updateOrderMart(model: Object, id) {
    return this.httpService.update(API_ORDER_BASE_URL + '/' + id + '/mart', model);
  }

  cleanModel(model) {
    delete model.totalPrice;
    delete model.totalShipping;
    delete model.mart;

    if (model.inItems && model.inItems.length) {
      model.inItems.forEach((inItem) => {
        delete inItem.totalPrice;
        delete inItem.totalShipping;
      });
    }
    return model;
  }
}
