import {Routes} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not.found.component';
import {ServerErrorComponent} from './components/server-error/server.error.component';
import {AccessDeniedComponent} from './components/access-denied/access.denied.component';

export const LAYOUT_ROUTES: Routes = [
  {path: 'page-not-found', component: NotFoundComponent},
  {path: 'server-internal-error', component: ServerErrorComponent},
  {path: 'access-denied', component: AccessDeniedComponent}
];
