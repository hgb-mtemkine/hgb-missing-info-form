import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';

import { MissingInfoVM, NodeType, QuestionFormControlType } from 'core/models/missing-info-vm';


@Component({
  selector: 'hgb-missing-info-form',
  templateUrl: './missing-info-form.component.html',
  styleUrls: ['./missing-info-form.component.less']
})
export class MissingInfoFormComponent implements OnInit {

  readonly ControlType = QuestionFormControlType;

  @Input()
  vm: MissingInfoVM;

  constructor() { }

  ngOnInit() {
  }

}


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