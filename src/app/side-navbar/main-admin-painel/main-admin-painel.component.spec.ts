import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminPainelComponent } from './main-admin-painel.component';

describe('MainAdminPainelComponent', () => {
  let component: MainAdminPainelComponent;
  let fixture: ComponentFixture<MainAdminPainelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminPainelComponent]
    });
    fixture = TestBed.createComponent(MainAdminPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
