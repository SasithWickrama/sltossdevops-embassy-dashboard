import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserChangepwComponent } from './mobile-user-changepw.component';

describe('MobileUserChangepwComponent', () => {
  let component: MobileUserChangepwComponent;
  let fixture: ComponentFixture<MobileUserChangepwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUserChangepwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileUserChangepwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
