import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';

import { IVmService, iVmService } from 'core/iVM/i-vm-service';
import { MissingInfoVM } from 'core/models/missing-info-vm';
import { ErrorVM } from 'core/models/error-vm';


@Injectable()
export class Resolver_MissingInfoVM implements Resolve<MissingInfoVM | ErrorVM> {
  
  constructor(
    @Inject(iVmService)
    private vmService: IVmService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<MissingInfoVM | ErrorVM> {
    let paramId = route.queryParams.id;
    if (!paramId) {
      return Promise.resolve(<ErrorVM> {
        errorTitle: 'Invalid URL',
        errorDetails: 'Missing id in the URL!',
      });
    }
    return this.vmService.loadQuestions(paramId).catch(error => {
      return <ErrorVM> {
        errorTitle: 'Could not load data for the URL provided.',
        errorDetails: error.statusText || null,
      };
    });
  }
}