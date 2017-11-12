import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductFormModalComponent} from '../form/product.form.modal.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MODAL_CONFIG} from '../../../app.constants';
import {AppGrid, AppGridFactory} from '../../../shared/services/app.grid.factory';
import {ProductDataService} from '../../services/product.data.service';
import {ListOptions} from '../../../shared/models/list.options';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.template.html'
})
export class ProductListComponent implements OnInit, OnDestroy {

  gridService: AppGrid;

  constructor(private modalService: BsModalService,
              private dataService: ProductDataService,
              gridFactory: AppGridFactory) {
    this.gridService = gridFactory.get((options?: ListOptions) => this.dataService.getProducts(options));
  }

  ngOnInit() {
    const subscriber = this.modalService.onHide.subscribe(() => {
      this.gridService.init();
      return true;
    });
    this.gridService.subscription.push(subscriber);
    this.gridService.onInit();
  }

  ngOnDestroy() {
    this.gridService.onDestory();
  }

  open(id: string = null): void {
    const bsModalRef = this.modalService.show(ProductFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = id;
  }

  remove(id: string): void {
    this.dataService.removeProduct(id).subscribe(() => this.gridService.init());
  }
}
