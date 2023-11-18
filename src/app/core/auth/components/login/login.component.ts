import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/core/auth/models/user-token';
import { first } from 'rxjs';
import { LoginCredentials } from 'src/app/core/auth/models/login-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public userAdmin!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.userAdmin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, this.emailValidator()]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public login(): void {
    const payload: LoginCredentials = this.userAdmin.getRawValue();
    console.log('next');
    this.loginService
      .login(payload)
      .pipe(first())
      .subscribe({
        next: (res: UserToken) => {
          localStorage.setItem('TOKEN', res.token);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Ops, algo deu errado...', 'Erro');
        },
        complete: () => {
          this.router.navigate(['home']);
          this.toastr.success('Bem vindo(a)!', 'Olá!');
        },
      });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      if (email && email.indexOf('@email.com') === -1) {
        return { 'invalidEmail': true };
      }
      return null;
    };
  }
}
