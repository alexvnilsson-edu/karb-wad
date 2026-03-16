import { Directive } from '@angular/core';
import { WadRectangleElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadRectangleElement]',
})
export class WadRectangleElementDirective extends WadElementBaseDirective<WadRectangleElementModel> {}
