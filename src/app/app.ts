import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MenusScreen } from "./menus/menus.screen";

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
