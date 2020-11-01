import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Task} from '../model/task';
import {FibRequest} from "./fib-request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private fibUrl = '/api/fib'


  constructor(private http: HttpClient) {
  }

  sendFibSeries(fibs: number[]): Observable<Task> {
    console.log(`Sending Fibonacci calculation task of: ${fibs}`)
    return this.http.post<Task>(this.fibUrl, new FibRequest(fibs), httpOptions)
      .pipe(
        tap((t: Task) => console.log(`Received Fibonacci task id: ${t.taskId}`)),
        catchError(this.handleError<Task>('sendFibSeries'))
      );
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
