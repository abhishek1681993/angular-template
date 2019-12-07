import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '../../services/icon.service';

import { ActionType } from '../popup/popup-config';

import { AlertConfig, AlertType } from './alert-config';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit {
    @ViewChild('message', {static: true}) message;
    @ViewChild('subMessage', {static: true}) subMessage;
    options: AlertConfig;
    buttons = [];
    icon = '';
    alertType = AlertType;

    isCollapsed = true;
    constructor(
        public bsModalRef: BsModalRef,
        public iconService: IconService,
        private translate: TranslateService) {
    }

    ngOnInit(): void {
        if (this.options.type !== AlertType.Preview) {
            this.buttons = [
                {
                    name: 'OK',
                    css: 'btn btn-primary'
                }
            ];
        }
        switch (this.options.type) {
            case AlertType.Confirm:
                this.icon = this.iconService.icons.WarningCircle + ' text-warning alert-icon';
                this.buttons = [
                    {
                        name: 'Yes',
                        css: 'btn btn-primary',
                        action: ActionType.Submit
                    },
                    {
                        name: 'No',
                        css: 'btn btn-warning',
                        action: ActionType.Cancel
                    }
                ];
                break;
            case AlertType.Error:
                this.icon = this.iconService.icons.RemoveCircle + ' text-danger alert-icon';
                this.buttons[0].css = 'btn btn-danger';
                break;
            case AlertType.Info:
                this.icon = this.iconService.icons.InfoCircle + ' text-info alert-icon';
                break;
            case AlertType.Warning:
                this.icon = this.iconService.icons.WarningCircle + ' text-warning alert-icon';
                break;
            case AlertType.SessionExpired:
                    this.icon = this.iconService.icons.WarningCircle + ' text-warning alert-icon';
                    this.buttons = [
                        {
                            name: 'Login',
                            css: 'btn btn-primary',
                            action: ActionType.Submit
                        }
                    ];
                    break;
            default:
                break;
        }
        this.insertCustomContent();
    }

    handleAction(item?: any): void {
        if (this.options.command) {
            this.bsModalRef.hide();
            if (item) {
                if (item.action === ActionType.Submit) {
                    this.options.command(true);
                } else {
                    this.options.command(false);
                }
            } else {
                this.options.command();
            }
        } else {
            this.bsModalRef.hide();
        }
    }

    getCssClass(): string {
        if (this.icon) {
            return 'col-10';
        } else {
            return 'col-12';
        }
    }

    private insertCustomContent(): void {
        if (this.message) {
            this.message.nativeElement.innerHTML = this.options.message;
        }
        if (this.subMessage && this.options.subMessage) {
            this.subMessage.nativeElement.innerHTML = this.options.subMessage;
        }
    }

}
