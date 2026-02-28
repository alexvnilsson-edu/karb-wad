import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WadModule } from '../wad/wad.module';
import { ElementsService } from '../wad/services/elements.service';
import { SquareWadElement } from '../wad/elements/models/square';
import { coordify } from '../wad/types/coordinate';
import { TriangleWadElement } from '../wad/elements/models/triangle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private elementsService = inject(ElementsService)

  private activatedRoute = inject(ActivatedRoute);
  title = signal("TITLE");

  constructor() {
    this.activatedRoute.title.subscribe(title => this.title.set(title || "TITLE NULL"));
  }
}
