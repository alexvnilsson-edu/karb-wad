import { NgModule } from '@angular/core';

import { WadElement } from './rendering/element.component';

import { CircleleWadElement } from './rendering/circle.component';
import { LineWadElement } from './rendering/line.component';
import { RectangleWadElement } from './rendering/rectangle.component';
import { TriangleWadElement } from './rendering/triangle.component';

import { LineWadSystemElement } from './rendering/system/line';
import { TextWadSystemElement } from './rendering/system/text';

import { CommandInput } from './cli/command-input/command-input';

import { FormsModule } from '@angular/forms';
import { ElementService } from './rendering/element.service';
import { RenderService } from './rendering/render.service';

const ELEMENTS = [
  WadElement,
  CircleleWadElement,
  RectangleWadElement,
  TriangleWadElement,
  LineWadElement,
];

const SYSTEM_ELEMENTS = [LineWadSystemElement, TextWadSystemElement];

@NgModule({
  imports: [FormsModule],
  declarations: [CommandInput, ELEMENTS, SYSTEM_ELEMENTS],
  providers: [ElementService, RenderService],
  exports: [CommandInput, ELEMENTS, SYSTEM_ELEMENTS],
})
export class WadModule {}
