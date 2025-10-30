import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule, MatInputModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Output() remove = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string; title: string }>();

  editMode = false;
  editedTitle = '';

  deleteTask(id: string) {
    this.remove.emit(id);
  }

  enableEdit() {
    this.editMode = true;
    this.editedTitle = this.task.title;
  }

  saveEdit() {
    if (!this.editedTitle.trim()) return;
    this.update.emit({ id: this.task.id, title: this.editedTitle });
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
