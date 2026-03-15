import { NgModule } from '@angular/core';

import { WadElementComponent } from './rendering/element.component';

import { LineWadElementComponent } from './rendering/line/line.component';
import { PolylineWadElement } from './rendering/polyline/polyline.component';
import { RectangleWadElementComponent } from './rendering/rectangle/rectangle.component';
import { TriangleWadElementComponent } from './rendering/triangle/triangle.component';

import { LineWadSystemElement } from './rendering/system/line';
import { TextWadSystemElement } from './rendering/system/text';

import { WadCommandInput } from './cli/command-input/command-input';
import { WadCommandLog } from './cli/command-log/command-log';

import { FormsModule } from '@angular/forms';
import { CircleWadElementComponent } from './rendering/circle';
import { WadElementService } from './rendering/element.service';
import { WadRenderService } from './rendering/render.service';

const ELEMENT_DECLARATIONS = [
  WadElementComponent,
  CircleWadElementComponent,
  PolylineWadElement,
  RectangleWadElementComponent,
  TriangleWadElementComponent,
  LineWadElementComponent,

  LineWadSystemElement,
  TextWadSystemElement,
];

const COMMAND_DECLARATIONS = [WadCommandInput, WadCommandLog];

@NgModule({
  imports: [FormsModule],
  declarations: [COMMAND_DECLARATIONS, ELEMENT_DECLARATIONS],
  providers: [WadElementService, WadRenderService],
  exports: [COMMAND_DECLARATIONS, ELEMENT_DECLARATIONS],
})
export class WadModule {}
