import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../../home/model/task-list';
import { TodoService } from '../../services/todo.service';
import { first } from 'rxjs';
import { Todo } from '../../models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoTasks: Todo[] = [];
  public taskId: string = '';

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    this.getTasks();
    this.taskId = '';
  }

  public navigateToCreate(): void{
    this.router.navigate(['/home/create'])
  }

  public getTasks(): void {
    this.todoService
      .getTodoTask()
      .pipe(first())
      .subscribe({
        next: (res: Todo[]) => {
          this.todoTasks = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public editUser(id: string): void {

  }

  public deleteUser(id: string): void {
   
  }

  public deleteTodoTaskById(): void {
    console.log('Excluir a task de ID:', this.taskId);
    this.todoService.deleteTodoTaskById(this.taskId)
    .pipe(first())
    .subscribe({
      error: (err) => { console.log(err); },
      complete: () => { this.ngOnInit(); },
    })
  }

  public openModalConfirmDelete(id: string): void {
    this.taskId = id;
  }
}
