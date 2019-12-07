import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToasterService } from './services/toaster.service';
import { ModalContentComponent } from './components/modal/modal-component';
import { ModalService } from './services/modal.service';
import { PopupComponent } from './dialogs/popup/popup.component';
import { AlertComponent } from './dialogs/alert/alert.component';
import { AlertService } from './services/alert.service';
import { PopupService } from './services/popup.service';
import { HelperService } from './services/helper.service';
import { IconService } from './services/icon.service';
import { TranslationService } from './services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgReversePipeModule } from 'angular-pipes';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const exportedComponent = [
    ModalContentComponent,
    PopupComponent,
    AlertComponent
];

const providerList = [
    AlertService,
    PopupService,
    HelperService,
    IconService,
    ToasterService,
    TranslationService
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        NgReversePipeModule,
        TabsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        ...exportedComponent
    ],
    exports: [
        ...exportedComponent
    ],
    entryComponents: [
        ...exportedComponent
    ],
    providers: [
        ...providerList
    ]
})
export class UtilityModule {
    constructor(public translateService: TranslateService) {
        const browserLang: string = translateService.getBrowserLang();
        translateService.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    }
}
