import { Injectable } from '@angular/core';
import { ICurrentLoginUser } from '../models/current-login-user';

@Injectable({
  providedIn: 'root',
})
export class Localstorage {

 private emptyLsData: ICurrentLoginUser = {
  token: undefined,
  email: undefined,
  password: undefined,
  isActive: true 
 }

 /**
  * To set empty data object in the LS
  */
  public setEmptyLsData() {
    localStorage.setItem('currentLoginUser', JSON.stringify(this.emptyLsData));
  }


  //getter
  public getLsData(): ICurrentLoginUser {
    return JSON.parse(localStorage.getItem('currentLoginUser') || '{}')
  }


  //setter
  public setLsData(data: ICurrentLoginUser) {
    localStorage.setItem('currentLoginUser', JSON.stringify(data))
  }


  //remove whole ls data of the currentLoginUser
  public removeLsData() {
    localStorage.removeItem('currentLoginUser');
  }

  //remove whole ls data
  public clearLsData() {
    localStorage.clear();
  }


  // checks  if ls data currentLoginUser exists or not 
  public isLsDataExist(): boolean {
    return localStorage.getItem('currentLoginUser') ? true : false;
  }


}
