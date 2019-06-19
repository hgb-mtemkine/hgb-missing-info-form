import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import * as GTARest from 'core/gen/gtarest';
import { MissingInfoVM, MissingInfoCategoryVM, MissingInfoQuestionVM, QuestionFormControlType, MissingInfoCategoryRFM } from 'core/models/missing-info-vm';
import { nameof } from '@hgb/core';


@Injectable()
export class VmMappingService {
  
  constructor(
  ) { }

  mapDtoQuestions_to_VM(dto: GTARest.AgentDeskMissingInfoRequest[]): MissingInfoVM {
    return <MissingInfoVM> {
      categories: _.map(dto, dtoCat => <MissingInfoCategoryVM> {
        type: dtoCat.nodetype,
        text: dtoCat.question,
        questions: Array.from<MissingInfoQuestionVM>(this.makeQuestionFromGtarestMissingInfoDataType(dtoCat.questiontype)),
      })
    }
  }

  private *makeQuestionFromGtarestMissingInfoDataType(dtoQues: GTARest.MissingInfoDataType[]): Iterable<MissingInfoQuestionVM> {
    for (let dtoQue of dtoQues) {
      if (dtoQue == GTARest.MissingInfoDataType.Date)
        yield <MissingInfoQuestionVM> {
          text: "Date",
          controlType: QuestionFormControlType.Date,
          formControlName: nameof<MissingInfoCategoryRFM>('date')
        };
      else if (dtoQue == GTARest.MissingInfoDataType.Time)
        yield <MissingInfoQuestionVM> {
          text: "Time",
          controlType: QuestionFormControlType.Time,
          formControlName: nameof<MissingInfoCategoryRFM>('time')
        };
      else if (dtoQue == GTARest.MissingInfoDataType.DateTime) {
        yield <MissingInfoQuestionVM> {
          text: "Date",
          controlType: QuestionFormControlType.Date,
          formControlName: nameof<MissingInfoCategoryRFM>('date')
        };
        yield <MissingInfoQuestionVM> {
          text: "Time",
          controlType: QuestionFormControlType.Time,
          formControlName: nameof<MissingInfoCategoryRFM>('time')
        };
      }
      else if (dtoQue == GTARest.MissingInfoDataType.Destination)
        yield <MissingInfoQuestionVM> {
          text: "Destination",
          controlType: QuestionFormControlType.Text,
          formControlName: nameof<MissingInfoCategoryRFM>('destination')
        };
      else if (dtoQue == GTARest.MissingInfoDataType.VerifyHotel)
        yield <MissingInfoQuestionVM> {
          text: "Do you want a hotel?",
          controlType: QuestionFormControlType.Checkbox,
          formControlName: nameof<MissingInfoCategoryRFM>('verifyHotel')
        };
    }
  }

}
