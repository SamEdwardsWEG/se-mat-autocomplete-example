import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Observable, of } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

import {DataService} from './data-service.service';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  userControl = new FormControl();
  selectedUsers = [];
  users: Observable<User[]> = this.dataService.getUsers();
  filteredUsers = this.users;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.userControl.valueChanges.pipe(
      startWith(''),
      tap(console.log),
      map(value => (value ? this._filterUsers(value) : this.users))
    ).subscribe(res => this.filteredUsers = res);
  }

  submit() {
    this.selectedUsers.push(this.userControl.value);
    console.log(this.selectedUsers);
  }

  private _filterUsers(value: string): Observable<User[]> {
    const filterValue = value.toLowerCase();

    if (filterValue.length >= 3) {
      return this.users.pipe(
        map(users => {
          return users.filter(
            user =>
              user.name.toLowerCase().includes(filterValue) ||
              user.email.toLowerCase().includes(filterValue)
        )}
      )
      );
    } else {
      return this.users;
    }
  }
}

export interface User {
  name: string;
  email: string;
}
