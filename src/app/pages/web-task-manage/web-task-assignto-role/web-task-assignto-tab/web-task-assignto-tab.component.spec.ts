import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTaskAssigntoTabComponent } from './web-task-assignto-tab.component';

describe('WebTaskAssigntoTabComponent', () => {
  let component: WebTaskAssigntoTabComponent;
  let fixture: ComponentFixture<WebTaskAssigntoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebTaskAssigntoTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebTaskAssigntoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
