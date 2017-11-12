import {NgModule} from '@angular/core';
import {FooterComponent} from './components/footer/footer.component';
import {BlankLayoutComponent} from './components/layouts/blank.layout.component';
import {TopNavigationLayoutComponent} from './components/layouts/top.navigation.layout.component';
import {TopnavbarNavigationComponent} from './components/topnavbar/topnavbar.navigation.component';

import {SharedModule} from '../shared/shared.module';
import {AccessDeniedComponent} from './components/access-denied/access.denied.component';
import {NotFoundComponent} from './components/not-found/not.found.component';
import {ServerErrorComponent} from './components/server-error/server.error.component';
import {UserModule} from '../user/user.module';

@NgModule({
  declarations: [
    FooterComponent,
    BlankLayoutComponent,
    TopNavigationLayoutComponent,
    TopnavbarNavigationComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    SharedModule,
    UserModule
  ],
  exports: [
    FooterComponent,
    BlankLayoutComponent,
    TopNavigationLayoutComponent,
    TopnavbarNavigationComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
})

export class LayoutsModule {
}
