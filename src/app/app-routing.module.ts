import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';

// Pages
import { HomeComponent } from './modules/home/pages/home/home.component';
import { TodoComponent } from './modules/todo/components/todo/todo.component';
import { TodoListComponent } from './modules/todo/components/todo-list/todo-list.component';
import { authGuard } from './core/guards/auth.guard';

// { path: 'add', component: TodoComponent },
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: TodoListComponent, canActivate: [authGuard] },
      { path: 'create', component: TodoComponent, canActivate: [authGuard] },
      { path: 'edit/:id', component: TodoComponent, canActivate: [authGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
