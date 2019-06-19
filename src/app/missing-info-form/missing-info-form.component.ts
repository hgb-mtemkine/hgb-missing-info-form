import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

import { GenericReactiveForm } from '@hgb/core';

import { MissingInfoCategoryRFM, MissingInfoVM, NodeType, QuestionFormControlType, MissingInfoRFM } from 'core/models/missing-info-vm';


@Component({
  selector: 'hgb-missing-info-form',
  templateUrl: './missing-info-form.component.html',
  styleUrls: ['./missing-info-form.component.less']
})
export class MissingInfoFormComponent implements OnInit, OnDestroy {

  readonly ControlType = QuestionFormControlType;

  @Input()
  vm: MissingInfoVM;

  @Output()
  formChangedHereIsTheWholeForm = new EventEmitter<GenericReactiveForm<MissingInfoRFM>>();
  
  grform: GenericReactiveForm<MissingInfoRFM>;
  rfaCategories: FormArray;
  private subscriptionr_formValueChanges: Subscription;

  // private genericReactiveForm: GenericReactiveForm<ForgotPasswordRFM>;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.grform = new GenericReactiveForm<MissingInfoRFM>(this.formBuilder, {
      categories: this.rfaCategories = this.formBuilder.array(_.map(this.vm.categories, cat => GenericReactiveForm.MakeForm<MissingInfoCategoryRFM>(this.formBuilder, {
        destination: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        verifyHotel: new FormControl(false, [Validators.required]),
      })))
    });
    
    this.formChangedHereIsTheWholeForm.emit(this.grform);
    this.subscriptionr_formValueChanges = this.grform.formGroup.valueChanges.subscribe(formDataWhatever => this.formChangedHereIsTheWholeForm.emit(this.grform));
  }

  ngOnDestroy() {
    this.subscriptionr_formValueChanges.unsubscribe();
  }

}

//=====================================================================================================================================

@Pipe({
  name: 'imageSrcNodeType'
})
export class ImageSrcNodeTypePipe implements PipeTransform {
  transform(type: NodeType): any {
    return type == NodeType.Flight
      ? "assets/images/flight.png"
      : type == NodeType.Hotel
      ? "assets/images/hotel.png"
      : null
  }
}

//=====================================================================================================================================

