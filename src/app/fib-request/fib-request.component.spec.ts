import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibRequestComponent } from './fib-request.component';

describe('FibRequestComponent', () => {
  let component: FibRequestComponent;
  let fixture: ComponentFixture<FibRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
