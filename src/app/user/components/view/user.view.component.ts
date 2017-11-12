import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserFormModalComponent} from '../form/user.form.modal.component';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {UserDataService} from '../../services/user.data.service';
import {AppViewResource, AppViewResourceFactory} from '../../../shared/services/app.view.resource.factory';
import {AppConfigService} from '../../../shared/services/app.config.service';
import {UserMartFormModalComponent} from '../form/user.mart.form.modal.component';
import {UserChangePasswordFormModalComponent} from '../form/user.change.password.form.modal.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user.view.template.html'
})
export class UserViewComponent implements OnInit, OnDestroy {

  viewResource: AppViewResource;

  constructor(public dataService: UserDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              viewResourceFactory: AppViewResourceFactory,
              private router: Router) {
    this.viewResource = viewResourceFactory.get(
      (id: string) => this.dataService.getUserById(id)
    );
  }

  ngOnInit() {
    const subscriber = this.route.params.subscribe((params: any) => {
      this.viewResource.fileType = 'user';
      this.viewResource.id = params['id'];
      this.viewResource.init();
    });
    const subscriber1 = this.modalService.onHide.subscribe(() => {
      this.viewResource.init();
    });

    this.viewResource.subscription.push(subscriber);
    this.viewResource.subscription.push(subscriber1);
    this.viewResource.onInit();
  }

  ngOnDestroy() {
    this.viewResource.onDestory();
  }

  remove(): void {
    this.dataService.removeUser(this.viewResource.id).subscribe(() => this.router.navigate(['user/list']));
  }

  open(): void {
    const bsModalRef = this.modalService.show(UserFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openMart(): void {
    const bsModalRef = this.modalService.show(UserMartFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  changePassword(): void {
    const bsModalRef = this.modalService.show(UserChangePasswordFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }
}
