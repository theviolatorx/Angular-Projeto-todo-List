import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../../home/model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck{
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]');

constructor(){}

ngDoCheck(): void {
  this.setLocalStorage();
 
}

public setEmitTaskList(event: string){
  this.taskList.push(
    {task: event, checked: false}
  )
}

  public deleteItemTaskList(event: number): void {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(): void {
    const confirm: boolean = window.confirm('Você deseja Deletar Tudo?');
    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task esta vazia. Deseja Deletar?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
