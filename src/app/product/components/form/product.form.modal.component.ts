import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {ProductDataService} from '../../services/product.data.service';
import {CustomValidators} from 'ng2-validation';
import {AppConfigService} from '../../../shared/services/app.config.service';
import {CategoryDataService} from '../../../category/services/category.data.service';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product.form.modal.template.html'
})
export class ProductFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              public configService: AppConfigService,
              private categoryDataService: CategoryDataService,
              private dataService: ProductDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getProductById(id),
      (model: Object, id: string) => this.dataService.saveProduct(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      sku: ['', Validators.required],
      categories: [[], Validators.required],
      price: this.formBuilder.group({
        sell: [null, Validators.required],
        cost: [null, Validators.required],
        list: [null, Validators.required]
      }),
      shortDescription: [''],
      description: [''],
      imgToken: ['', Validators.required],
      inventory: this.formBuilder.group({
        stock: [null, [Validators.required, CustomValidators.number]],
        quantity: this.formBuilder.group({
          min: [1, [Validators.required, CustomValidators.number]],
          max: [1, [Validators.required, CustomValidators.number]],
          step: [1, [Validators.required, CustomValidators.number]]
        })
      }),
      shipping: this.formBuilder.group({
        weight: [null, [Validators.required, CustomValidators.number]],
        box: this.formBuilder.group({
          length: [null, [Validators.required, CustomValidators.number]],
          width: [null, [Validators.required, CustomValidators.number]],
          height: [null, [Validators.required, CustomValidators.number]]
        })
      }),
      tags: [[]],
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

  searchCategories = (text) => {
    return this.categoryDataService.searchCategories(text);
  };
}
