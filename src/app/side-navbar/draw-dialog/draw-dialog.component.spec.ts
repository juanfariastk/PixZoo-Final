import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDialogComponent } from './draw-dialog.component';

describe('DrawDialogComponent', () => {
  let component: DrawDialogComponent;
  let fixture: ComponentFixture<DrawDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawDialogComponent]
    });
    fixture = TestBed.createComponent(DrawDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
