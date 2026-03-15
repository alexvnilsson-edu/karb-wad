import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { WadModule } from './wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [WadModule, MatToolbarModule, RenderViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
