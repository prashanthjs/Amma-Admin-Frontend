import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';
import {AppConfigService} from '../../../../../shared/services/app.config.service';
import {ShippingStatusDataService} from '../../../../../shipping-status/services/shipping.status.data.service';

@Component({
  selector: 'app-order-form-shipping-modal',
  templateUrl: './order.form.shipping.modal.template.html'
})
export class OrderFormShippingModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;
  private shippingId: number = null;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private shippingStatusDataService: ShippingStatusDataService,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrder(model, id),
    );

    this.formService.transferModel = (result: any): Object => {
      ObjectPath.ensureExists(this.formService.result, 'shipping', []);
      ObjectPath.ensureExists(result, 'shipping', []);
      if (this.shippingId === null) {
        this.shippingId = result['shipping'].length;
      }
      return this.getItem(result);
    };

    this.formService.transferSubmitModel = (model: any): Object => {
      const mainModel = this.formService.result;
      model = Object.assign(this.getItem(mainModel), model);
      ObjectPath.set(mainModel, ['shipping', this.shippingId], model);
      return mainModel;
    };
  }

  getItem(mainModel): Object {
    const item = this.shippingId !== null ? ObjectPath.get(mainModel, ['shipping', this.shippingId], {}) : {};
    item['createdAt'] = item['createdAt'] ? new Date(item['createdAt']) : null;
    return item;
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      name: '',
      trackingNumber: '',
      notes: this.formBuilder.group({
        customer: '',
        staff: ''
      }),
      createdAt: ['', [Validators.required]],
      shippingStatus: [null, Validators.required]
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

  searchShippingStatuses = (text) => this.shippingStatusDataService.searchShippingStatuses(text);
}
