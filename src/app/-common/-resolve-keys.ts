import { MissingInfoVM } from 'core/models/missing-info-vm';
import { ErrorVM } from 'core/models/error-vm';

export declare type AppResolveKeys = {
  [name in keyof AppResolveData]: any;
};

export class AppResolveData {
  missingInfoVM: MissingInfoVM & ErrorVM;
}
