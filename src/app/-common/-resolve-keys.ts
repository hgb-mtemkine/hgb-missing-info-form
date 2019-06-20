import { MissingInfoVM } from 'core/models/missing-info-vm';

export declare type AppResolveKeys = {
  [name in keyof AppResolveData]: any;
};

export class AppResolveData {
  missingInfoVM: MissingInfoVM;
}
