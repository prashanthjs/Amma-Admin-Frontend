import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MartFormModalComponent} from '../form/mart.form.modal.component';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {MartDataService} from '../../services/mart.data.service';
import {AppViewResource, AppViewResourceFactory} from '../../../shared/services/app.view.resource.factory';

@Component({
  selector: 'app-mart-view',
  templateUrl: './mart.view.template.html'
})
export class MartViewComponent implements OnInit, OnDestroy {

  viewResource: AppViewResource;

  constructor(public dataService: MartDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              viewResourceFactory: AppViewResourceFactory,
              private router: Router) {
    this.viewResource = viewResourceFactory.get(
      (id: string) => this.dataService.getMartById(id)
    );
  }

  ngOnInit() {
    const subscriber = this.route.params.subscribe((params: any) => {
      this.viewResource.fileType = 'mart';
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
    this.dataService.removeMart(this.viewResource.id).subscribe(() => this.router.navigate(['mart/list']));
  }

  open(): void {
    const bsModalRef = this.modalService.show(MartFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }
}
