import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalContainerComponent } from './total-container.component';

describe('TotalContainerComponent', () => {
  let component: TotalContainerComponent;
  let fixture: ComponentFixture<TotalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
