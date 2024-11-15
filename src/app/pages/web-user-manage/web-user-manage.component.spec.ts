import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserManageComponent } from './web-user-manage.component';

describe('WebUserManageComponent', () => {
  let component: WebUserManageComponent;
  let fixture: ComponentFixture<WebUserManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebUserManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
