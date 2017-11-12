import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {UserDataService} from '../../services/user.data.service';
import {CustomValidators} from 'ng2-validation';
import {AppConfigService} from '../../../shared/services/app.config.service';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user.form.modal.template.html'
})
export class UserFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private dataService: UserDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getUserById(id),
      (model: Object, id: string) => this.dataService.saveUser(model, id),
    );

    this.formService.transferModel = (result: Object): Object => {
      if (result['dob']) {
        result['dob'] = new Date(result['dob']);
      }
      this.modifyForm();
      return result;
    };
    this.formService.transferSubmitModel = (result: Object): Object => {
      delete result['rePassword'];
      if (this.formService.id) {
        delete result['password'];
      }
      return result;
    };
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      password: '',
      rePassword: '',
      email: ['', [Validators.required, CustomValidators.email]],
      contactNumber: ['', Validators.required],
      dob: [new Date(), [Validators.required]],
      gender: ['male', Validators.required],
      isActive: [true, Validators.required],
      imgToken: ['', Validators.required],
      address: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: '',
        town: ['', Validators.required],
        county: '',
        country: ['United Kingdom', <any>Validators.required],
        postcode: ['', Validators.required]
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

  private modifyForm() {
    const password = this.formService.form.get('password');
    const rePassword = this.formService.form.get('rePassword');
    if (this.formService.id) {
      password.clearValidators();
      rePassword.clearValidators();
    } else {
      password.setValidators([Validators.required]);
      rePassword.setValidators([Validators.required, CustomValidators.equalTo(password)]);
    }
    password.updateValueAndValidity();
    rePassword.updateValueAndValidity();
  }
}
