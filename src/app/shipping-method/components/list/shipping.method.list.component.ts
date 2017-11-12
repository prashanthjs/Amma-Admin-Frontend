import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ListOptions} from '../../../shared/models/list.options';
import {ShippingMethodDataService} from '../../services/shipping.method.data.service';
import {ShippingMethodFormModalComponent} from '../form/shipping.method.form.modal.component';

@Component({
  selector: 'app-shipping-method-list',
  templateUrl: './shipping.method.list.template.html'
})
export class ShippingMethodListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: ShippingMethodDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getShippingMethods(options));
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
    const bsModalRef = this.modalService.show(ShippingMethodFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeShippingMethod(id).subscribe(() => this.gridService.init());
  }
}
