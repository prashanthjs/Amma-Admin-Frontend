import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UserFormModalComponent} from './components/form/user.form.modal.component';
import {UserViewComponent} from './components/view/user.view.component';
import {UserListComponent} from './components/list/user.list.component';
import {UserDataService} from './services/user.data.service';
import {UserMartFormModalComponent} from './components/form/user.mart.form.modal.component';
import {UserChangePasswordFormModalComponent} from './components/form/user.change.password.form.modal.component';
import {UserMyFormModalComponent} from './components/form/my-profile/user.my.form.modal.component';
import {UserMyChangePasswordFormModalComponent} from './components/form/my-profile/user.my.change.password.form.modal.component';
import {UserMyViewModalComponent} from './components/view/my-profile/user.my.view.modal.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormModalComponent,
    UserViewComponent,
    UserMartFormModalComponent,
    UserChangePasswordFormModalComponent,
    UserMyFormModalComponent,
    UserMyChangePasswordFormModalComponent,
    UserMyViewModalComponent
  ],
  imports: [SharedModule],
  exports: [UserFormModalComponent, UserMyFormModalComponent, UserMyChangePasswordFormModalComponent, UserMyViewModalComponent],
  providers: [UserDataService],
  entryComponents: [
    UserFormModalComponent,
    UserMartFormModalComponent,
    UserChangePasswordFormModalComponent,
    UserMyFormModalComponent,
    UserMyChangePasswordFormModalComponent,
    UserMyViewModalComponent
  ]
})
export class UserModule {
}
