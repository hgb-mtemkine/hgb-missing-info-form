import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { IVmService, iVmService } from 'core/iVM/i-vm-service';
import { MissingInfoVM } from 'core/models/missing-info-vm';


@Injectable()
export class Resolver_MissingInfoVM implements Resolve<MissingInfoVM> {
  
  constructor(
    @Inject(iVmService)
    private vmService: IVmService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<MissingInfoVM> {
    return this.vmService.loadQuestions(route.queryParams.id);
  }
}