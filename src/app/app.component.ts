import { Component, OnInit, Inject } from '@angular/core';
import { iVmService, IVmService } from 'core/iVM/i-vm-service';
import { MissingInfoVM } from 'core/models/missing-info-vm';
import { environment } from 'environments/environment';
import { FeLogoType } from 'core/models/ui-models';

@Component({
  selector: 'hgb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  readonly ENV = environment;
  readonly FeLogoType = FeLogoType;
  
  vmMissingInfo: MissingInfoVM;

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
}
