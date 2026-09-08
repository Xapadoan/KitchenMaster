import { IMenuRepository } from "./menu-repository.interface";
import { menu } from "../../../assets/menus/25082026-01092026";
import { Injectable } from "@angular/core";
import { Result } from "../../toolBox/result/implementations/result";

@Injectable({ providedIn: "root" })
export class FileMenuRepository implements IMenuRepository {
  findWeeks(_: string) {
    return Promise.resolve(Result.ok(menu));
  }
}
