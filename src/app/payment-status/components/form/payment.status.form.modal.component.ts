import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {PaymentStatusDataService} from '../../services/payment.status.data.service';
import {AppConfigService} from '../../../shared/services/app.config.service';

@Component({
  selector: 'app-payment-status-form-modal',
  templateUrl: './payment.status.form.modal.template.html'
})
export class PaymentStatusFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: PaymentStatusDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getPaymentStatusById(id),
      (model: Object, id: string) => this.dataService.savePaymentStatus(model, id),
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
