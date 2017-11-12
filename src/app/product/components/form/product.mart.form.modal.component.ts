import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {BsModalRef} from 'ngx-bootstrap';
import {ProductDataService} from '../../services/product.data.service';
import {MartDataService} from '../../../mart/services/mart.data.service';

@Component({
  selector: 'app-product-mart-form-modal',
  templateUrl: './product.mart.form.modal.template.html'
})
export class ProductMartFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private martDataService: MartDataService,
              private dataService: ProductDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getProductById(id),
      (model: Object, id: string) => this.dataService.updateProductMart(model, id),
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
