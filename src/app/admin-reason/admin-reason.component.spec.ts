import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReasonComponent } from './admin-reason.component';

describe('AdminReasonComponent', () => {
  let component: AdminReasonComponent;
  let fixture: ComponentFixture<AdminReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
