import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePetComponent } from './single-pet.component';

describe('SinglePetComponent', () => {
  let component: SinglePetComponent;
  let fixture: ComponentFixture<SinglePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
