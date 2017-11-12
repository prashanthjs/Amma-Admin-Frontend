import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {BsModalRef} from 'ngx-bootstrap';
import {OrderDataService} from '../../services/order.data.service';
import {MartDataService} from '../../../mart/services/mart.data.service';

@Component({
  selector: 'app-order-mart-form-modal',
  templateUrl: './order.mart.form.modal.template.html'
})
export class OrderMartFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private martDataService: MartDataService,
              private dataService: OrderDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.updateOrderMart(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      mart: ['', Validators.required]
    });
    this.formService.onInit();
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }

  searchMart = (text) => {
    return this.martDataService.searchMarts(text);
  };

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }
}
