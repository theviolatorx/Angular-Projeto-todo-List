import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TodoListComponent } from '../todo/components/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/header.component';

// Page
import { LoginComponent } from '../../core/auth/components/login/login.component';
import { TodoComponent } from '../todo/components/todo/todo.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomDatePipe } from '../todo/pipes/custom-date.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    TodoListComponent,
    HomeComponent,
    LoginComponent,
    TodoComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]
})
export class HomeModule { }
