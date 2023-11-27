import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    localStorage.setItem('USER_ROLES', JSON.stringify(['ADMIN']));
  }

  // TODO: Fechou a janela, ele desloga!
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: any) {
    localStorage.removeItem('TOKEN');
    console.clear();
  }
 
}
