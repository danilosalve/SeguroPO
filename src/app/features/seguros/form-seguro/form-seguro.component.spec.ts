import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeguroComponent } from './form-seguro.component';

describe('FormSeguroComponent', () => {
  let component: FormSeguroComponent;
  let fixture: ComponentFixture<FormSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
