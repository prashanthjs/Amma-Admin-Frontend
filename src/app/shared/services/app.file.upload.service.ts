import 'rxjs/add/operator/map';
import {FileUploader} from 'ng2-file-upload';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UUID} from 'angular2-uuid';
import {API_FILE_UPLOAD_URL} from '../shared.constants';
import {AuthHttp} from 'angular2-jwt';

export interface IFileResponse {
  fileName: string;
  url: string;
}

@Injectable()
export class AppFileUploadService extends FileUploader {

  private type: string;
  private token: string;

  constructor(private authHttp: AuthHttp) {
    super({autoUpload: true});
  }

  setType(endPoint) {
    this.type = endPoint;
    this.setUrl();
  }

  setToken(token: string) {
    this.token = token;
    this.setUrl();
  }

  private setUrl() {
    this.options.url = API_FILE_UPLOAD_URL + '/' + this.type + '/' + this.token;
  }

  generateToken(): string {
    const token = UUID.UUID();
    this.setToken(token);
    return token;
  }

  getList(): Observable<IFileResponse[]> {
    return this.authHttp.get(this.options.url).map((response: Response) => {
      const body = this.extractResponse(response);
      return body.files;
    });
  }

  remove(file: string): Observable<any> {
    return this.authHttp.delete(this.options.url + '/' + file).map((response: Response) => {
      return this.extractResponse(response);
    });
  }

  private extractResponse(response: Response): any {
    return response.json() || {};
  }
}

@Injectable()
export class AppFileUploadServiceFactory {
  constructor(private authHttp: AuthHttp) {
  }

  get(): AppFileUploadService {
    return new AppFileUploadService(this.authHttp);
  }
}



