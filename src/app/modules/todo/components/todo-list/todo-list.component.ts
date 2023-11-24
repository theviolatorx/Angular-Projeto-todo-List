import { Component, OnInit } from '@angular/core';

//Interface
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoTasks: Todo[] = [];
  public taskId: string = '';
  public taskDoneChance: boolean[] = [];

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
          this.todoTasks.sort((first, last) => Number(first.done) - Number(last.done));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public deleteTodoTaskById(): void {
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

  public onTaskDoneChange(task: Todo, index: number): void{
    this.onUpdate(task);
  }

  public onUpdate(task: Todo): void {
    this.todoService
      .edit(task)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
        },
      });
  }
}
