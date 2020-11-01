import {Component, OnInit} from '@angular/core';
import {Fib} from "./fib";
import {Task} from '../model/task';
import {TaskManagerService} from "../task-manager/task-manager.service";

@Component({
  selector: 'app-fib-request',
  templateUrl: './fib-request.component.html',
  styleUrls: ['./fib-request.component.css']
})
export class FibRequestComponent implements OnInit {

  fibs: Fib[] = [{number: null}];
  task: Task = null;

  constructor(private taskManagerService: TaskManagerService) {
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.fibs.push({number: null});
  }

  onDel(): void {
    this.fibs.pop();
  }

  onCalculate(): void {
    this.taskManagerService.sendFibSeries(this.fibs.map(f => f.number))
      .subscribe(task => {
        this.task = task
        this.taskManagerService.setActiveTask(task);
      })
  }
}
