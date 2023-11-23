import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';

// Pages
import { HomeComponent } from './modules/home/pages/home/home.component';
import { TodoComponent } from './modules/todo/components/todo/todo.component';
import { TodoListComponent } from './modules/todo/components/todo-list/todo-list.component';

// { path: 'add', component: TodoComponent },
// TODO: Corrigir as rotas e alterar a estrutura dos componentes.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,  children: [
    { path: '', component: TodoListComponent },
    { path: 'add', component: TodoComponent },
  ]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
