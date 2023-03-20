import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateTaskModel } from '../../../../../models/task.model';
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatusEnum';

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<{ todoId: string; taskId: string }>();
  @Output() updateTaskEvent = new EventEmitter<{
    todoId: string;
    taskId: string;
    model: UpdateTaskModel;
  }>();
  taskStatusEnum = TaskStatusEnum;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id });
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    const model = {
      ...this.task,
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    };
    this.updateTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model });
  }
}
