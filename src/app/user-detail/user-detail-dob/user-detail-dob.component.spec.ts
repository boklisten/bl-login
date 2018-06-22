import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailDobComponent } from './user-detail-dob.component';

describe('UserDetailDobComponent', () => {
  let component: UserDetailDobComponent;
  let fixture: ComponentFixture<UserDetailDobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailDobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailDobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
