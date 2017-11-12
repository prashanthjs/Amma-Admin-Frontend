import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AppPageErrorHandler {

  constructor(private router: Router) {
  }

  handleError(error) {
    if (error instanceof Response) {
      if (error.status === 404) {
        this.router.navigate(['page-not-found']);
      } else if (error.status === 403) {
        this.router.navigate(['access-denied']);
      }
    } else {
      this.router.navigate(['server-internal-error']);
    }
  }
}
