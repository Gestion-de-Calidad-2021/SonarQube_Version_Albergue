import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalListAdminComponent } from './animal-list-admin.component';

describe('AnimalListAdminComponent', () => {
  let component: AnimalListAdminComponent;
  let fixture: ComponentFixture<AnimalListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
