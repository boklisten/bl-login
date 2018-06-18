import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEmailValidationComponent } from './auth-email-validation.component';

describe('AuthEmailValidationComponent', () => {
  let component: AuthEmailValidationComponent;
  let fixture: ComponentFixture<AuthEmailValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthEmailValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthEmailValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
