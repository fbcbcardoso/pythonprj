import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSolicitComponent } from './new-solicit.component';

describe('NewSolicitComponent', () => {
  let component: NewSolicitComponent;
  let fixture: ComponentFixture<NewSolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSolicitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
