import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTaskAssigntoRoleComponent } from './web-task-assignto-role.component';

describe('WebTaskAssigntoRoleComponent', () => {
  let component: WebTaskAssigntoRoleComponent;
  let fixture: ComponentFixture<WebTaskAssigntoRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebTaskAssigntoRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebTaskAssigntoRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
