import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {PaymentMethodDataService} from '../../services/payment.method.data.service';
import {CustomValidators} from 'ng2-validation';
import {AppConfigService} from '../../../shared/services/app.config.service';

@Component({
  selector: 'app-payment-method-form-modal',
  templateUrl: './payment.method.form.modal.template.html'
})
export class PaymentMethodFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: PaymentMethodDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getPaymentMethodById(id),
      (model: Object, id: string) => this.dataService.savePaymentMethod(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      surcharge: this.formBuilder.group({
        amount: ['', [Validators.required, CustomValidators.number]],
        type: ['', [Validators.required]]
      }),
      isActive: [true, Validators.required]
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
