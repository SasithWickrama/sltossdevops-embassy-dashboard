import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTaskCreateUpdateComponent } from './web-task-create-update.component';

describe('WebTaskCreateUpdateComponent', () => {
  let component: WebTaskCreateUpdateComponent;
  let fixture: ComponentFixture<WebTaskCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebTaskCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebTaskCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
