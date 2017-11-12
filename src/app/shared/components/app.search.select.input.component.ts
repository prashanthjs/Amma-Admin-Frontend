import {Component, Input, OnChanges, forwardRef} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

@Component({
    selector: 'app-search-select-input',
    template: '<tag-input [ngModel]="items" ' +
    '[onlyFromAutocomplete]="true" ' +
    '(ngModelChange)="onChange($event)" ' +
    '[maxItems]="maxItems" ' +
    '[placeholder]="placeholder" ' +
    '[secondaryPlaceholder]="secondaryPlaceholder" ' +
    '(onBlur)="onBlur($event)">' +
    '   <tag-input-dropdown [autocompleteObservable]="search"></tag-input-dropdown>' +
    '</tag-input>',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppSearchSelectInputComponent), multi: true},
    ]
})
export class AppSearchSelectInputComponent implements ControlValueAccessor, OnChanges {
    items: string[] = [];
    @Input() maxItems = 1;
    @Input() placeholder = '';
    @Input() secondaryPlaceholder = '';
    @Input() valueField = 'name';
    @Input() searchFunc: (value: string) => any = noop;

    propagateChange: (_: any) => void = noop;
    validateFn: () => void = noop;
    onTouchedCallback: (value: string) => void = noop;

    writeValue(value) {
        if (value) {
            if (value && typeof value === 'string') {
                this.items = [value];
            } else {
                this.items = value;
            }
        } else {
            this.items = [];
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

    ngOnChanges(inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.propagateChange(this.getValues());
        }
    }

    onChange(items) {
        this.items = items;
        this.propagateChange(this.getValues());
    }

    onBlur($event) {
        this.onTouchedCallback('');
    }

    search = (value) => {
        return this.searchFunc(value).map((response: Object[]) => {
            const data = [];
            response.forEach((item: any) => {
                data.push(item[this.valueField]);
            });
            return data;
        });
    };

    getValues(): string[] | string {
        if (this.maxItems === 1) {
            if (this.items && this.items.length) {
                return this.getValue(this.items[0]);
            }
            return '';
        }
        const array = [];
        if (this.items && this.items.length) {
            for (let i = 0; i < this.items.length; i++) {
                array.push(this.getValue(this.items[i]));
            }
        }
        return array;
    }

    getValue(value): string {
        if (value === null) {
            return null;
        }
        if (typeof value === 'object') {
            return value.value;
        }
        return value;
    }
}
