import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {CategoryDataService} from '../../services/category.data.service';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category.form.modal.template.html'
})
export class CategoryFormModalComponent implements OnInit, OnDestroy {

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: CategoryDataService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getCategoryById(id),
      (model: Object, id: string) => this.dataService.saveCategory(model, id),
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      parent: '',
      description: '',
      isActive: [true, Validators.required],
      imgToken: ['', Validators.required]
    });
    this.formService.onInit();
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }

  searchCategory = (text) => {
    return this.dataService.searchCategories(text);
  };

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }
}
