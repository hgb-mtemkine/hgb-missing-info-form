import { Injectable } from '@angular/core';

import { FakeDataService } from '@hgb/core';

import { MissingInfoQuestionsVM } from 'core/models/missing-info-vm';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';


@Injectable()
export class VmService_Mock implements IVmService {

  constructor(
    private vmMappingService: VmMappingService,
    private fakeDataService: FakeDataService,
  ) { }

  loadQuestions(id: string): Promise<MissingInfoQuestionsVM> {
    return this.fakeDataService.resolveWith(<MissingInfoQuestionsVM> {

    }, 200);
  }
}
