import { Component, input } from "@angular/core";
import { Menu } from "./menu.component";
import { WeekMenu } from "../interfaces/menu.interface";
import { MatProgressSpinner, MatSpinner } from "@angular/material/progress-spinner";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: "app-menus-table",
  imports: [Menu, MatProgressSpinner],
  template: `<table>
    <thead>
      <tr>
        <th>Lundi</th>
        <th>Mardi</th>
        <th>Mercredi</th>
        <th>Jeudi</th>
        <th>Vendredi</th>
        <th>Samedi</th>
        <th>Dimanche</th>
      </tr>
    </thead>
    <tbody>
    @if (!WeekMenu()) {
      <mat-spinner />
    } @else {
      <tr>
        <td><app-menu [params]="WeekMenu()!.mon.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.tue.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.wed.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.thu.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.fri.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.sat.breakfast" /></td>
        <td><app-menu [params]="WeekMenu()!.sun.breakfast" /></td>
      </tr>
      <tr>
        <td><app-menu [params]="WeekMenu()!.mon.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.tue.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.wed.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.thu.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.fri.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.sat.lunch" /></td>
        <td><app-menu [params]="WeekMenu()!.sun.lunch" /></td>
      </tr>
      <tr>
        <td><app-menu [params]="WeekMenu()!.mon.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.tue.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.wed.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.thu.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.fri.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.sat.dinner" /></td>
        <td><app-menu [params]="WeekMenu()!.sun.dinner" /></td>
      </tr>
}
    </tbody>
  </table>`,
  styles: `
  td {
  padding: 5px
  }`,
})
export class MenusTable {
  WeekMenu = input.required<WeekMenu | null>();
}
