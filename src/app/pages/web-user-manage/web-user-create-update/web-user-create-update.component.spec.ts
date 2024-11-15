import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserCreateUpdateComponent } from './web-user-create-update.component';

describe('WebUserCreateUpdateComponent', () => {
  let component: WebUserCreateUpdateComponent;
  let fixture: ComponentFixture<WebUserCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebUserCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebUserCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
