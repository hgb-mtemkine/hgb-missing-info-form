import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import * as GTARest from 'core/gen/gtarest';
import { MissingInfoVM, MissingInfoCategoryVM, MissingInfoQuestionVM, QuestionFormControlType } from 'core/models/missing-info-vm';


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
        };
      else if (dtoQue == GTARest.MissingInfoDataType.Time)
        yield <MissingInfoQuestionVM> {
          text: "Time",
          controlType: QuestionFormControlType.Time,
        };
      else if (dtoQue == GTARest.MissingInfoDataType.DateTime) {
        yield <MissingInfoQuestionVM> {
          text: "Date",
          controlType: QuestionFormControlType.Date,
        };
        yield <MissingInfoQuestionVM> {
          text: "Time",
          controlType: QuestionFormControlType.Time,
        };
      }
      else if (dtoQue == GTARest.MissingInfoDataType.Destination)
        yield <MissingInfoQuestionVM> {
          text: "Destination",
          controlType: QuestionFormControlType.Text,
        };
      else if (dtoQue == GTARest.MissingInfoDataType.VerifyHotel)
        yield <MissingInfoQuestionVM> {
          text: "Do you want a hotel?",
          controlType: QuestionFormControlType.Checkbox,
        };
    }
  }

}
