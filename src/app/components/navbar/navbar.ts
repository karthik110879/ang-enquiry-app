import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(AuthService);
  private router = inject(Router);
  isUserLoggedIn:boolean = this.auth.isLoggedIn();
  
  isLoginRoute = toSignal(
    this.router.events.pipe(
      filter(evt  => evt instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/login')),
    ),
    {initialValue: this.router.url.startsWith('/login')}
  );

  logout() {
    console.log(this.isUserLoggedIn)
    this.auth.logout();
    console.log(this.isUserLoggedIn)
  }

  adminLogin() {

  }
}
