import { Component } from '@angular/core';
import { ToasterService } from './utility/services/toaster.service';
import { AlertService } from './utility/services/alert.service';
import { PopupService } from './utility/services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'y-paithani';

  constructor(
    private toasterService: ToasterService,
    private alertService: AlertService,
    private popupService: PopupService
    ) {
      this.showAlert();
      this.showToaster();
    }

    showToaster(): any {
      this.toasterService.success('Success');
      this.toasterService.warning('Success');
      this.toasterService.info('Success');
    }

    showAlert(): any {
      this.alertService.showConfirm('Title', 'Please confirm', result => {
        if (result) {
          console.log(result);
          this.showToaster();
        }
      })
    }
}
