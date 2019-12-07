import { Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '../../services/icon.service';
import { DomSanitizer } from '@angular/platform-browser';

import { PopupConfig } from './popup-config';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})

export class PopupComponent implements OnInit {
    @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
    options: PopupConfig;
    footerLegend: any = '';
    private submissionData: any;
    private activeComponent: any;

    constructor(
        public bsModalRef: BsModalRef,
        private readonly sanitized: DomSanitizer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private translate: TranslateService,
        public iconService: IconService) {
    }

    ngOnInit(): void {
        this.insertCustomComponent();
        if (this.options.footerLegendString) {
            this.footerLegend = this.sanitized.bypassSecurityTrustHtml(this.options.footerLegendString);
        }
    }

    private insertCustomComponent(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.options.component);
        this.container.clear();
        this.activeComponent = this.container.createComponent(componentFactory).instance;
        this.activeComponent['configData'] = this.options.data;
        this.activeComponent['configData']['submissionData'] = this.submissionData;
    }

    private handleAction(item): void {
        if (item.command) {
            if (this.activeComponent.resultData) {
                item.command(this.activeComponent.resultData());
            } else {
                item.command(this.activeComponent.submissionData);
            }
        }  else if (this.activeComponent.handleCustomSubmitOnPopup) {
            this.activeComponent.handleCustomSubmitOnPopup(this.submissionData);
        } else {
            this.bsModalRef.hide();
        }
    }
}
