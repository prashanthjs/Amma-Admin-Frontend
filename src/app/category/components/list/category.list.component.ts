import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryFormModalComponent} from '../form/category.form.modal.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {CategoryDataService} from '../../services/category.data.service';
import {ListOptions} from '../../../shared/models/list.options';

@Component({
  selector: 'app-category-list',
  templateUrl: './category.list.template.html'
})
export class CategoryListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: CategoryDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getCategories(options));
  }

  ngOnInit() {
    this.gridService.subscription.push(this.modalService.onHide.subscribe(() => this.gridService.init()));
    this.gridService.onInit();
  }

  ngOnDestroy() {
    this.gridService.onDestory();
  }

  open(id: string = null): void {
    const bsModalRef = this.modalService.show(CategoryFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeCategory(id).subscribe(() => this.gridService.init());
  }
}
