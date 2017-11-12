import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {BsModalRef} from 'ngx-bootstrap';
import {UserDataService} from '../../services/user.data.service';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-user-change-password-form-modal',
  templateUrl: './user.change.password.form.modal.template.html'
})
export class UserChangePasswordFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: UserDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getUserById(id),
      (model: Object, id: string) => this.dataService.changePassword(model, id),
    );

    this.formService.transferModel = (result: Object): Object => {
      delete result['password'];
      return result;
    }

    this.formService.transferSubmitModel = (result: Object): Object => {
      delete result['rePassword'];
      return result;
    }
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      rePassword: '',
    });
    const password = this.formService.form.get('password');
    const rePassword = this.formService.form.get('rePassword');
    rePassword.setValidators([Validators.required, CustomValidators.equalTo(password)]);
    rePassword.updateValueAndValidity();
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
