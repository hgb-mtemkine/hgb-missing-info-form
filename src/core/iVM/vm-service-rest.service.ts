import { Injectable } from '@angular/core';

import * as GTARest from 'core/gen/gtarest';

import { IVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';


@Injectable()
export class VmService_Rest implements IVmService {

  constructor(
    private gtaRest: GTARest.GTARestService,
    private vmMappingService: VmMappingService,
  ) { }

  
}
