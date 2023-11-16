import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { User } from '../../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''
  userAdmin: FormGroup;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.userAdmin = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.loginService.getUserFromLocalStorage())

    const currentUser = this.loginService.getUserFromLocalStorage()
    if (currentUser && currentUser.length > 0) {
      this.username = JSON.parse(currentUser)[0].username;
      this.password = JSON.parse(currentUser)[0].password;
    } else {
      this.username = 'N/A';
    }
    console.log(this.checkUser())
  }

  checkUser(): boolean {
    return !!this.username && !!this.password;
  }


  onRegisterSubmit(userAdmin: User) {
    this.loginService.saveUserToLocalStorage(userAdmin);
    location.reload();
  }

  onLoginSubmit(userAdmin: User) {
    if (this.username == userAdmin.username && this.password == userAdmin.password) {
      this.router.navigate(['home']);
      this.toastr.success('Bem vindo(a)!', 'Olá!');
    } else {
      this.toastr.error('Usuário ou senha inexistente.', 'Erro');
    }
  }
}
