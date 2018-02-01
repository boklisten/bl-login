import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRegisterComponent } from './local-register.component';

describe('LocalRegisterComponent', () => {
  let component: LocalRegisterComponent;
  let fixture: ComponentFixture<LocalRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
