import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from 'environments/environment';

import { FakeDataService } from '@hgb/core';

import * as GTARest from 'core/gen/gtarest';

import { iVmService } from './i-vm-service';
import { VmMappingService } from './vm-mapping.service';
import { VmService_Mock } from './vm-service-mock.service';
import { VmService_Rest } from './vm-service-rest.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [],
})
export class VmServiceModule {

  static forRoot(apiUrl: string): ModuleWithProviders {
    return {
      ngModule: VmServiceModule,
      providers: [
        ...GTARest.GTARestService_makeRootProviders(apiUrl),
        FakeDataService,
        VmMappingService,
        {
          provide: iVmService,
          useClass: environment.useMock
            ? VmService_Mock
            : VmService_Rest
        },
      ]
    };
  }
}
