import * as ObjectPath from 'object-path';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderFormModalComponent} from '../form/order.form.modal.component';
import {MODAL_CONFIG} from '../../../app.constants';
import {BsModalService} from 'ngx-bootstrap';
import {OrderDataService} from '../../services/order.data.service';
import {AppViewResource, AppViewResourceFactory} from '../../../shared/services/app.view.resource.factory';
import {AppConfigService} from '../../../shared/services/app.config.service';
import {OrderMartFormModalComponent} from '../form/order.mart.form.modal.component';
import {OrderFormAddressBillingModalComponent} from '../form/helper/address/order.form.address.billing.modal.component';
import {OrderFormAddressShippingModalComponent} from '../form/helper/address/order.form.address.shipping.modal.component';
import {OrderFormItemModalComponent} from '../form/helper/item/order.form.item.modal.component';
import {OrderFormItemInModalComponent} from '../form/helper/item/order.form.item.in.modal.component';
import {OrderFormItemOutModalComponent} from '../form/helper/item/order.form.item.out.modal.component';
import {OrderFormOutItemModalComponent} from '../form/helper/outitem/order.form.out.item.modal.component';
import {OrderFormPaymentModalComponent} from '../form/helper/payment/order.form.payment.modal.component';
import {OrderFormShippingModalComponent} from '../form/helper/shipping/order.form.shipping.modal.component';
import {OrderFormNotesModalComponent} from '../form/helper/notes/order.form.notes.modal.component';


@Component({
  selector: 'app-order-view',
  templateUrl: './order.view.template.html'
})
export class OrderViewComponent implements OnInit, OnDestroy {

  viewResource: AppViewResource;

  constructor(public dataService: OrderDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              public configService: AppConfigService,
              viewResourceFactory: AppViewResourceFactory,
              private router: Router) {
    this.viewResource = viewResourceFactory.get(
      (id: string) => this.dataService.getOrderById(id)
    );
  }

  ngOnInit() {
    const subscriber = this.route.params.subscribe((params: any) => {
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
    this.dataService.removeOrder(this.viewResource.id).subscribe(() => this.router.navigate(['order/list']));
  }

  open(): void {
    const bsModalRef = this.modalService.show(OrderFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openMart(): void {
    const bsModalRef = this.modalService.show(OrderMartFormModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openBillingAddress(): void {
    const bsModalRef = this.modalService.show(OrderFormAddressBillingModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openShippingAddress(): void {
    const bsModalRef = this.modalService.show(OrderFormAddressShippingModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }

  openItem(itemId: number = null): void {
    const bsModalRef = this.modalService.show(OrderFormItemModalComponent, MODAL_CONFIG);
    bsModalRef.content.itemId = itemId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removeItem(itemId: number): void {
    this.removeAndSave('inItems.' + itemId);
  }

  openItemInItem(itemId: number, inItemId: number = null) {
    const bsModalRef = this.modalService.show(OrderFormItemInModalComponent, MODAL_CONFIG);
    bsModalRef.content.itemId = itemId;
    bsModalRef.content.inItemId = inItemId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removeItemInItem(itemId: number, inItemId: number) {
    this.removeAndSave('inItems.' + itemId + '.inItems.' + inItemId);
  }

  openItemOutItem(itemId: number, outItemId: number = null) {
    const bsModalRef = this.modalService.show(OrderFormItemOutModalComponent, MODAL_CONFIG);
    bsModalRef.content.itemId = itemId;
    bsModalRef.content.outItemId = outItemId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removeItemOutItem(itemId: number, outItemId: number) {
    this.removeAndSave('inItems.' + itemId + '.outItems.' + outItemId);
  }


  removeAndSave(path) {
    const model = JSON.parse(JSON.stringify(this.viewResource.model));
    ObjectPath.del(model, path);
    this.dataService.saveOrder(model, this.viewResource.id).subscribe((result) => {
      this.viewResource.init();
    });
  }

  openOutItem(outItemId: number = null): void {
    const bsModalRef = this.modalService.show(OrderFormOutItemModalComponent, MODAL_CONFIG);
    bsModalRef.content.outItemId = outItemId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removeOutItem(outItemId: number): void {
    this.removeAndSave('outItems.' + outItemId);
  }

  openPayment(paymentId: number = null) {
    const bsModalRef = this.modalService.show(OrderFormPaymentModalComponent, MODAL_CONFIG);
    bsModalRef.content.paymentId = paymentId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removePayment(paymentId: number = null) {
    this.removeAndSave('payment.' + paymentId);
  }

  openShipping(shippingId: number = null) {
    const bsModalRef = this.modalService.show(OrderFormShippingModalComponent, MODAL_CONFIG);
    bsModalRef.content.shippingId = shippingId;
    bsModalRef.content.id = this.viewResource.id;
  }

  removeShipping(shippingId: number = null) {
    this.removeAndSave('shipping.' + shippingId);
  }

  openNotes(): void {
    const bsModalRef = this.modalService.show(OrderFormNotesModalComponent, MODAL_CONFIG);
    bsModalRef.content.id = this.viewResource.id;
  }
}
