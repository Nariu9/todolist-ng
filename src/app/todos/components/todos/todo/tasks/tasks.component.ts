import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Task, UpdateTaskModel } from '../../../../models/task.model';
import { TodosService } from '../../../../services/todos.service';
import { TaskStatusEnum } from '../../../../../core/enums/taskStatusEnum';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  @Input() todoId!: string;
  tasks$?: Observable<Task[]>;
  taskTitle = '';

  ngOnInit(): void {
    // subscription

    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0];
        const todos = res[1];
        let activeTodoTasks = tasks[this.todoId];
        const activeTodo = todos.find(tl => tl.id === this.todoId);

        if (activeTodo?.filter === 'active') {
          activeTodoTasks = activeTodoTasks.filter(t => t.status === TaskStatusEnum.active);
        } else if (activeTodo?.filter === 'completed') {
          activeTodoTasks = activeTodoTasks.filter(t => t.status === TaskStatusEnum.completed);
        }
        return activeTodoTasks;
      })
    );

    this.tasksService.getTasks(this.todoId);
  }

  addTasHandler() {
    this.tasksService.addTask({ todoId: this.todoId, title: this.taskTitle });
    this.taskTitle = '';
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data);
  }

  updateTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data);
  }
}
