import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: string, updated: Partial<Task>) {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, ...updated } : t
    );
    this.tasksSubject.next([...this.tasks]);
  }
}
