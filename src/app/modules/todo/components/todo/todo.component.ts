import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  first
} from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, OnDestroy {

  id: string = 'id';
  public todoTask!: FormGroup;

  constructor(private todoService: TodoService,  private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.getIdFromUrl();
  }

  private buildForm(): void {
    this.todoTask = new FormGroup({
      id: new FormControl(),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      category: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      done:  new FormControl(null, [Validators.required]),
      deadline:  new FormControl(null, [Validators.required]),
      userId: new FormControl(),
    });
  }

  private ngUnsubscribe = new Subject();


  public getIdFromUrl(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getTodoTaskById();
    }
  }

  private getTodoTaskById(): void {
    this.todoService
      .getTodoTaskById(this.id!)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.todoTask.patchValue(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

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
          this.router.navigate(['/tasks']);
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
          this.router.navigate(['/tasks']);
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
