import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnotationComponent } from './new-annotation.component';

describe('NewAnnotationComponent', () => {
  let component: NewAnnotationComponent;
  let fixture: ComponentFixture<NewAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAnnotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
