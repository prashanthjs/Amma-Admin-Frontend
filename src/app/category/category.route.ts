import {Routes} from '@angular/router';
import {CategoryViewComponent} from './components/view/category.view.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {CategoryListComponent} from './components/list/category.list.component';

export const CATEGORY_ROUTES: Routes = [
  {
    path: 'category/list',
    component: CategoryListComponent,
    data: {privilege: ['view-category-basic-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'category/list/:id',
    component: CategoryViewComponent,
    data: {privilege: ['view-category-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
