import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppFileUploadService, AppFileUploadServiceFactory, IFileResponse} from '../services/app.file.upload.service';
import {FileItem} from 'ng2-file-upload';

const noop = () => {
};

@Component({
  selector: 'app-file-input',
  template: '<input type=\'file\' [uploader] = \'fileService\' ng2FileSelect>',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppFileInputComponent), multi: true}
  ]
})
export class AppFileInputComponent implements ControlValueAccessor, OnChanges {

  imgToken: string;
  propagateChange: (_: any) => void = noop;
  onTouchedCallback: () => void = noop;
  loading = false;
  files: IFileResponse[] = [];
  @Input() type: string;
  fileService: AppFileUploadService;

  constructor(private fileFactory: AppFileUploadServiceFactory) {
    this.fileService = this.fileFactory.get();
    this.fileService.onBeforeUploadItem = (fileItem: FileItem) => {
      this.loading = true;
    };

    this.fileService.onCompleteAll = () => {
      this.loading = false;
      this.loadFiles();
    };
  }

  ngOnChanges(inputs) {
    if (inputs.type) {
      this.fileService.setType(inputs.type.currentValue);
    }
  }

  writeValue(value) {
    if (value) {
      this.imgToken = value;
      this.fileService.setToken(this.imgToken);
      this.loadFiles();
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
    if (!this.imgToken) {
      this.imgToken = this.fileService.generateToken();
      this.propagateChange(this.imgToken);
    }
  }

  registerOnTouched(fn) {
    this.onTouchedCallback = fn;
  }

  loadFiles() {
    this.loading = true;
    this.files = [];
    const subscriber = this.fileService.getList().subscribe((results: IFileResponse[]) => {
      this.files = results;
      this.loading = false;
      subscriber.unsubscribe();
    });
  }

  removeFile(imageName: string) {
    this.loading = true;
    const subscriber = this.fileService.remove(imageName).subscribe(() => {
      this.loadFiles();
      this.loading = false;
      subscriber.unsubscribe();
    });
  }
}
