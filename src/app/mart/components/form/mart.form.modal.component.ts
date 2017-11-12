import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {MartDataService} from '../../services/mart.data.service';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-mart-form-modal',
  templateUrl: './mart.form.modal.template.html'
})
export class MartFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: MartDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getMartById(id),
      (model: Object, id: string) => this.dataService.saveMart(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email]],
      website: ['', CustomValidators.url],
      imgToken: ['', Validators.required],
      contactNumber: ['', Validators.required],
      isActive: false,
      address: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: '',
        town: ['', Validators.required],
        county: '',
        country: ['United Kingdom', Validators.required],
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
}
