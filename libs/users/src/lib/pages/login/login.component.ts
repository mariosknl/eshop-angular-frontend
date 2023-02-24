import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password or wrong';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(): void {
    this.loginFormGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };
    this.authService.login(loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, please try again later';
        }
      },
    );
  }
}
