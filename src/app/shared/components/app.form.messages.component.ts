import {Component} from '@angular/core';

export interface IAppFormMessage {
    type: string;
    msg: string;
    timeout?: number;
    dismissible?: boolean;
}

@Component({
    selector: 'app-form-messages',
    templateUrl: './app.form.messages.template.html'
})
export class AppFormMessagesComponent {
    public alerts: any = [];

    public add(message: IAppFormMessage): void {
        this.alerts.push(message);
    }

    showSuccessMessage() {
        this.add({
            type: 'success',
            msg: `Form saved successfully`,
            timeout: 5000,
            dismissible: true
        });
    }

    showFormSaveErrorMessage(error) {
        this.add({
            type: 'danger',
            msg: error,
            timeout: 5000,
            dismissible: true
        });
    }

    showValidationErrorMessage(error) {
        this.add({
            type: 'danger',
            msg: `Please check form and submit`,
            timeout: 5000,
            dismissible: true
        });
    }

    showResourceErrorMessage(error) {
        this.add({
            type: 'danger',
            msg: error,
            timeout: 5000,
            dismissible: true
        });
    }
}
