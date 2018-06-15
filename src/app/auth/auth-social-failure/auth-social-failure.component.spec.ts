import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSocialFailureComponent } from './auth-social-failure.component';

describe('AuthSocialFailureComponent', () => {
  let component: AuthSocialFailureComponent;
  let fixture: ComponentFixture<AuthSocialFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSocialFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSocialFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
