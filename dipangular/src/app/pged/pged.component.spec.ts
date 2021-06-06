import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgedComponent } from './pged.component';

describe('PgedComponent', () => {
  let component: PgedComponent;
  let fixture: ComponentFixture<PgedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
