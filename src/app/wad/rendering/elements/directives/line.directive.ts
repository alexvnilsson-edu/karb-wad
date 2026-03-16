import { Directive } from '@angular/core';
import { WadLineElementModel } from '../models';
import { WadElementBaseDirective } from './base.directive';

@Directive({
  selector: '[appWadLineElement]',
})
export class WadLineElementDirective extends WadElementBaseDirective<WadLineElementModel> {}
