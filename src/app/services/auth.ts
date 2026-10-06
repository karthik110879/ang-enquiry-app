import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Localstorage } from './localstorage';
import { ICurrentLoginUser } from '../models/current-login-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // a signal to track if valid user exxists 
  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('currentLoginUser'));

  // public readonly signal that components can listen to 
  isLoggedIn = computed(() => this._isLoggedIn());

  constructor(private router:Router,
    private localStorageService: Localstorage
  ){}

  login(emailId:string, password:string){
    this.localStorageService.setEmptyLsData();
    let currentUser:ICurrentLoginUser = this.localStorageService.getLsData();
    currentUser.email = emailId;
    currentUser.password = password;
    this.localStorageService.setLsData(currentUser);
    this._isLoggedIn.set(true);
    this.router.navigateByUrl('/enquiry-list');
  }

  logout() {
    this.localStorageService.removeLsData();
    this._isLoggedIn.set(false);
    this.router.navigateByUrl('/login');
  }
}
