import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivationEnd, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { WadModule } from './wad/wad.module';
import { ElementStorageService } from './wad/elements/element-storage.service';
import { WadCommandService } from './wad/cli/commands/command.service';
import { WadCommand } from './wad/cli/commands/command';
import { WadCoordinatesTransformer } from './wad/cli/commands/transformers/coordinates.transformer';
import { WadNumberTransformer } from './wad/cli/commands/transformers/number.transformer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WadModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private elementService = inject(ElementStorageService);
  private commandService = inject(WadCommandService);

  private activatedRoute = inject(ActivatedRoute);
  title = signal("TITLE");

  constructor() {
    this.activatedRoute.title.subscribe(title => this.title.set(title || "TITLE NULL"));


    this.commandService.registerTransformer("coordinates", new WadCoordinatesTransformer());
    this.commandService.registerTransformer("number", new WadNumberTransformer());

    this.registerRectangleCommand();
  }

  private registerRectangleCommand() {
    const command = new WadCommand("rectangle", new Set("rect"));
    command.addArgument("origin", "coordinates");
    command.addArgument("width", "number");
    command.addArgument("height", "number");
    this.commandService.registerCommand(command);
  }
}
