import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderFormModalComponent} from '../form/order.form.modal.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {OrderDataService} from '../../services/order.data.service';
import {ListOptions} from '../../../shared/models/list.options';

@Component({
  selector: 'app-order-list',
  templateUrl: './order.list.template.html'
})
export class OrderListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: OrderDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getOrders(options));
  }

  ngOnInit() {
    const subscriber = this.modalService.onHide.subscribe(() => {
      this.gridService.init();
      return true;
    });
    this.gridService.subscription.push(subscriber);
    this.gridService.onInit();
  }

  ngOnDestroy() {
    this.gridService.onDestory();
  }

  open(id: string = null): void {
    const bsModalRef = this.modalService.show(OrderFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeOrder(id).subscribe(() => this.gridService.init());
  }
}
