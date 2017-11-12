import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth.login.template.html'
})
export class AuthLoginComponent implements OnInit {

  form: FormGroup;
  error = '';
  loading: false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit($event) {
    if (this.form.valid) {
      this.authService.login(this.form.get('username').value, this.form.get('password').value)
        .subscribe((result: any) => {
          if (result) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Username or password is incorrect';
          }
          this.loading = false;
        }, error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        });
    }

  }
}
