import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDialog } from './create-product-dialog';

describe('CreateProductDialog', () => {
  let component: CreateProductDialog;
  let fixture: ComponentFixture<CreateProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductDialog]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
