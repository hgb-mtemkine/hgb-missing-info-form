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
  controlType: QuestionFormControlType;
}

//-------------------------------------------------------------------------------------------------------------------------------------

export class MissingInfoVM {
  categories: MissingInfoCategoryVM[];
}