import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false;
  constructor() { }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  signIn() {
    this.isAuth = true;
  }
  signOut() {
    this.isAuth = false;
  }
}