import { Component, Inject, OnInit } from '@angular/core';

import { GenericReactiveForm } from '@hgb/core';

import { IVmService, iVmService } from 'core/iVM/i-vm-service';
import { MissingInfoRFM, MissingInfoVM } from 'core/models/missing-info-vm';
import { FeLogoType } from 'core/models/ui-models';

import { environment } from 'environments/environment';


@Component({
  selector: 'hgb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  readonly ENV = environment;
  readonly FeLogoType = FeLogoType;
  
  vmMissingInfo: MissingInfoVM;
  grform: GenericReactiveForm<MissingInfoRFM>;
  isSubmitDone: boolean = false;

  constructor(
    @Inject(iVmService)
    private vmService: IVmService,
  ) {}

  ngOnInit() {
    // TODO: cdc42361: id from router
    this.vmService.loadQuestions('dd56f5ca-edab-441e-8377-6ea440016006').then(vm => {

      this.vmMissingInfo = vm;

      // DESIGN: 0d0dacd9: hide splash screen when loaded question form
      let target = document.querySelector('#app-splash-screen');
      target && target.remove();
    });
  }

  formModified(grform: GenericReactiveForm<MissingInfoRFM>) {
    this.grform = grform;
  }

  submit() {
    if (!this.grform)
      return;
    // if (!this.grform.formGroup.valid) {
    //   this.grform.validateAllFormFields();
    //   return;
    // }
    this.vmService.submitMissingInfo(this.grform.getValue(), this.vmMissingInfo).then(() => {
      this.isSubmitDone = true;
    });
  }
}

