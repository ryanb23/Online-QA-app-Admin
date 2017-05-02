import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfieldListComponent } from './cfield-list.component';

describe('CfieldListComponent', () => {
  let component: CfieldListComponent;
  let fixture: ComponentFixture<CfieldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfieldListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
