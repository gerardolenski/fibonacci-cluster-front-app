import { Component, OnInit } from '@angular/core';
import {FibRequest} from "./fibRequest";

@Component({
  selector: 'app-fib-request',
  templateUrl: './fib-request.component.html',
  styleUrls: ['./fib-request.component.css']
})
export class FibRequestComponent implements OnInit {

  fibs: FibRequest[] = [{number: null}];
  calculation: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.fibs.push({number: null});
  }

  onDel(): void {
    this.fibs.pop();
  }

  onCalculate() : void {
    this.calculation = true;
  }

  onKeyDown(event) {
    if (event.key) {
      this.onAdd();
    }
  }

}
