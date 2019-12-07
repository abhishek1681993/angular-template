import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../components/modal/modal-component';

@Injectable()
export class ModalService {
    bsModalRef: BsModalRef;

    constructor(
        private modalService: BsModalService
    ) { }

    showConfirmation(title: string, message: string, callback: Function): BsModalRef {
        const initialState = {
            list: [
              'Open a modal with component',
              'Pass your data',
              'Do something else',
              '...'
            ],
            message,
            title,
            submission: {},
            buttons: [{
                text: 'Yes',
                css: 'btn-primary',
                command: (submission) => {
                    callback();
                }
            },
            {
                text: 'No',
                css: 'btn-warning',
                command: (submission) => {
                    this.bsModalRef.hide();
                }
            }]
          };
          this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
          this.bsModalRef.content.closeBtnName = 'Close';

          return this.bsModalRef;
    }
}
