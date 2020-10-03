import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFormDialogComponent } from './customers-form-dialog.component';

describe('CustomersFormDialogComponent', () => {
  let component: CustomersFormDialogComponent;
  let fixture: ComponentFixture<CustomersFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
