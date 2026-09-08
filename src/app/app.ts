import { Component } from "@angular/core";
import { MenusScreen } from "./menus/menus.screen";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [MenusScreen, RouterLink, RouterLinkActive, RouterOutlet],
  template: `<main>
    <router-outlet></router-outlet>
  </main>`,
  styleUrls: ["./app.css"],
})
export class App {
  title = "default";
}
