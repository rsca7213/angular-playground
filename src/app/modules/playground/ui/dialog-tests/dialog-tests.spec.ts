import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTests } from './dialog-tests';

describe('DialogTests', () => {
  let component: DialogTests;
  let fixture: ComponentFixture<DialogTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTests]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
