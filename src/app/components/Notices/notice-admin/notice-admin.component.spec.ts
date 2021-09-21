import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeAdminComponent } from './notice-admin.component';

describe('NoticeAdminComponent', () => {
  let component: NoticeAdminComponent;
  let fixture: ComponentFixture<NoticeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
