import {Injectable} from '@angular/core';
import {State} from '@progress/kendo-data-query';
import {ListModel} from '../models/list.model';
import {DataStateChangeEvent, GridComponent} from '@progress/kendo-angular-grid';
import {ListOptions} from '../models/list.options';
import {Subscription} from 'rxjs/Subscription';
import {AppEventBus} from './app.event.bus';
import {AppPageErrorHandler} from './app.page.error.handler';

export class AppGrid {
  subscription: Subscription[] = [];
  state: State = {
    skip: 0,
    take: 30
  };
  gridData: ListModel;
  grid: GridComponent;

  constructor(public loadFunc: (listOptions) => any, public eventBus: AppEventBus, private pageErrorHandler: AppPageErrorHandler) {

  }

  onInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.init();
  }

  init() {
    const listOptions = new ListOptions();
    listOptions.skip = this.state.skip;
    listOptions.pageSize = this.state.take;
    listOptions.sort = this.state.sort;
    listOptions.filter = this.state.filter;

    this.loadFunc(listOptions).subscribe((result: ListModel) => {
      this.gridData = result;
    }, (error: any) => this.pageErrorHandler.handleError(error));
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    console.log(this.state);
    this.init();
  }

  onDestory() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    });
  }
}


@Injectable()
export class AppGridFactory {

  constructor(private eventBus: AppEventBus, private pageErrorHandler: AppPageErrorHandler) {

  }

  get(loadFunc: (listOptions) => any): AppGrid {
    return new AppGrid(loadFunc, this.eventBus, this.pageErrorHandler);
  }
}
