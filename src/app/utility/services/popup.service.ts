import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslationService } from './translation.service';

import { Size } from '../dialogs/popup/popup-config';
import { PopupComponent } from '../dialogs/popup/popup.component';

import { PopupConfig } from '../dialogs/popup/popup-config';

@Injectable()

export class PopupService {

    constructor(
        private modalService: BsModalService) { }

    showPopup(popupOptions: PopupConfig, submission?, modalSize?: Size): BsModalRef {
        modalSize = modalSize || Size.medium;

        // tslint:disable-next-line: max-line-length
        return this.modalService.show(PopupComponent, { initialState: { options: popupOptions, submissionData: submission }, class: this.getModalSize(modalSize), ignoreBackdropClick: true });
    }

    getModalSize(modalSize: Size): string {
        if (modalSize as Size === Size.small) {
            return 'modal-sm';

        } else if (modalSize === Size.medium) {
            return 'modal-md';
        } else if (modalSize === Size.large) {
            return 'modal-lg';
        } else if (modalSize === Size.extraLarge) {
            return 'modal-xl';
        } else {
            return 'modal-xxl';
        }
    }
}
