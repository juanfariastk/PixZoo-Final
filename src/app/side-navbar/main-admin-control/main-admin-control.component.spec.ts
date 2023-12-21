import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminControlComponent } from './main-admin-control.component';

describe('MainAdminControlComponent', () => {
  let component: MainAdminControlComponent;
  let fixture: ComponentFixture<MainAdminControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminControlComponent]
    });
    fixture = TestBed.createComponent(MainAdminControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
