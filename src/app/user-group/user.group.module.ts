import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {UserGroupListComponent} from './components/list/user.group.list.component';
import {UserGroupFormModalComponent} from './components/form/user.group.form.modal.component';
import {UserGroupDataService} from './services/user.group.data.service';

@NgModule({
    declarations: [
      UserGroupListComponent,
      UserGroupFormModalComponent
    ],
    imports: [SharedModule],
    exports: [UserGroupFormModalComponent],
    providers: [UserGroupDataService],
    entryComponents: [
      UserGroupFormModalComponent
    ]
})
export class UserGroupModule {
}
