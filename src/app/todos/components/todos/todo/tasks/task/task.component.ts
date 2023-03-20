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
  newTaskTitle = '';
  titleEditing = false;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id });
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    this.changeTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    });
  }

  turnOnTitleEditing() {
    this.titleEditing = true;
    this.newTaskTitle = this.task.title;
  }

  changeTaskTitleHandler() {
    this.titleEditing = false;
    if (this.newTaskTitle === this.task.title) return;
    this.changeTask({ title: this.newTaskTitle });
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      title: this.task.title,
      description: this.task.description,
      completed: this.task.completed,
      status: this.task.status,
      priority: this.task.priority,
      startDate: this.task.startDate,
      deadline: this.task.deadline,
      ...patch,
    };
    this.updateTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model });
  }
}
