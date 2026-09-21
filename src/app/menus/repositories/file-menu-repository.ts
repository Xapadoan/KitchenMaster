import { Injectable } from "@angular/core";
import { menu } from "../../../assets/menus/25082026-01092026";
import { Result } from "../../toolBox/result/implementations/result";
import type { IMenuRepository } from "./menu-repository.interface";

@Injectable({ providedIn: "root" })
export class FileMenuRepository implements IMenuRepository {
	findWeeks(_: string) {
		return Promise.resolve(Result.ok(menu));
	}
}
