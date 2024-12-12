import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {FibRequest} from "./fib-request";
import {Task} from '../model/task';
import {TaskStatistics} from "../model/task-statistics";
import {Job} from "../model/job";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const delay = ms => new Promise(res => setTimeout(res, ms));

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private fibUrl = '/api/fib'
  private taskUrl = '/api/task'
  private activeTask: Task = null;
  private jobs: Job[] = [];
  private jobsPopulation: number = 0;
  private progress: number = 0;

  constructor(private http: HttpClient) {
  }

  setActiveTask(task: Task) {
    this.activeTask = task;
    this.retrieveJobsInLoop();
  }

  getActiveTask(): Task {
    return this.activeTask;
  }

  getProgress(): number {
    return this.progress;
  }

  getJobs(): Job[] {
    return this.jobs;
  }

  sendFibSeries(fibs: number[]): Observable<Task> {
    this.progress = 0;
    this.jobsPopulation = fibs.length * 4;
    this.jobs = [];
    console.log(`Sending Fibonacci calculation task of: ${fibs}`)
    return this.http.post<Task>(this.fibUrl, new FibRequest(fibs), httpOptions)
      .pipe(
        tap((t: Task) => console.log(`Received Fibonacci task id: ${t.taskId}`)),
        catchError(this.handleError<Task>('sendFibSeries'))
      );
  }

  retrieveJobs() {
    if (!this.activeTask) return;
    if (this.progress >= 100) return;
    console.log(`Getting statistics of task: ${this.activeTask}`);
    return this.http.get<TaskStatistics>(`${this.taskUrl}/${this.activeTask.taskId}`)
      .pipe(
        tap((s: TaskStatistics) => console.log(`Received Fibonacci task statistics of: taskId=: ${s.taskId} and jobsCount=${s.scheduledJobsCount}`)),
        catchError(this.handleError<TaskStatistics>('getJobs'))
      ).subscribe(s => {
        this.jobs = s.finishedJobs;
        this.progress = this.jobs.length / this.jobsPopulation * 100;
      })
  }

  retrieveJobsInLoop() {
    (async () => {
      while (this.activeTask) {
        await delay(2000)
        this.retrieveJobs();
      }
    })();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
