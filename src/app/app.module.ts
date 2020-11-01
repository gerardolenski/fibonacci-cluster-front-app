import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FibRequestComponent} from './fib-request/fib-request.component';
import { TaskResponseComponent } from './task-response/task-response.component';

@NgModule({
  declarations: [
    AppComponent,
    FibRequestComponent,
    TaskResponseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
