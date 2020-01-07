import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import {User} from './app.component';

@Injectable()
export class DataService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of([
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
  }

}