import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AppEventBus {

    pageRedraw$: EventEmitter<any> = new EventEmitter();

    triggerPageRedraw(options: any = null) {
        this.pageRedraw$.emit(options);
    }
}
