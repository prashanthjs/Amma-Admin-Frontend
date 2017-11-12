import {AfterViewInit, Component, OnDestroy} from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-blank',
  templateUrl: 'blank.layout.template.html'
})
export class BlankLayoutComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit() {
    jQuery('body').addClass('gray-bg');
  }

  ngOnDestroy() {
    jQuery('body').removeClass('gray-bg');
  }
}
