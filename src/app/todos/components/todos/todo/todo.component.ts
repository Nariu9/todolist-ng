import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomainTodo, FilterType } from '../../../models/todo.model';

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo;
  @Output() sendTodoIdEvent = new EventEmitter<string>();
  @Output() sendTodoTitleEvent = new EventEmitter<{ todoId: string; title: string }>();
  @Output() changeFilterEvent = new EventEmitter<{ todoId: string; filter: FilterType }>();

  titleEditing = false;
  newTitle = '';

  removeTodoHandler() {
    this.sendTodoIdEvent.emit(this.todo.id);
  }

  turnOnTitleEditing() {
    this.newTitle = this.todo.title;
    this.titleEditing = true;
  }

  editTitleHandler() {
    this.titleEditing = false;
    if (this.newTitle === this.todo.title) return;
    this.sendTodoTitleEvent.emit({ todoId: this.todo.id, title: this.newTitle });
  }

  changeFilter(filter: FilterType) {
    this.changeFilterEvent.emit({ todoId: this.todo.id, filter });
  }
}
