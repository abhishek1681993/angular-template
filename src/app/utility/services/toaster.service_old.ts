import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilityToasterService {

    constructor(private toastrService: ToastrService) { }

    success(message: string, subMessage?: string) {
        this.toastrService.success(message, subMessage);
    }

    warning(message: string, subMessage?: string) {
        this.toastrService.warning(message, subMessage);
    }

    error(message: string, subMessage?: string) {
        this.toastrService.error(message, subMessage);
    }

    info(message: string, subMessage?: string) {
        this.toastrService.info(message, subMessage);
    }
}