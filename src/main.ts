import { provideHttpClient, withJsonpSupport } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import {
	provideRouter,
	type Routes,
	withComponentInputBinding,
} from "@angular/router";
import { App } from "./app/app";
import { EditMenusScreen } from "./app/menus/edit-menus.screen";
import { ReadMenusScreen } from "./app/menus/read-menus.screen";

const routes: Routes = [
	{
		path: ":menuId/edit",
		component: EditMenusScreen,
	},
	{
		path: "edit/:menuId",
		component: EditMenusScreen,
	},
	{
		path: ":menuId",
		component: ReadMenusScreen,
	},
];

bootstrapApplication(App, {
	providers: [
		provideHttpClient(withJsonpSupport()),
		provideRouter(routes, withComponentInputBinding()),
	],
}).catch((err) => console.error(err));
