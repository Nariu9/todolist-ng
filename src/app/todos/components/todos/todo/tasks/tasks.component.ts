import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { map, Observable } from 'rxjs';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  @Input() todoId!: string;
  tasks$?: Observable<Task[]>;
  taskTitle = '';

  ngOnInit(): void {
    // subscription
    this.tasks$ = this.tasksService.tasks$.pipe(map(todoTasks => todoTasks[this.todoId]));

    this.tasksService.getTasks(this.todoId);
  }

  addTasHandler() {
    this.tasksService.addTask({ todoId: this.todoId, title: this.taskTitle });
    this.taskTitle = '';
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data);
  }
}
