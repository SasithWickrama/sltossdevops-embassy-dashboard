import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRoleManageComponent } from './web-role-manage.component';

describe('WebRoleManageComponent', () => {
  let component: WebRoleManageComponent;
  let fixture: ComponentFixture<WebRoleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebRoleManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebRoleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
