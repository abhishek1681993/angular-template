import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    getConvertedMessage(message: string, args: string | Array<string>, skipQuote?: boolean): string {
        let result = '';
        if (typeof message === 'string') {
            const data = args instanceof Array ? args : [args];
            for (let cnt = 0; cnt < data.length; cnt++) {
                message = skipQuote ? message.replace(`{${cnt}}`, data[cnt]) : message.replace(`{${cnt}}`, '"' + data[cnt] + '"');
            }
            result = message;
        }

        return result;
    }
}
