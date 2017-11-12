import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';
import {CustomValidators} from 'ng2-validation';
import {ProductDataService} from '../../../../../product/services/product.data.service';
import {AppConfigService} from '../../../../../shared/services/app.config.service';

@Component({
  selector: 'app-order-form-item-modal',
  templateUrl: './order.form.item.modal.template.html'
})
export class OrderFormItemModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;
  private _itemId: number = null;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private productDataService: ProductDataService,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrder(model, id),
    );

    this.formService.transferModel = (result: any): Object => {
      ObjectPath.ensureExists(this.formService.result, 'inItems', []);
      ObjectPath.ensureExists(result, 'inItems', []);
      if (this.itemId === null) {
        this.itemId = result['inItems'].length;
      }
      return this.getItem(result);
    };

    this.formService.transferSubmitModel = (model: any): Object => {
      const mainModel = this.formService.result;
      model = Object.assign(this.getItem(mainModel), model);
      ObjectPath.set(mainModel, ['inItems', this.itemId], model);
      return mainModel;
    };
  }

  getItem(mainModel): Object {
    return this.itemId !== null ? ObjectPath.get(mainModel, ['inItems', this.itemId], {}) : {};
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      name: '',
      title: ['', Validators.required],
      price: this.formBuilder.group({
        sell: [null, Validators.required],
        cost: [null, Validators.required],
        list: [null, Validators.required]
      }),
      qty: ['', [Validators.required, CustomValidators.number]],
      shipping: this.formBuilder.group({
        weight: [null, [Validators.required, CustomValidators.number]],
        box: this.formBuilder.group({
          length: [null, [Validators.required, CustomValidators.number]],
          width: [null, [Validators.required, CustomValidators.number]],
          height: [null, [Validators.required, CustomValidators.number]]
        })
      })
    });
    this.registerProductChangeSubscribe();
    this.formService.onInit();
  }

  registerProductChangeSubscribe() {
    const sub = this.formService.form.get('name').valueChanges.subscribe((value) => {
      if (value) {
        this.productDataService.getProductById(value).subscribe((result: any) => {
          this.formService.form.get('title').setValue(result.title);
          this.formService.form.get('price').patchValue(result.price);
          this.formService.form.get('shipping').patchValue(result.shipping);
        });
      }
    });
    this.formService.subscription.push(sub);
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }

  set itemId(itemId: number) {
    this._itemId = itemId;
  }

  get itemId(): number {
    return this._itemId;
  }

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }

  searchProducts = (text) => this.productDataService.searchProducts(text);
}
