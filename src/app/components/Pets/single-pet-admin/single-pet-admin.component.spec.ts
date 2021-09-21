import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePetAdminComponent } from './single-pet-admin.component';

describe('SinglePetAdminComponent', () => {
  let component: SinglePetAdminComponent;
  let fixture: ComponentFixture<SinglePetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePetAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
