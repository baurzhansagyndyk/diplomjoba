import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlipbiComponent } from './alipbi.component';

describe('AlipbiComponent', () => {
  let component: AlipbiComponent;
  let fixture: ComponentFixture<AlipbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlipbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlipbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
