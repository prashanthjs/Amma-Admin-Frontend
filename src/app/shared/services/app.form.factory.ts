import {FormGroup} from '@angular/forms';
import {AppFormMessagesComponent} from '../components/app.form.messages.component';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

export class AppForm {
  subscription: Subscription[] = [];
  id: string;
  result: Object = {};
  formMessages: AppFormMessagesComponent;
  form: FormGroup;
  forceLoadOnNonId = false;

  constructor(public loadFunc: (id: string) => any, public saveFunc: (value: Object, id: string) => any) {
  }

  onInit() {
  }

  onDestory() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    })
  }

  init() {
    this.load();
  }

  load() {
    this.result = null;
    if (this.id || this.forceLoadOnNonId) {
      this.loadFunc(this.id).subscribe(
        (result) => {
          this.result = result;
          this.form.reset();
          this.form.patchValue(this.transferModel(result));
        },
        (error) => this.formMessages.showResourceErrorMessage(error)
      );
    }
  }

  transferModel = (result: Object): Object => {
    return result || null;
  };

  submit($event?: any) {
    if (this.form.valid) {
      const value = this.transferSubmitModel(this.form.value);
      this.saveFunc(value, this.id)
        .subscribe((result: any) => {
          this.id = result._id;
          this.form.enable();
          this.afterSubmit();
          this.load();
          this.formMessages.showSuccessMessage();
        }, (error) => {
          this.form.enable();
          this.formMessages.showFormSaveErrorMessage(error);
        });
      this.form.disable();
    }
    if ($event) {
      $event.preventDefault();
    }
  }

  transferSubmitModel = (result: Object): Object => {
    return result;
  };

  afterSubmit = () => {
  };
}


@Injectable()
export class AppFormFactory {

  get(loadFunc: (id: string) => any,
      saveFunc: (value: Object, id: string) => any): AppForm {
    return new AppForm(loadFunc, saveFunc);
  }
}
