import { InjectionToken } from '@angular/core';
import { MissingInfoVM, MissingInfoRFM } from 'core/models/missing-info-vm';


export let iVmService = new InjectionToken<IVmService>('IVmService');

export interface IVmService {
  submitMissingInfo(info: MissingInfoRFM): Promise<void>;
  loadQuestions(id: string): Promise<MissingInfoVM>;
}
