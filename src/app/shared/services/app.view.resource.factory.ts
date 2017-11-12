import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppFileUploadService, AppFileUploadServiceFactory, IFileResponse} from './app.file.upload.service';
import {AppEventBus} from './app.event.bus';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {AppPageErrorHandler} from './app.page.error.handler';

export class AppViewResource {
  subscription: Subscription[] = [];
  id: string;
  model: any;
  files: IFileResponse[] = [];
  fileToken = 'imgToken';
  fileType = null;

  constructor(public loadFunc: (id: string) => any,
              public fileService: AppFileUploadService,
              private pageErrorHandler: AppPageErrorHandler,
              public eventBus: AppEventBus) {
  }

  onInit() {
    this.subscription.push(this.eventBus.pageRedraw$.subscribe(() => this.init()));
    this.subscription.push()
  }

  onDestory() {
    this.subscription.forEach((value) => {
      value.unsubscribe();
    })
  }

  init() {
    if (this.id) {
      this.loadFunc(this.id).subscribe((response) => {
        this.model = response;
        this.loadFiles();
      }, (error) => this.pageErrorHandler.handleError(error));
    }
  }

  loadFiles() {
    this.files = [];
    if (this.fileType) {
      this.fileService.setType(this.fileType);
      this.fileService.setToken(this.model[this.fileToken]);
      this.fileService.getList().subscribe((results: IFileResponse[]) => {
        this.files = results;
      });
    }
  }
}


@Injectable()
export class AppViewResourceFactory {

  constructor(private fileFactory: AppFileUploadServiceFactory,
              private eventBus: AppEventBus,
              private pageErrorHandler: AppPageErrorHandler) {
  }

  get(loadFunc: (listOptions) => any): AppViewResource {
    return new AppViewResource(loadFunc, this.fileFactory.get(), this.pageErrorHandler, this.eventBus);
  }
}
