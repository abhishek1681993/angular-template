import { OnInit, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ModalButton } from '../../interface/modal.interface';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-component.html'
})
export class ModalContentComponent implements OnInit {
    message;
    title: string;
    closeBtnName: string;
    list: any[] = [];
    buttons: Array<ModalButton> = [];
    submission: any;

    constructor(public bsModalRef: BsModalRef) { }

    ngOnInit() {
        this.list.push('PROFIT!!!');
    }
}
