import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineDetailPage } from './routine-detail.page';

describe('RoutineDetailPage', () => {
  let component: RoutineDetailPage;
  let fixture: ComponentFixture<RoutineDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
