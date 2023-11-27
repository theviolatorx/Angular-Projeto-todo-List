import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit, OnDestroy {
  public title:string = '';
  id: string = 'id';
  public todoTask!: FormGroup;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getIdFromUrl();
  }

  private buildForm(): void {
    this.todoTask = new FormGroup({
      id: new FormControl(),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      done: new FormControl(false),
      deadline: new FormControl(null, [Validators.required]),
      userId: new FormControl(),
    });
  }

  private ngUnsubscribe = new Subject();

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  public getIdFromUrl(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getTodoTaskById();
      this.title = 'Edição de Tarefa';
    } else {
      this.title = 'Nova Tarefa';
    }
  }

  private getTodoTaskById(): void {
    this.todoService
      .getTodoTaskById(this.id!)
      .pipe(first())
      .subscribe({
        next: (res) => {
          const dados: Todo = res;
          dados.deadline = this.convertDate(res.deadline);
          this.todoTask.patchValue(dados);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private convertDate(date: string): string {
    const data = date.toString();
    const dia = data.substring(8,10).padStart(2,'0');
    const mes = String(parseInt(data.substring(5,7))).padStart(2,'0');
    const ano = parseInt(data.substring(0,4));
    return `${ano}-${mes}-${dia}`;
  }

  // return `${ano}-${mes}-${dia}`;
  public onSave(): void {
    if (this.id) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  public onCreate(): void {
    this.todoService
      .addTodoTask(this.todoTask.getRawValue())
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/home']);
        },
      });
  }

  public onUpdate(): void {
    this.todoService
      .edit(this.todoTask.getRawValue())
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/home']);
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
