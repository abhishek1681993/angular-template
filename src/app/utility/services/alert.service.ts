import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HelperService } from './helper.service';
import { TranslationService } from './translation.service';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertConfig, AlertType } from '../dialogs/alert/alert-config';
import { AlertComponent } from '../dialogs/alert/alert.component';

@Injectable()
export class AlertService {

    alertPopup: BsModalRef = null;

    constructor(
        private modalService: BsModalService,
        private helperService: HelperService,
        private translationService: TranslationService) {
    }

    // tslint:disable-next-line: max-line-length
    showInfo(message: string, subMessage?: string, title?: string, args?: string | Array<string>, command?: Function, skipQuote?: boolean): void {
        title = this.translationService.get(title || 'Info');
        message = this.translationService.get(message);
        message = this.helperService.getConvertedMessage(message, args, skipQuote);
        const config: AlertConfig = {
            type: AlertType.Info,
            title,
            message,
            subMessage
        };
        config.command = data => {
            this.alertPopup = null;
            if (command) {
                command(data);
            }
        };
        if (this.alertPopup === null) {
            // tslint:disable-next-line: max-line-length
            this.alertPopup = this.modalService.show(AlertComponent, { initialState: { options: config }, class: 'modal-sm', ignoreBackdropClick: true });
        }
    }

    showWarning(message: string, subMessage?: string, title?: string, args?: string | Array<string>, command?: Function): void {
        title = this.translationService.get(title || 'Warning');
        message = this.translationService.get(message);
        message = this.helperService.getConvertedMessage(message, args, true);
        const config: AlertConfig = {
            type: AlertType.Warning,
            title,
            message,
            subMessage
        };
        config.command = () => {
            this.alertPopup = null;
            if (command) {
                command();
            }
        };
        if (this.alertPopup === null) {
            // tslint:disable-next-line: max-line-length
            this.alertPopup = this.modalService.show(AlertComponent, { initialState: { options: config }, class: 'modal-sm', ignoreBackdropClick: true });
        }
    }

    showError(message: string, subMessage?: string, title?: string, args?: string | Array<string>, errDetails?: string): void {
        title = this.translationService.get(title || 'Error');
        message = this.translationService.get(message);
        message = this.helperService.getConvertedMessage(message, args);
        const config: AlertConfig = {
            type: AlertType.Error,
            title,
            message,
            subMessage,
            details: errDetails
        };
        config.command = () => {
            this.alertPopup = null;
        };
        if (this.alertPopup === null) {
            // tslint:disable-next-line: max-line-length
            this.alertPopup = this.modalService.show(AlertComponent, { initialState: { options: config }, class: 'modal-sm', ignoreBackdropClick: true });
        }

    }

    showConfirm(title: string, message: string, command?: Function, subMessage?: string, args?: string | Array<string>): void {
        title = this.translationService.get(title);
        message = this.translationService.get(message);
        message = this.helperService.getConvertedMessage(message, args);
        const config: AlertConfig = {
            type: AlertType.Confirm,
            title,
            message,
            subMessage
        };
        config.command = data => {
            this.alertPopup = null;
            if (command) {
                command(data);
            }
        };
        if (this.alertPopup === null) {
            // tslint:disable-next-line: max-line-length
            this.alertPopup = this.modalService.show(AlertComponent, { initialState: { options: config }, class: 'modal-sm', ignoreBackdropClick: true });
        }
    }


    apiError(error: any, title?: string, args?: string | Array<string>): void {
        let message = '';
        let apiMessage = '';
        let isSessionOut = false;
        if (error && error.status === 0) {
            apiMessage = 'Server Unreachable.';
            message = 'Server Unreachable.';
        } else if (error && error.status === 419) {
            isSessionOut = true;
            title = 'SessionExpiredTitle';
            // apiMessage = 'Your session has expired. Please re login.';
            message = 'SessionExpireMessage';
        } else if (typeof (error) === 'string') {
            message = error;
        } else {
            const errorDetails = this.mapApiErrorMessage(error);
            message = error.customMessage || errorDetails.message;
            apiMessage = error.customApiErrorDetails || errorDetails.apiErrorDetails;
        }
        title = this.translationService.get(title || 'Error');
        message = this.translationService.get(message);
        message = this.helperService.getConvertedMessage(message, args);
        const config: AlertConfig = {
            type: isSessionOut ? AlertType.SessionExpired : AlertType.Error,
            title,
            message,
            details: apiMessage
        };
        config.command = () => {
            if (isSessionOut) {
                localStorage.setItem('redirectURL', location.href);
                const url = window.location.protocol + '//' + window.location.host;
                window.location.href = url;
            }
            this.alertPopup = null;
        };
        if (this.alertPopup === null) {
            // tslint:disable-next-line: max-line-length
            this.alertPopup = this.modalService.show(AlertComponent, { initialState: { options: config }, class: 'modal-sm', ignoreBackdropClick: true, backdrop: 'static', keyboard: false });
        }
    }

    private mapApiErrorMessage(errorResponse: HttpErrorResponse): ErrorDetails {
        let message = '';
        const apiErrorDetails = errorResponse.message;
        // tslint:disable-next-line:prefer-conditional-expression
        if (errorResponse.error && errorResponse.error.message) {
            message = errorResponse.error.message;
        } else {
            message = message || errorResponse.message;
        }

        return {
            message,
            apiErrorDetails
        };
    }
}

interface ErrorDetails {
    message: string;
    apiErrorDetails: string;
}
