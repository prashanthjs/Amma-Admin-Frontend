import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../../shared/services/app.form.factory';
import {UserDataService} from '../../../services/user.data.service';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-my-user-form-modal',
  templateUrl: './user.my.form.modal.template.html'
})
export class UserMyFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: UserDataService) {
    this.formService = formFactory.get(
      () => this.dataService.getMyProfile(),
      (model: Object) => this.dataService.updateMyUser(model),
    );
    this.formService.forceLoadOnNonId = true;
    this.formService.transferModel = (result: Object): Object => {
      if (result['dob']) {
        result['dob'] = new Date(result['dob']);
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
    this.formService.init();
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }
}
