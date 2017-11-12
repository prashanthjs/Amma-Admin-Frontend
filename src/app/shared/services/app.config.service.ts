import {Injectable} from '@angular/core';
import {CURRENCY_CODE, CURRENCY_SYMBOL, LENGTH_SYMBOL, WEIGHT_SYMBOL} from '../../app.constants';

@Injectable()
export class AppConfigService {

    get currencySymbol() {
        return CURRENCY_SYMBOL;
    }

    get currencyCode() {
        return CURRENCY_CODE;
    }

    get weightSymbol() {
        return WEIGHT_SYMBOL;
    }

    get lengthSymbol() {
        return LENGTH_SYMBOL;
    }
}
