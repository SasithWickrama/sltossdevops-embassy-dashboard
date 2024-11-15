import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserManageComponent } from './mobile-user-manage.component';

describe('MobileUserManageComponent', () => {
  let component: MobileUserManageComponent;
  let fixture: ComponentFixture<MobileUserManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUserManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
