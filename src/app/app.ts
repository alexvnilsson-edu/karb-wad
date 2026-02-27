import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WadModule } from '../wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private activatedRoute = inject(ActivatedRoute);
  title = signal("TITLE");

  constructor() {
    this.activatedRoute.title.subscribe(title => this.title.set(title || "TITLE NULL"));
  }
}
