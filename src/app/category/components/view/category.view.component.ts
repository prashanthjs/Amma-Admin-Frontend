import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryFormModalComponent} from '../form/category.form.modal.component';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {CategoryMartFormModalComponent} from '../form/category.mart.form.modal.component';
import {CategoryDataService} from '../../services/category.data.service';
import {AppViewResource, AppViewResourceFactory} from '../../../shared/services/app.view.resource.factory';

@Component({
  selector: 'app-category-view',
  templateUrl: './category.view.template.html'
})
export class CategoryViewComponent implements OnInit, OnDestroy {

  viewResource: AppViewResource;

  constructor(public dataService: CategoryDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              viewResourceFactory: AppViewResourceFactory,
              private router: Router) {
    this.viewResource = viewResourceFactory.get(
      (id: string) => this.dataService.getCategoryById(id)
    );
  }

  ngOnInit() {
    const subscriber = this.route.params.subscribe((params: any) => {
      this.viewResource.fileType = 'category';
      this.viewResource.id = params['id'];
      this.viewResource.init();
    });
    const subscriber1 = this.modalService.onHide.subscribe((reason: string) => {
      this.viewResource.init();
      return true;
    });

    this.viewResource.subscription.push(subscriber);
    this.viewResource.subscription.push(subscriber1);
    this.viewResource.onInit();
  }

  ngOnDestroy() {
    this.viewResource.onDestory();
  }

  remove(): void {
    this.dataService.removeCategory(this.viewResource.id).subscribe(() => this.router.navigate(['category/list']));
  }

  open(): void {
    const bsModalRef = this.modalService.show(CategoryFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openMart(): void {
    const bsModalRef = this.modalService.show(CategoryMartFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }
}
