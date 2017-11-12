import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {OrderDataService} from '../../services/order.data.service';
import {CustomValidators} from 'ng2-validation';
import {AppConfigService} from '../../../shared/services/app.config.service';
import {CategoryDataService} from '../../../category/services/category.data.service';
import {UserDataService} from '../../../user/services/user.data.service';
import {OrderStatusDataService} from '../../../order-status/services/order.status.data.service';

@Component({
  selector: 'app-order-form-modal',
  templateUrl: './order.form.modal.template.html'
})
export class OrderFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: OrderDataService,
              private orderStatusDataService: OrderStatusDataService,
              private userDataService: UserDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getOrderById(id),
      (model: Object, id: string) => this.dataService.saveOrder(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: ['', Validators.required],
        middleName: '',
        lastName: ['', Validators.required],
        email: ['', [Validators.required, CustomValidators.email]],
        contactNumber: '',
        username: ''
      }),
      orderStatus: ['', Validators.required],
      referenceNumber: ['', Validators.required],
    });

    this.registerOnUserChangeSubscriber();
    this.formService.onInit();
  }

  registerOnUserChangeSubscriber() {
    const userForm = this.formService.form.get('user');
    const sub = userForm.get('username').valueChanges.subscribe((value) => {
      if (value) {
        this.userDataService.getUserById(value).subscribe((result: any) => {
          userForm.get('firstName').setValue(result.firstName);
          userForm.get('middleName').setValue(result.middleName);
          userForm.get('lastName').setValue(result.lastName);
          userForm.get('email').setValue(result.email);
          userForm.get('contactNumber').setValue(result.contactNumber);
        });
      }
    });
    this.formService.subscription.push(sub);
  }

  searchUsers = (text) => {
    return this.userDataService.searchUsers(text);
  }

  searchOrderStatus = text => this.orderStatusDataService.searchOrderStatuses(text);

  ngOnDestroy() {
    this.formService.onDestory();
  }

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }
}
