import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { Observable } from 'rxjs';
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

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks(this.todoId);
  }
}
