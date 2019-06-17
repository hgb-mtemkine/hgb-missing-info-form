import { Injectable } from '@angular/core';

import * as GTARest from 'core/gen/gtarest';
import { MissingInfoQuestionsVM } from 'core/models/missing-info-vm';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';
import { FakeDataService } from '@hgb/core';


@Injectable()
export class VmService_Rest implements IVmService {

  constructor(
    private gtaRest: GTARest.GTARestService,
    private vmMappingService: VmMappingService,
    private fakeDataService: FakeDataService,
    ) { }

  loadQuestions(id: string): Promise<MissingInfoQuestionsVM> {
    return this.fakeDataService.resolveWith(<MissingInfoQuestionsVM> {
      
    }, 200);
  }  
}
