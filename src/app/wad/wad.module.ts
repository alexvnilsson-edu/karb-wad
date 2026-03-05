import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { WadElement } from './rendering/element';

import { CircleleWadElement } from './rendering/circle';
import { RectangleWadElement } from './rendering/rectangle';
import { TriangleWadElement } from './rendering/triangle';
import { LineWadElement } from './rendering/line';

import { LineWadSystemElement } from './rendering/system/line';
import { TextWadSystemElement } from './rendering/system/text';

import { CommandInput } from './cli/command-input/command-input';

import { ElementService } from './elements/element.service';
import { RenderService } from './rendering/render.service';
import { FormsModule } from '@angular/forms';

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
