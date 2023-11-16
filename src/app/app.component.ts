import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'projeto-todoList';

  ngOnInit(): void {
    localStorage.setItem('USER_ROLES', JSON.stringify(['ADMIN']));
  }
}
