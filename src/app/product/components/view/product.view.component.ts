import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFormModalComponent} from '../form/product.form.modal.component';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {ProductDataService} from '../../services/product.data.service';
import {AppViewResource, AppViewResourceFactory} from '../../../shared/services/app.view.resource.factory';
import {AppConfigService} from '../../../shared/services/app.config.service';
import {ProductMartFormModalComponent} from '../form/product.mart.form.modal.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product.view.template.html'
})
export class ProductViewComponent implements OnInit, OnDestroy {

  viewResource: AppViewResource;

  constructor(public dataService: ProductDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              public configService: AppConfigService,
              viewResourceFactory: AppViewResourceFactory,
              private router: Router) {
    this.viewResource = viewResourceFactory.get(
      (id: string) => this.dataService.getProductById(id)
    );
  }

  ngOnInit() {
    const subscriber = this.route.params.subscribe((params: any) => {
      this.viewResource.fileType = 'product';
      this.viewResource.id = params['id'];
      this.viewResource.init();
    });
    const subscriber1 = this.modalService.onHide.subscribe(() => {
      this.viewResource.init();
    });

    this.viewResource.subscription.push(subscriber);
    this.viewResource.subscription.push(subscriber1);
    this.viewResource.onInit();
  }

  ngOnDestroy() {
    this.viewResource.onDestory();
  }

  remove(): void {
    this.dataService.removeProduct(this.viewResource.id).subscribe(() => this.router.navigate(['product/list']));
  }

  open(): void {
    const bsModalRef = this.modalService.show(ProductFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openMart(): void {
    const bsModalRef = this.modalService.show(ProductMartFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }
}
