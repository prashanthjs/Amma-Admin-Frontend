import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {
  AppFileUploadService, AppFileUploadServiceFactory,
  IFileResponse
} from '../../../shared/services/app.file.upload.service';
import {Subscription} from 'rxjs/Subscription';
import {AppEventBus} from '../../../shared/services/app.event.bus';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {UserMyFormModalComponent} from '../../../user/components/form/my-profile/user.my.form.modal.component';
import {
  UserMyChangePasswordFormModalComponent
} from '../../../user/components/form/my-profile/user.my.change.password.form.modal.component';
import {UserMyViewModalComponent} from '../../../user/components/view/my-profile/user.my.view.modal.component';

@Component({
  selector: 'app-top-navbar-navigation',
  templateUrl: 'topnavbar.navigation.template.html'
})
export class TopnavbarNavigationComponent implements OnInit, OnDestroy {
  currentUser: any;
  profilePic: string;

  private subscriptions: Subscription[] = [];
  mart = {
    model: [],
    options: []
  };

  fileService: AppFileUploadService;


  constructor(private modalService: BsModalService,
              private router: Router,
              private authService: AuthService,
              private eventBus: AppEventBus,
              fileFactory: AppFileUploadServiceFactory) {

    this.fileService = fileFactory.get();
    this.fileService.setType('user');
  }

  ngOnInit() {
    this.init();
    this.subscriptions.push(this.authService.userChanged$.subscribe(() => this.init()));
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => this.authService.loadUser().subscribe())
    );
  }

  init() {
    if (this.authService.user) {
      if (this.authService.user['mart'] && this.authService.user['mart'].length) {
        this.authService.user['mart'].forEach((value) => {
          this.mart.options.push({id: value, name: value});
        });
        this.mart.model = this.authService.getOption('mart');
      }
      this.loadProfilePic(this.authService.user['imgToken']);
    }
  }

  loadProfilePic(fileToken) {
    this.fileService.setToken(fileToken);
    this.fileService.getList().subscribe((results: IFileResponse[]) => {
      if (results && results.length) {
        this.profilePic = results[0].url;
      } else {
        this.profilePic = null;
      }
    });
  }

  onChange() {
    this.authService.setOption('mart', this.mart.model);
    this.eventBus.triggerPageRedraw();
  }


  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  editProfile(): void {
    this.modalService.show(UserMyFormModalComponent, MODAL_CONFIG);
  }

  viewProfile(): void {
    this.modalService.show(UserMyViewModalComponent, MODAL_CONFIG);
  }

  changePassword(): void {
    this.modalService.show(UserMyChangePasswordFormModalComponent, MODAL_CONFIG);
  }
}
