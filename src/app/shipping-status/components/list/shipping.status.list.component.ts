import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ListOptions} from '../../../shared/models/list.options';
import {ShippingStatusDataService} from '../../services/shipping.status.data.service';
import {ShippingStatusFormModalComponent} from '../form/shipping.status.form.modal.component';

@Component({
  selector: 'app-shipping-status-list',
  templateUrl: './shipping.status.list.template.html'
})
export class ShippingStatusListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: ShippingStatusDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getShippingStatuses(options));
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
    const bsModalRef = this.modalService.show(ShippingStatusFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeShippingStatus(id).subscribe(() => this.gridService.init());
  }
}
