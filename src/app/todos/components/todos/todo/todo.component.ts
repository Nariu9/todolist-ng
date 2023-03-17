import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from '../../../models/todos.model'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() sendTodoIdEvent = new EventEmitter<string>()

  removeTodoHandler() {
    this.sendTodoIdEvent.emit(this.todo.id)
  }
}
