import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetShopAdminComponent } from './pet-shop-admin.component';

describe('PetShopAdminComponent', () => {
  let component: PetShopAdminComponent;
  let fixture: ComponentFixture<PetShopAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetShopAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetShopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
