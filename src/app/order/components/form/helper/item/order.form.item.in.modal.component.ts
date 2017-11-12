import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../../shared/services/app.form.factory';
import {OrderDataService} from '../../../../services/order.data.service';
import * as ObjectPath from 'object-path';
import {AppConfigService} from '../../../../../shared/services/app.config.service';

@Component({
  selector: 'app-order-form-item-in-modal',
  templateUrl: './order.form.item.in.modal.template.html'
})
export class OrderFormItemInModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;
  itemId: number;
  inItemId: number = null;

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
      ObjectPath.ensureExists(this.formService.result, ['inItems', this.itemId, 'inItems'], []);
      ObjectPath.ensureExists(result, ['inItems', this.itemId, 'inItems'], []);
      if (this.inItemId === null) {
        this.inItemId = result['inItems'][this.itemId]['inItems'].length;
      }
      return this.getItem(result);
    };

    this.formService.transferSubmitModel = (model: any): Object => {
      const mainModel = this.formService.result;
      model = Object.assign(this.getItem(mainModel), model);
      ObjectPath.set(mainModel, ['inItems', this.itemId, 'inItems', this.inItemId], model);
      return mainModel;
    };
  }

  getItem(mainModel): Object {
    return this.inItemId !== null ? ObjectPath.get(mainModel, ['inItems', this.itemId, 'inItems', this.inItemId], {}) : {};
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
