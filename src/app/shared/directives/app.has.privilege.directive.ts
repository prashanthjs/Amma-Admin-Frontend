import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Directive({
  selector: '[appHasPrivilege]'
})
export class AppHasPrivilegeDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
  }

  @Input()
  set appHasPrivilege(privilege: string[]) {
    if (this.authService.hasPrivilege(privilege)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
