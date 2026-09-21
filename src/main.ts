import { provideHttpClient, withJsonpSupport } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import {
	provideRouter,
	type Routes,
	withComponentInputBinding,
} from "@angular/router";
import { App } from "./app/app";
import { MenusScreen } from "./app/menus/menus.screen";

const routes: Routes = [
	{ path: ":menuId", component: MenusScreen, canActivate: [() => true] },
];

bootstrapApplication(App, {
	providers: [
		provideHttpClient(withJsonpSupport()),
		provideRouter(routes, withComponentInputBinding()),
	],
}).catch((err) => console.error(err));
