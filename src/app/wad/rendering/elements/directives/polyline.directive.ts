import { Directive } from '@angular/core';
import { WadPolylineElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadPolylineElement]',
})
export class WadPolylineElementDirective extends WadElementBaseDirective<WadPolylineElementModel> {}
