import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userName: string = '';

  constructor() { }

  getUserName():string {
    return this.userName;
  }

  setUserName(name: string):void {
    this.userName = name;
  }
}
