import {Routes} from '@angular/router';
import {ProductViewComponent} from './components/view/product.view.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {ProductListComponent} from './components/list/product.list.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: 'product/list',
    component: ProductListComponent,
    data: {privilege: ['view-product-basic-privilege']},
    canActivate: [AuthGuard]
  },
  {
    path: 'product/list/:id',
    component: ProductViewComponent,
    data: {privilege: ['view-product-basic-privilege']},
    canActivate: [AuthGuard]
  }
];
