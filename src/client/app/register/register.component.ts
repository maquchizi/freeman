import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { User } from './register.interface';

/**
 * This class represents the lazy loaded RegisterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  user: FormGroup;
  constructor(private authService: AuthService, private fmbuilder: FormBuilder) {}
  ngOnInit() {
    this.user = this.fmbuilder.group({
      forename: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      pwd: this.fmbuilder.group({
        password: ['', Validators.required],
        confirm_password: ['', Validators.required]
      }, {validator: this.passwordValidator})
    });
  }

  passwordValidator(group: FormGroup) {
    return group.get('password').value !== '' &&
      group.get('password').value !== group.get('confirm_password').value ? { 'notequals': true } : null;
  }

  emailValidator(email: FormControl) {
    let EMAIL_REGEXP =
    new RegExp (['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
                    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
                    '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
                    '[a-zA-Z]{2,}))$'].join(''));
    return EMAIL_REGEXP.test(email.value) ? null : { 'invalidemail': true };
  }

  register({ value, valid }: { value: User, valid: boolean }): boolean {
    let data = JSON.stringify({
      'forename':value.forename,
      'surname':value.surname,
      'email':value.email,
      'password':value.pwd.password
    });
    let response = this.authService.register(data);
    response.subscribe();
    return false;
  }
}
