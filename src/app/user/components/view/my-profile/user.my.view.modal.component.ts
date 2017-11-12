import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {UserDataService} from '../../../services/user.data.service';
import {
  AppFileUploadService, AppFileUploadServiceFactory,
  IFileResponse
} from '../../../../shared/services/app.file.upload.service';

@Component({
  selector: 'app-user-my-view-modal',
  templateUrl: './user.my.view.modal.template.html'
})
export class UserMyViewModalComponent implements OnInit {

  model: Object;
  fileService: AppFileUploadService;
  files: IFileResponse[] = [];

  constructor(public modalRef: BsModalRef,
              appFileUploadServiceFactory: AppFileUploadServiceFactory,
              private dataService: UserDataService) {
    this.fileService = appFileUploadServiceFactory.get();
    this.fileService.setType('user');
  }

  ngOnInit() {
    this.dataService.getMyProfile().subscribe((result) => {
      this.model = result;
      this.fileService.setToken(this.model['imgToken']);
      this.fileService.getList().subscribe((results: IFileResponse[]) => {
        this.files = results;
      });
    });
  }
}
