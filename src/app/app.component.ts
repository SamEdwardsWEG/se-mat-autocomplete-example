import { Component, OnInit } from "@angular/core";

import { FormControl } from "@angular/forms";

import { Observable, of } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userControl = new FormControl();

  selectedUsers = [];

  users: Observable<User[]> = of([
    {
      name: "Sam Edwards",
      email: "sam.g.edwards@warwick.ac.uk"
    },
    {
      name: "Sam Edwards",
      email: "uk_sam2003@hotmail.com"
    },
    {
      name: "Hayley McCabe",
      email: "hayleyjanemccabe@hotmail.co.uk"
    },
    {
      name: "Hayley Edwards",
      email: "hayleyedwards@hotmail.com"
    }
  ]);
  filteredUsers = this.users;

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
