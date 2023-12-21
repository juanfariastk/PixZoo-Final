import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentUserComponent } from './main-content-user.component';

describe('MainContentUserComponent', () => {
  let component: MainContentUserComponent;
  let fixture: ComponentFixture<MainContentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentUserComponent]
    });
    fixture = TestBed.createComponent(MainContentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
