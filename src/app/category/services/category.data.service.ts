import {API_CATEGORY_BASE_URL} from '../category.constants'
import {Injectable} from '@angular/core';
import {ListOptions} from '../../shared/models/list.options';
import {AppHttpService} from '../../shared/services/app.http.service';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../../shared/models/list.model';

@Injectable()
export class CategoryDataService {

  constructor(private httpService: AppHttpService) {
  }

  getCategories(options?: ListOptions): Observable<ListModel> {

    return this.httpService.getList(API_CATEGORY_BASE_URL, options);
  }

  getCountCategories(options?: ListOptions) {
    return this.httpService.get(API_CATEGORY_BASE_URL + '/count', options);
  }

  getCategoryById(id: string) {
    return this.httpService.get(API_CATEGORY_BASE_URL + '/' + id);
  }

  searchCategories(text: string, limit: number = 10) {
    return this.httpService.search(API_CATEGORY_BASE_URL, text, limit, 'name');
  }

  saveCategory(model: Object, id: string = null): Observable<Object> {
    if (!id) {
      return this.createCategory(model);
    } else {
      return this.updateCategory(model, id);
    }
  }

  createCategory(model: Object) {
    return this.httpService.create(API_CATEGORY_BASE_URL, model);
  }

  updateCategory(model: Object, id) {
    return this.httpService.update(API_CATEGORY_BASE_URL + '/' + id, model);
  }

  removeCategory(id: string) {
    return this.httpService.remove(API_CATEGORY_BASE_URL + '/' + id);
  }

  updateCategoryMart(model: Object, id) {
    return this.httpService.update(API_CATEGORY_BASE_URL + '/' + id + '/mart', model);
  }
}
