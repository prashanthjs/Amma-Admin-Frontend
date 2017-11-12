import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {OrderStatusDataService} from '../../services/order.status.data.service';
import {AppConfigService} from '../../../shared/services/app.config.service';

@Component({
  selector: 'app-order-status-form-modal',
  templateUrl: './order.status.form.modal.template.html'
})
export class OrderStatusFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: OrderStatusDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderStatusById(id),
      (model: Object, id: string) => this.dataService.saveOrderStatus(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      frontendStatus: ['', Validators.required],
      type: ['', Validators.required]
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
