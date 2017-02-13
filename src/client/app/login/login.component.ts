import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string;

  constructor(private authService: AuthService) {}

  login(): boolean {
    let data = JSON.stringify({'email':this.email, 'password':this.password});
    let response = this.authService.login(data);
    response.subscribe();
    return false;
  }
}
