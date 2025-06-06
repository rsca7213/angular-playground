import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTests } from './signal-tests';

describe('SignalTests', () => {
  let component: SignalTests;
  let fixture: ComponentFixture<SignalTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
