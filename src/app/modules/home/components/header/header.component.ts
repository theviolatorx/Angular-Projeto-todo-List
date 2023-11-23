import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isLogged:string = '';

  constructor(private router: Router){}

  ngOnInit(): void {
      this.isLogged = JSON.stringify(localStorage.getItem("TOKEN"));
  }

  public logout(): void{
    if (this.isLogged) {
      localStorage.removeItem('TOKEN');
      this.router.navigate(['/login']);
    }
  }
}
