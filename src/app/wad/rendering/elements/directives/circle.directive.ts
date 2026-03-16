import { Directive } from '@angular/core';
import { WadCircleElementModel } from '../models/circle.model';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadCircleElement]',
})
export class WadCircleElementDirective extends WadElementBaseDirective<WadCircleElementModel> {}
