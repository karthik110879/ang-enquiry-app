import { Component, inject } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth';
import { Navbar } from '../navbar/navbar';
import { constants } from '../../constants';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  users:IUser[] = constants.users;

  // DIs
  private router = inject(Router);
  private authService = inject(AuthService)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })


  /**
 * Disable the login button if the form is invalid or pristine
 * @returns boolean
 */
  disableLoginButton() {
    return this.loginForm.invalid || this.loginForm.pristine;
  }

  /**
 * On submit logic
 */
  onSubmit() {
    console.log(this.loginForm.value);

    //find the user exist in the user array
    const existingUser = this.users.find(user => user.email === this.loginForm.value.email);

    // if user is present check the password and login accordingly 
    if(existingUser) {
      if(existingUser.password === this.loginForm.value.password) {
        // pass the login to auth service
        this.authService.login( existingUser.email , this.loginForm.value.password);
      }else {
        alert('Invalid password');
      }
    }else {
      alert('User not found');
    }
  }
  

}
