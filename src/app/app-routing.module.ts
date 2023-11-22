import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';

// Pages
import { HomeComponent } from './modules/home/pages/home/home.component';
import { TodoComponent } from './modules/todo/components/todo/todo.component';

// TODO: Corrigir as rotas e alterar a estrutura dos componentes.
const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'add', component: TodoComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
