import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_PAYMENT_METHOD_BASE_URL} from '../payment.method.constants';

@Injectable()
export class PaymentMethodDataService {

  constructor(private httpService: AppHttpService) {
  }

  getPaymentMethods(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_PAYMENT_METHOD_BASE_URL, options);
  }

  getCountPaymentMethods(options?: ListOptions) {
    return this.httpService.get(API_PAYMENT_METHOD_BASE_URL + '/count', options);
  }

  getPaymentMethodById(id: string) {
    return this.httpService.get(API_PAYMENT_METHOD_BASE_URL + '/' + id);
  }

  searchPaymentMethods(text: string, limit: number = 10) {
    return this.httpService.search(API_PAYMENT_METHOD_BASE_URL, text, limit, 'name');
  }

  savePaymentMethod(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createPaymentMethod(model);
    } else {
      return this.updatePaymentMethod(model, id);
    }
  }

  createPaymentMethod(model: Object) {
    return this.httpService.create(API_PAYMENT_METHOD_BASE_URL, model);
  }

  updatePaymentMethod(model: Object, id) {
    return this.httpService.update(API_PAYMENT_METHOD_BASE_URL + '/' + id, model);
  }

  removePaymentMethod(id: string) {
    return this.httpService.remove(API_PAYMENT_METHOD_BASE_URL + '/' + id);
  }
}
