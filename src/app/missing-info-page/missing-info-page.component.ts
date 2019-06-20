import { Component, OnInit, Inject } from '@angular/core';
import { iVmService, IVmService } from 'core/iVM/i-vm-service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppResolveData } from 'app/-common/-resolve-keys';
import { MissingInfoVM, MissingInfoRFM } from 'core/models/missing-info-vm';
import { environment } from 'environments/environment';
import { FeLogoType } from 'core/models/ui-models';
import { GenericReactiveForm } from '@hgb/core';

@Component({
  selector: 'hgb-missing-info-page',
  templateUrl: './missing-info-page.component.html',
  styleUrls: ['./missing-info-page.component.less']
})
export class MissingInfoPageComponent implements OnInit {

  readonly ENV = environment;
  readonly FeLogoType = FeLogoType;
  
  vmMissingInfo: MissingInfoVM;
  grform: GenericReactiveForm<MissingInfoRFM>;
  isSubmitDone: boolean = false;

  constructor(
    @Inject(iVmService)
    private vmService: IVmService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    let data = <AppResolveData>this.route.snapshot.data;
    this.vmMissingInfo = data.missingInfoVM;
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
