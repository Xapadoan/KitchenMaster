import { provideHttpClient, withJsonpSupport } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import {
	provideRouter,
	type Routes,
	withComponentInputBinding,
} from "@angular/router";
import { App } from "./app/app";
import { ReadMenusScreen } from "./app/menus/read-menus.screen";

const routes: Routes = [
	{ path: ":menuId", component: ReadMenusScreen, canActivate: [() => true] },
];

bootstrapApplication(App, {
	providers: [
		provideHttpClient(withJsonpSupport()),
		provideRouter(routes, withComponentInputBinding()),
	],
}).catch((err) => console.error(err));
