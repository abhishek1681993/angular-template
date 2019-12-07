import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

import { TranslationService } from './translation.service';

@Injectable()
export class ToasterService {
    constructor(public toastr: ToastrService,
                private translationService: TranslationService) { }

    success(message: string, title?: string, args?: string | Array<string>): void {
        message = this.translationService.get(message);
        title = title ? this.translationService.get(title) : '';
        message = this.getConvertedMessage(message, args);
        this.toastr.success(message, title, {enableHtml: true});
    }

    info(message: string, title?: string, args?: string | Array<string>, skipQuote?: boolean): void {
        message = this.translationService.get(message);
        title = title ? this.translationService.get(title) : '';
        message = this.getConvertedMessage(message, args, skipQuote);
        this.toastr.info(message, title);
    }

    // Success Type
    warning(message: string, title?: string, args?: string | Array<string>): void {
        message = this.translationService.get(message);
        title = title ? this.translationService.get(title) : '';
        message = this.getConvertedMessage(message, args);
        this.toastr.warning(message, title);
    }

    // Success Type
    error(message: string, title?: string, args?: string | Array<string>): void {
        message = this.translationService.get(message);
        title = title ? this.translationService.get(title) : '';
        message = this.getConvertedMessage(message, args);
        this.toastr.error(message, title);
    }

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
