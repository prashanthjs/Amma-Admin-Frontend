import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CategoryFormModalComponent} from './components/form/category.form.modal.component';
import {CategoryViewComponent} from './components/view/category.view.component';
import {CategoryListComponent} from './components/list/category.list.component';
import {CategoryMartFormModalComponent} from './components/form/category.mart.form.modal.component';
import {CategoryDataService} from './services/category.data.service';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryFormModalComponent,
        CategoryViewComponent,
        CategoryMartFormModalComponent
    ],
    imports: [SharedModule],
    exports: [CategoryFormModalComponent],
    providers: [CategoryDataService],
    entryComponents: [
        CategoryFormModalComponent,
        CategoryMartFormModalComponent
    ]
})
export class CategoryModule {
}
