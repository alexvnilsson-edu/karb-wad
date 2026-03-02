import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivationEnd, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { WadModule } from '../wad/wad.module';
import { ElementStorageService } from '../wad/elements/element-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private elementService = inject(ElementStorageService)

  private activatedRoute = inject(ActivatedRoute);
  title = signal("TITLE");

  constructor() {
    this.activatedRoute.title.subscribe(title => this.title.set(title || "TITLE NULL"));
  }
}
