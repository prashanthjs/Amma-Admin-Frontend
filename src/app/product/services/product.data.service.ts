import {API_PRODUCT_BASE_URL} from '../product.constants'
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';

@Injectable()
export class ProductDataService {

  constructor(private httpService: AppHttpService) {
  }

  getProducts(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_PRODUCT_BASE_URL, options);
  }

  getCountProducts(options?: ListOptions) {
    return this.httpService.get(API_PRODUCT_BASE_URL + '/count', options);
  }

  getProductById(id: string) {
    return this.httpService.get(API_PRODUCT_BASE_URL + '/' + id);
  }

  searchProducts(text: string, limit: number = 10) {
    return this.httpService.search(API_PRODUCT_BASE_URL, text, limit, 'name');
  }

  saveProduct(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createProduct(model);
    } else {
      return this.updateProduct(model, id);
    }
  }

  createProduct(model: Object) {
    return this.httpService.create(API_PRODUCT_BASE_URL, model);
  }

  updateProduct(model: Object, id) {
    return this.httpService.update(API_PRODUCT_BASE_URL + '/' + id, model);
  }

  removeProduct(id: string) {
    return this.httpService.remove(API_PRODUCT_BASE_URL + '/' + id);
  }

  updateProductMart(model: Object, id) {
    return this.httpService.update(API_PRODUCT_BASE_URL + '/' + id + '/mart', model);
  }
}
