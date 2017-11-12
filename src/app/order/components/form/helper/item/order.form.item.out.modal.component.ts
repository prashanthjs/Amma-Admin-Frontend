import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';
import {AppConfigService} from '../../../../../shared/services/app.config.service';

@Component({
  selector: 'app-order-form-item-out-modal',
  templateUrl: './order.form.item.out.modal.template.html'
})
export class OrderFormItemOutModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;
  itemId: number;
  outItemId: number = null;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrder(model, id),
    );

    this.formService.transferModel = (result: any): Object => {
      ObjectPath.ensureExists(this.formService.result, ['inItems', this.itemId, 'outItems'], []);
      ObjectPath.ensureExists(result, ['inItems', this.itemId, 'outItems'], []);
      if (this.outItemId === null) {
        this.outItemId = result['inItems'][this.itemId]['outItems'].length;
      }
      return this.getItem(result);
    };

    this.formService.transferSubmitModel = (model: any): Object => {
      const mainModel = this.formService.result;
      model = Object.assign(this.getItem(mainModel), model);
      ObjectPath.set(mainModel, ['inItems', this.itemId, 'outItems', this.outItemId], model);
      return mainModel;
    };
  }

  getItem(mainModel): Object {
    return this.outItemId !== null ? ObjectPath.get(mainModel, ['inItems', this.itemId, 'outItems', this.outItemId], {}) : {};
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
      })
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
