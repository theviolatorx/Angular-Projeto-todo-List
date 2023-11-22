import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { UserToken } from 'src/app/core/auth/models/user-token';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiBaseUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  public addTodoTask(todoTask: Todo): Observable<UserToken> {
    return this.http.post<UserToken>(this.apiBaseUrl, todoTask);
  }

  public getTodoTask(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiBaseUrl);
  }

  public getTodoTaskById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiBaseUrl}/${id}`);
  }

  public deleteTodoTaskById(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiBaseUrl}/${id}`);
  }

  public edit(task: Todo): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/${task.id}`, task);
  }
}
