import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfieldDetailsComponent } from './cfield-details.component';

describe('CfieldDetailsComponent', () => {
  let component: CfieldDetailsComponent;
  let fixture: ComponentFixture<CfieldDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfieldDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfieldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
