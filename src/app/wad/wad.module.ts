import { NgModule } from '@angular/core';

import { WadElementComponent } from './rendering/element.component';

import { LineWadElementComponent } from './rendering/line/line.component';
import { PolylineWadElement } from './rendering/polyline/polyline.component';
import { RectangleWadElementComponent } from './rendering/rectangle/rectangle.component';
import { TriangleWadElementComponent } from './rendering/triangle/triangle.component';

import { LineWadSystemElement } from './rendering/system/line';
import { TextWadSystemElement } from './rendering/system/text';

import { CommandInput } from './cli/command-input/command-input';

import { FormsModule } from '@angular/forms';
import { CircleWadElementComponent } from './rendering/circle';
import { WadElementService } from './rendering/element.service';
import { WadRenderService } from './rendering/render.service';

const ELEMENTS = [
  WadElementComponent,
  CircleWadElementComponent,
  PolylineWadElement,
  RectangleWadElementComponent,
  TriangleWadElementComponent,
  LineWadElementComponent,
];

const SYSTEM_ELEMENTS = [LineWadSystemElement, TextWadSystemElement];

@NgModule({
  imports: [FormsModule],
  declarations: [CommandInput, ELEMENTS, SYSTEM_ELEMENTS],
  providers: [WadElementService, WadRenderService],
  exports: [CommandInput, ELEMENTS, SYSTEM_ELEMENTS],
})
export class WadModule {}
