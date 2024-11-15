import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTaskManageComponent } from './web-task-manage.component';

describe('WebTaskManageComponent', () => {
  let component: WebTaskManageComponent;
  let fixture: ComponentFixture<WebTaskManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebTaskManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebTaskManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
