import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminContentComponent } from './main-admin-content.component';

describe('MainAdminContentComponent', () => {
  let component: MainAdminContentComponent;
  let fixture: ComponentFixture<MainAdminContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminContentComponent]
    });
    fixture = TestBed.createComponent(MainAdminContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
