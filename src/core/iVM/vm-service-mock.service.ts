import { Injectable } from '@angular/core';

import { FakeDataService } from '@hgb/core';

import * as GTARest from 'core/gen/gtarest';
import { MissingInfoVM, MissingInfoRFM } from 'core/models/missing-info-vm';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';


@Injectable()
export class VmService_Mock implements IVmService {

  constructor(
    private vmMappingService: VmMappingService,
    private fakeDataService: FakeDataService,
  ) { }

  loadQuestions(id: string): Promise<MissingInfoVM> {
    return this.fakeDataService
      .resolveWithJsonFile_array(GTARest.AgentDeskMissingInfoRequest, 'assets/mock-json/sample-missing-info-dto.json')
      .then(dto => this.vmMappingService.mapDtoQuestions_to_VM(dto))
      .then(vm => this.fakeDataService.resolveWith(vm, 500));
  }

  submitMissingInfo(infoRFM: MissingInfoRFM, vmMissingInfo: MissingInfoVM): Promise<void> {
    let answerArray = this.vmMappingService.mapMissingInfoRFM_to_DtoArray(infoRFM, vmMissingInfo);
    console.log(`answerArray:`, answerArray);
    return this.fakeDataService.resolveWith(null, 400);
  }
}
