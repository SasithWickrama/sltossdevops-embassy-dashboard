import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRoleCreateUpdateComponent } from './web-role-create-update.component';

describe('WebRoleCreateUpdateComponent', () => {
  let component: WebRoleCreateUpdateComponent;
  let fixture: ComponentFixture<WebRoleCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebRoleCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebRoleCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
