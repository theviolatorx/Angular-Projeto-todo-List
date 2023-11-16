import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User[] = [];

  constructor() {
    this.getUserFromLocalStorage();
  }

  getUserByUsername(username: string){
    return this.user.find( user => user.username === username);
  }

  saveUserToLocalStorage(user: User) {
    this.user.push(user);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getUserFromLocalStorage() {
    return localStorage.getItem('user');
  }
}