import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustumerComponent } from './new-custumer.component';

describe('NewCustumerComponent', () => {
  let component: NewCustumerComponent;
  let fixture: ComponentFixture<NewCustumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
