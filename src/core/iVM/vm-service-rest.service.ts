import { Injectable } from '@angular/core';

import * as GTARest from 'core/gen/gtarest';
import { MissingInfoVM, MissingInfoRFM } from 'core/models/missing-info-vm';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';
import { FakeDataService } from '@hgb/core';


@Injectable()
export class VmService_Rest implements IVmService {

  constructor(
    private gtaRest: GTARest.GTARestService,
    private vmMappingService: VmMappingService,
  ) { }

  loadQuestions(id: string): Promise<MissingInfoVM> {
    return this.gtaRest
      .Itinerary_GetMissingInfoQuestions(id)
      .then(dto => this.vmMappingService.mapDtoQuestions_to_VM(dto))
  }

  submitMissingInfo(infoRFM: MissingInfoRFM, vmMissingInfo: MissingInfoVM): Promise<void> {
    let answerArray = this.vmMappingService.mapMissingInfoRFM_to_DtoArray(infoRFM, vmMissingInfo);
    return this.gtaRest
      .Itinerary_AgentDeskWebStatic(<GTARest.AgentDeskWebStaticRequest> {
        itineraryid: 'TODO',
        answer: answerArray,
        query: ''
      })
      .then(dtoWhoCares => {})
  }
}
