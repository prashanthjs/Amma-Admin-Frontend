import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';
import {AppConfigService} from '../../../../../shared/services/app.config.service';
import {PaymentStatusDataService} from '../../../../../payment-status/services/payment.status.data.service';

@Component({
  selector: 'app-order-form-payment-modal',
  templateUrl: './order.form.payment.modal.template.html'
})
export class OrderFormPaymentModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;
  private paymentId: number = null;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private paymentStatusDataService: PaymentStatusDataService,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrder(model, id),
    );

    this.formService.transferModel = (result: any): Object => {
      ObjectPath.ensureExists(this.formService.result, 'payment', []);
      ObjectPath.ensureExists(result, 'payment', []);
      if (this.paymentId === null) {
        this.paymentId = result['payment'].length;
      }
      return this.getItem(result);
    };

    this.formService.transferSubmitModel = (model: any): Object => {
      const mainModel = this.formService.result;
      model = Object.assign(this.getItem(mainModel), model);
      ObjectPath.set(mainModel, ['payment', this.paymentId], model);
      return mainModel;
    };
  }

  getItem(mainModel): Object {
    const item = this.paymentId !== null ? ObjectPath.get(mainModel, ['payment', this.paymentId], {}) : {};
    item['createdAt'] = item['createdAt'] ? new Date(item['createdAt']) : null;
    return item;
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      name: '',
      reference: '',
      amount: [null, Validators.required],
      notes: this.formBuilder.group({
        customer: '',
        staff: ''
      }),
      createdAt: ['', [Validators.required]],
      paymentStatus: [null, Validators.required]
    });
    this.formService.onInit();
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }

  searchPaymentStatuses = (text) => this.paymentStatusDataService.searchPaymentStatuses(text);
}
