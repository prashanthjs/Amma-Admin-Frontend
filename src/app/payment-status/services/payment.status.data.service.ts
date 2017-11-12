import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';
import {API_PAYMENT_STATUS_BASE_URL} from '../payment.status.constants';

@Injectable()
export class PaymentStatusDataService {

  constructor(private httpService: AppHttpService) {
  }

  getPaymentStatuses(options?: ListOptions): Observable<ListModel> {
    return this.httpService.getList(API_PAYMENT_STATUS_BASE_URL, options);
  }

  getCountPaymentStatuses(options?: ListOptions) {
    return this.httpService.get(API_PAYMENT_STATUS_BASE_URL + '/count', options);
  }

  getPaymentStatusById(id: string) {
    return this.httpService.get(API_PAYMENT_STATUS_BASE_URL + '/' + id);
  }

  searchPaymentStatuses(text: string, limit: number = 10) {
    return this.httpService.search(API_PAYMENT_STATUS_BASE_URL, text, limit, 'name');
  }

  savePaymentStatus(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createPaymentStatus(model);
    } else {
      return this.updatePaymentStatus(model, id);
    }
  }

  createPaymentStatus(model: Object) {
    return this.httpService.create(API_PAYMENT_STATUS_BASE_URL, model);
  }

  updatePaymentStatus(model: Object, id) {
    return this.httpService.update(API_PAYMENT_STATUS_BASE_URL + '/' + id, model);
  }

  removePaymentStatus(id: string) {
    return this.httpService.remove(API_PAYMENT_STATUS_BASE_URL + '/' + id);
  }
}
