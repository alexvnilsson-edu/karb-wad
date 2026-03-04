import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WadModule } from './wad/wad.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
