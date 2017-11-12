import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {ShippingMethodDataService} from '../../services/shipping.method.data.service';
import {CustomValidators} from 'ng2-validation';
import * as ObjectPath from 'object-path';
import {AppConfigService} from '../../../shared/services/app.config.service';

@Component({
  selector: 'app-shipping-method-form-modal',
  templateUrl: './shipping.method.form.modal.template.html'
})
export class ShippingMethodFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: ShippingMethodDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getShippingMethodById(id),
      (model: Object, id: string) => this.dataService.saveShippingMethod(model, id),
    );

    this.formService.transferModel = result => this.afterLoad(result);
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      isActive: [true, Validators.required],
      deliveryTime: [null, Validators.required],
      weight: this.formBuilder.group({
        min: [null, [Validators.required, CustomValidators.number]],
        max: [null, [Validators.required, CustomValidators.number]],
      }),
      shippingCharge: this.formBuilder.group({
        totalPrice: this.formBuilder.array([this.initFormElement()]),
        totalWeight: this.formBuilder.array([this.initFormElement()]),
        totalItem: this.formBuilder.array([this.initFormElement()]),
      }),
    });

    this.emptyControl('totalPrice');
    this.emptyControl('totalWeight');
    this.emptyControl('totalItem');

    this.formService.onInit();
  }

  initFormElement() {
    return this.formBuilder.group({
      min: [null, [Validators.required, CustomValidators.number]],
      amount: [null, [Validators.required, CustomValidators.number]],
      type: [null, Validators.required]
    });
  }

  addFormElement(elementName: string) {
    const control = <FormArray>this.formService.form.get('shippingCharge').get(elementName);
    control.push(this.initFormElement());
  }

  removeFormElement(elementName: string, i: number) {
    const control = <FormArray>this.formService.form.get('shippingCharge').get(elementName);
    control.removeAt(i);
  }

  addFormElements(elementName: string, len: number) {
    const control = <FormArray>this.formService.form.get('shippingCharge').get(elementName);
    this.emptyControl(elementName);
    for (let i = 0; i < len; i++) {
      this.addFormElement(elementName);
    }
  }

  emptyControl(elementName: string) {
    const control = <FormArray>this.formService.form.get('shippingCharge').get(elementName);
    for (let i = 0; i < control.length; i++) {
      control.removeAt(0);
    }
  }

  afterLoad(result: any) {
    let elementName = 'totalPrice';
    this.emptyControl(elementName);
    let len = ObjectPath.get(result, 'shippingCharge.' + elementName, []).length;
    this.addFormElements(elementName, len);

    elementName = 'totalWeight';
    this.emptyControl(elementName);
    len = ObjectPath.get(result, 'shippingCharge.' + elementName, []).length;
    this.addFormElements(elementName, len);

    elementName = 'totalItem';
    this.emptyControl(elementName);
    len = ObjectPath.get(result, 'shippingCharge.' + elementName, []).length;
    this.addFormElements(elementName, len);

    return result;
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }


  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }
}
