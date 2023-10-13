import { Component } from '@angular/core';

//Interface
import { TaskList } from './../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public taskList: Array<TaskList> = [
    { task: 'teste', checked: false },
    { task: 'teste', checked: true },
  ];

  public deleteItemTaskList(event: number): void {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(): void {
    const confirm: boolean = window.confirm('Você deseja Deletar Tudo?');
    if (confirm) {
      this.taskList = [];
    }
  }
}
