import { Component, OnInit, Inject } from '@angular/core';
import { iVmService, IVmService } from 'core/iVM/i-vm-service';
import { MissingInfoQuestionsVM } from 'core/models/missing-info-vm';

@Component({
  selector: 'hgb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  
  vmMissingInfo: MissingInfoQuestionsVM;

  constructor(
    @Inject(iVmService)
    private vmService: IVmService,
  ) {}

  ngOnInit() {
    this.vmService.loadQuestions('TODO:id').then(vm => {

      this.vmMissingInfo = vm;

      // DESIGN: 0d0dacd9: hide splash screen when loaded question form
      let target = document.querySelector('#app-splash-screen');
      target && target.remove();
    });
  }
}
