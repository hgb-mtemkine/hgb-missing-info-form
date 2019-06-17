import { InjectionToken } from '@angular/core';
import { MissingInfoVM } from 'core/models/missing-info-vm';


export let iVmService = new InjectionToken<IVmService>('IVmService');

export interface IVmService {
  loadQuestions(id: string): Promise<MissingInfoVM>;
}
