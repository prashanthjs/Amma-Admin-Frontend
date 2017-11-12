import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';

@Component({
  selector: 'app-order-form-address-shipping-modal',
  templateUrl: './order.form.address.shipping.modal.template.html'
})
export class OrderFormAddressShippingModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrder(model, id),
    );

    this.formService.transferModel = (result: any): Object => {
      return ObjectPath.get(result, 'address.shipping', {});
    };

    this.formService.transferSubmitModel = (result: any): Object => {
      ObjectPath.set(this.formService.result, 'address.shipping', result);
      return this.formService.result;
    }
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: '',
      town: ['', Validators.required],
      county: '',
      country: ['United Kingdom', <any>Validators.required],
      postcode: ['', Validators.required]
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
}
