import { Component, Inject, Input, OnInit, WritableSignal, input, signal } from "@angular/core";
import { WeekMenu } from "./interfaces/menu.interface";
import { MenusTable } from "./components/menus-table.component";
import { IMenuRepository } from "./repositories/menu-repository.interface";
import { HttpMenuRepository } from "./repositories/http-menu-repository";
import { CreateShoppingListButton } from "../shopping-lists/components/create-shopping-list-button.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-menus-screen",
  imports: [MenusTable, CreateShoppingListButton, MatProgressSpinner],
  template: `
  <header>
    <app-create-shopping-list-button [weekMenu]="this.weekMenu()" />
    </header>
  @if (this.loading()) {
    <mat-spinner />
    } @else if (this.error()) {
    <p>Error<p>
    } @else {
    <app-menus-table [WeekMenu]="this.weekMenu()" />
    }`,
  styles: ``,
})
export class MenusScreen implements OnInit {
  loading: WritableSignal<boolean> = signal(false)
  error: WritableSignal<string | null> = signal(null)
  weekMenu: WritableSignal<WeekMenu | null> = signal(null)
  @Input({ required: true }) menuId!: string

  constructor(
    @Inject(HttpMenuRepository)
    private readonly repository: IMenuRepository,
  ) {}

  ngOnInit() {
    this.error.set(null)
    this.loading.set(true)
    this.repository.findWeeks(this.menuId)
      .then((menu) => {
        if (menu.isErr()) {
          console.error(menu.unwrapErr())
          const repoError = menu.unwrapErr()
          this.error.set(`[${repoError.code}]: ${repoError.error}`)
        } else {
          this.weekMenu.set(menu.unwrap())
        }
      })
      .catch(() => {
        this.error.set("[Unknown]: Unknown")
      })
      .finally(() => {
        this.loading.set(false)
      })
  }
}
