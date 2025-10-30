import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [
    CommonModule,
    FormsModule, // ✅ Required for [(ngModel)] binding
    NgFor,
    NgIf,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: string | null = null;
  editedTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // ✅ Subscribe to the task list updates
    this.taskService.tasks$.subscribe((arr: Task[]) => {
      this.tasks = arr;
    });
  }

  // ✅ Delete a task
  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  // ✅ Start editing mode for a task
  startEditing(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
  }

  // ✅ Save the edited task
  saveEdit(task: Task): void {
    if (this.editedTitle.trim()) {
      this.taskService.updateTask(task.id, { title: this.editedTitle.trim() });
      this.editingTaskId = null;
    }
  }

  // ✅ Cancel editing mode
  cancelEdit(): void {
    this.editingTaskId = null;
  }
}
