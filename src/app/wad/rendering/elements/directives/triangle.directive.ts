import { Directive } from '@angular/core';
import { WadTriangleElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadTriangleElement]',
})
export class WadTriangleElementDirective extends WadElementBaseDirective<WadTriangleElementModel> {}
