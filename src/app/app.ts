import { Component } from '@angular/core';
import { RenderViewComponent } from './rendering/render-view/render-view.component';
import { WadModule } from './wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [WadModule, RenderViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
