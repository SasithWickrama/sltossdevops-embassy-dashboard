import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserChangepwComponent } from './web-user-changepw.component';

describe('WebUserChangepwComponent', () => {
  let component: WebUserChangepwComponent;
  let fixture: ComponentFixture<WebUserChangepwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebUserChangepwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebUserChangepwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
