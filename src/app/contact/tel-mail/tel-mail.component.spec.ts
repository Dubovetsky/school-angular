import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelMailComponent } from './tel-mail.component';

describe('TelMailComponent', () => {
  let component: TelMailComponent;
  let fixture: ComponentFixture<TelMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
