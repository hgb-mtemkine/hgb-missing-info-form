import * as GTARest from 'core/gen/gtarest';

export const NodeType = GTARest.RankerType;
export type NodeType = GTARest.RankerType;

export enum QuestionFormControlType {
  Text,
  Date,
  Time,
  Checkbox
}

export class MissingInfoCategoryVM {
  type: NodeType;
  text: string;
  questions: MissingInfoQuestionVM[];
}

export class MissingInfoQuestionVM {
  text: string;
  formControlName: keyof MissingInfoCategoryRFM;
  controlType: QuestionFormControlType;
}

//-------------------------------------------------------------------------------------------------------------------------------------

export class MissingInfoVM {
  categories: MissingInfoCategoryVM[];
}

//-------------------------------------------------------------------------------------------------------------------------------------

export class MissingInfoRFM {
  categories: MissingInfoCategoryRFM[];
}

export class MissingInfoCategoryRFM {
  destination: string;
  date: string;
  time: string;
  verifyHotel: boolean;
}