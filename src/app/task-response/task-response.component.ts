import {Component, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {TaskManagerService} from "../task-manager/task-manager.service";
import {Job} from "../model/job";

@Component({
  selector: 'app-task-response',
  templateUrl: './task-response.component.html',
  styleUrls: ['./task-response.component.css']
})
export class TaskResponseComponent implements OnInit {

  detailedJobId: string = null;

  constructor(private taskManagerService: TaskManagerService) {
  }

  ngOnInit(): void {
  }

  getActiveTask(): Task {
    return this.taskManagerService.getActiveTask();
  }

  showMoreDetails(job: Job) {
    if (this.detailedJobId === job.jobId) {
      this.detailedJobId = null;
    } else
      this.detailedJobId = job.jobId;
  }

  getJobs(): Job[] {
    return this.taskManagerService.getJobs();
  }
}
