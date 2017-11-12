import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ListOptions} from '../../../shared/models/list.options';
import {UserGroupDataService} from '../../services/user.group.data.service';
import {UserGroupFormModalComponent} from '../form/user.group.form.modal.component';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user.group.list.template.html'
})
export class UserGroupListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: UserGroupDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getUserGroups(options));
  }

  ngOnInit() {
    const subscriber = this.modalService.onHide.subscribe(() => {
      this.gridService.init();
      return true;
    });
    this.gridService.subscription.push(subscriber);
    this.gridService.onInit();
  }

  ngOnDestroy() {
    this.gridService.onDestory();
  }

  open(id: string = null): void {
    const bsModalRef = this.modalService.show(UserGroupFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeUserGroup(id).subscribe(() => this.gridService.init());
  }
}
