import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivationEnd, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { WadModule } from '../wad/wad.module';
import { ElementsService } from '../wad/services/elements.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private elementsService = inject(ElementsService)

  private activatedRoute = inject(ActivatedRoute);
  title = signal("TITLE");

  constructor() {
    this.activatedRoute.title.subscribe(t => console.debug(t));
    this.activatedRoute.title.subscribe(title => this.title.set(title || "TITLE NULL"));
  }
}
