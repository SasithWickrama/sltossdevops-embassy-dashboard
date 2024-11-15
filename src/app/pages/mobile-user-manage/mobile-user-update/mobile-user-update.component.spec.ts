import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserUpdateComponent } from './mobile-user-update.component';

describe('MobileUserUpdateComponent', () => {
  let component: MobileUserUpdateComponent;
  let fixture: ComponentFixture<MobileUserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUserUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
