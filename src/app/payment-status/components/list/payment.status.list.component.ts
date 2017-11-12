import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ListOptions} from '../../../shared/models/list.options';
import {PaymentStatusDataService} from '../../services/payment.status.data.service';
import {PaymentStatusFormModalComponent} from '../form/payment.status.form.modal.component';

@Component({
  selector: 'app-payment-status-list',
  templateUrl: './payment.status.list.template.html'
})
export class PaymentStatusListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: PaymentStatusDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getPaymentStatuses(options));
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
    const bsModalRef = this.modalService.show(PaymentStatusFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removePaymentStatus(id).subscribe(() => this.gridService.init());
  }
}
