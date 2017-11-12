import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ListModel} from '../models/list.model';
import {ListOptions} from '../models/list.options';
import {AuthHttp} from 'angular2-jwt';
import {Injectable} from '@angular/core';

@Injectable()
export class AppHttpService {

  constructor(private authHttp: AuthHttp) {
  }

  get(endPoint: string, options?: ListOptions): Observable<ListModel> {
    const params = this.buildListParams(options);
    return this.authHttp.get(endPoint, {params: params}).map((response: Response) => {
      return this.extractResponse(response);
    }).catch(this.handleError);
  }

  getList(endPoint: string, options?: ListOptions): Observable<ListModel> {
    const params = this.buildListParams(options);
    return this.authHttp.get(endPoint, {params: params}).map((response: Response) => {
      const body = this.extractResponse(response);
      const total = body.total;
      const results = body._embedded ? body._embedded.docs : body.docs;
      return new ListModel(results, total);
    }).catch(this.handleError);
  }

  search(endPoint: string, text: string, limit = 10, searchField: string = 'name'): Observable<any> {
    if (text === '') {
      return Observable.of([]);
    }
    const data = {
      filter: {
        logic: 'and',
        filters: [{
          'field': searchField,
          'operator': 'contains',
          'value': text
        }],
      },
      pageSize: limit,
      skip: 0
    };
    return this.getList(endPoint, data).map((response: ListModel) => response.data);
  };

  create(endPoint, model: Object): Observable<Object> {
    return this.authHttp.post(endPoint, model).map((response: Response) => {
      return this.extractResponse(response);
    }).catch(this.handleError);
  }

  update(endPoint, model: Object): Observable<Object> {
    return this.authHttp.put(endPoint, this.cleanModel(model)).map((response: Response) => {
      return this.extractResponse(response);
    }).catch(this.handleError);
  }

  remove(endPoint): Observable<Object> {
    return this.authHttp.delete(endPoint).map((response: Response) => {
      return this.extractResponse(response);
    }).catch(this.handleError);
  }

  public cleanModel(model: any): Object {
    delete model._links;
    delete model._id;
    delete model.createdAt;
    delete model.updatedAt;
    delete model.__v;
    return model;
  }

  extractResponse(response: Response): any {
    return response.json() || {};
  }

  handleError(err: any) {
    console.log('sever error:', err);
    return Observable.throw(err || 'backend server error');
  }

  buildListParams(options?: ListOptions): Object {
    if (!options) {
      options = new ListOptions();
      options.skip = 0;
      options.pageSize = 50;
      options.sort = [];
      options.filter = [];
    }
    return {
      skip: options.skip + '',
      pageSize: options.pageSize + '',
      sort: JSON.stringify(options.sort),
      filter: JSON.stringify(options.filter)
    };
  }
}
