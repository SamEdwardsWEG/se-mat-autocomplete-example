import { Component } from '@angular/core';

import { FormControl } from '@angular/forms'

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  filteredUsers: Observable<User[]>;
  userControl = new FormControl();

  users: User[] = [
    {
      firstName: 'Sam',
      lastName: 'Edwards',
      email: 'sam.g.edwards@warwick.ac.uk'
    },
    {
      firstName: 'Sam',
      lastName: 'Edwards',
      email: 'uk_sam2003@hotmail.com'
    },
    {
      firstName: 'Hayley',
      lastName: 'McCabe',
      email: 'hayleyjanemccabe@hotmail.co.uk'
    },
    {
      firstName: 'Hayley',
      lastName: 'Edwards',
      email: 'hayleyedwards@hotmail.com'
    }
  ];

  constructor() {
    this.filteredUsers = this.userControl.valueChanges
    .pipe(
      startWith(''),
      map(user => user ? this._filterUsers(user) : this.users.slice())
    )
  }

  submit() {
    console.log(this.userControl.value)
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.firstName.toLowerCase().includes(filterValue)
        || user.lastName.toLowerCase().includes(filterValue)
        || user.email.toLowerCase().includes(filterValue));
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}