import { Injectable } from '@angular/core';

import { FakeDataService } from '@hgb/core';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';


@Injectable()
export class VmService_Mock implements IVmService {

  constructor(
    private vmMappingService: VmMappingService,
    private fakeDataService: FakeDataService,
  ) { }

  
}
