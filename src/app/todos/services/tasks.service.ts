import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GetTasksResponse, Task, TodoTasks, UpdateTaskModel } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonResponse } from '../../core/models/core.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<TodoTasks>({});

  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe(tasks => {
        const todoTasks = this.tasks$.getValue();
        todoTasks[todoId] = tasks;
        this.tasks$.next(todoTasks);
      });
  }

  addTask(data: { todoId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseURL}/todo-lists/${data.todoId}/tasks`,
        { title: data.title }
      )
      .pipe(
        map(res => {
          const todoTasks = this.tasks$.getValue();
          const newTask = res.data.item;
          todoTasks[data.todoId] = [newTask, ...todoTasks[data.todoId]];
          return todoTasks;
        })
      )
      .subscribe(todoTasks => {
        this.tasks$.next(todoTasks);
      });
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseURL}/todo-lists/${data.todoId}/tasks/${data.taskId}`
      )
      .pipe(
        map(() => {
          const todoTasks = this.tasks$.getValue();
          todoTasks[data.todoId] = todoTasks[data.todoId].filter(task => task.id !== data.taskId);
          return todoTasks;
        })
      )
      .subscribe(todoTasks => {
        this.tasks$.next(todoTasks);
      });
  }

  updateTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<CommonResponse<{ item: Task }>>(
        `${environment.baseURL}/todo-lists/${data.todoId}/tasks/${data.taskId}`,
        data.model
      )
      .pipe(
        map(res => {
          const todoTasks = this.tasks$.getValue();
          todoTasks[data.todoId] = todoTasks[data.todoId].map(task =>
            task.id === data.taskId ? { ...task, ...res.data.item } : task
          );
          return todoTasks;
        })
      )
      .subscribe(todoTasks => {
        this.tasks$.next(todoTasks);
      });
  }
}
