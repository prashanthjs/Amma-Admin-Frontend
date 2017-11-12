import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppFormMessagesComponent} from '../../../shared/components/app.form.messages.component';
import {BsModalRef} from 'ngx-bootstrap';
import {AppForm, AppFormFactory} from '../../../shared/services/app.form.factory';
import {UserGroupDataService} from '../../services/user.group.data.service';
import {ListModel} from '../../../shared/models/list.model';
import {AuthService} from '../../../auth/services/auth.service';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';

@Component({
  selector: 'app-user-group-form-modal',
  templateUrl: './user.group.form.modal.template.html'
})
export class UserGroupFormModalComponent implements OnInit, OnDestroy {

  privileges: {};
  privilegeGroups = [];

  @ViewChild(AppFormMessagesComponent) protected formMessages: AppFormMessagesComponent;
  formService: AppForm;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              formFactory: AppFormFactory,
              private dataService: UserGroupDataService,
              private authService: AuthService) {
    this.formService = formFactory.get(
      (id: string) => this.dataService.getUserGroupById(id),
      (model: Object, id: string) => this.dataService
        .saveUserGroup(model, id)
        .flatMap((res: any) => {
          if (this.formService.result && this.authService.user && this.authService.user['userGroup'] === this.formService.result['name']) {
            return this.authService.loadPrivileges().map(() => res);
          }
          return ArrayObservable.of(res);
        })
    );
  }

  ngOnInit() {
    this.formService.formMessages = this.formMessages;
    this.formService.form = this.formBuilder.group({
      title: ['', Validators.required],
      privileges: [],
      isActive: [true, Validators.required],
    });

    this.privileges = {};
    this.privilegeGroups = [];
    this.dataService.getPrivileges().subscribe((result: ListModel) => {
      const privileges = result.data;
      if (privileges && privileges.length) {
        for (let i = 0; i < privileges.length; i++) {
          const group = privileges[i].group;
          if (!this.privileges.hasOwnProperty(group)) {
            this.privileges[group] = [];
            this.privilegeGroups.push(group);
          }
          this.privileges[group].push(privileges[i]);
        }
      }
    });

    this.formService.onInit();
  }

  ngOnDestroy() {
    this.formService.onDestory();
  }

  privilegeChanged(privilege: string, event: any): void {
    const formControl = this.formService.form.get('privileges');
    const values = formControl.value || [];
    if (event.target.checked) {
      if (values.indexOf(privilege) < 0) {
        values.push(privilege);
      }
    } else {
      const index = values.indexOf(privilege);
      if (index > -1) {
        values.splice(index, 1);
      }
    }
    formControl.setValue(values);
  }

  selectAll() {
    const select = [];
    this.privilegeGroups.forEach((group: string) => {
      for (let i = 0; i < this.privileges[group].length; i++) {
        select.push(this.privileges[group][i]['_id']);
      }
    });
    this.formService.form.get('privileges').setValue(select);
  }

  unselectedAll() {
    this.formService.form.get('privileges').setValue([]);
  }

  set id(id: string) {
    this.formService.id = id;
    this.formService.init();
  }
}
