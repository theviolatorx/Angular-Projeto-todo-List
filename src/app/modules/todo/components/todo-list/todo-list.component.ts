import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../../home/model/task-list';
import { TodoService } from '../../services/todo.service';
import { first } from 'rxjs';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoTasks: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTasks();
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
}
