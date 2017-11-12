import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ListOptions} from '../../../shared/models/list.options';
import {PaymentMethodDataService} from '../../services/payment.method.data.service';
import {PaymentMethodFormModalComponent} from '../form/payment.method.form.modal.component';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment.method.list.template.html'
})
export class PaymentMethodListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: PaymentMethodDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getPaymentMethods(options));
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
    const bsModalRef = this.modalService.show(PaymentMethodFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removePaymentMethod(id).subscribe(() => this.gridService.init());
  }
}
