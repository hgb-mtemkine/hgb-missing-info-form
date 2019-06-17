import { InjectionToken } from '@angular/core';
import { MissingInfoQuestionsVM } from 'core/models/missing-info-vm';


export let iVmService = new InjectionToken<IVmService>('IVmService');

export interface IVmService {
  loadQuestions(id: string): Promise<MissingInfoQuestionsVM>;
}
