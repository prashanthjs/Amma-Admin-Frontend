import {Component, OnInit} from '@angular/core';
import {detectBody} from '../../app.helpers';

@Component({
    selector: 'app-top-navigation-layout',
    templateUrl: 'top.navigation.layout.template.html',
    host: {
        '(window:resize)': 'onResize()'
    }
})
export class TopNavigationLayoutComponent implements OnInit {

    public ngOnInit(): any {
        detectBody();
    }

    public onResize() {
        detectBody();
    }

}
