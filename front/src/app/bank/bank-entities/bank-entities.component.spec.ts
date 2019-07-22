import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEntitiesComponent } from './bank-entities.component';

describe('BankEntitiesComponent', () => {
  let component: BankEntitiesComponent;
  let fixture: ComponentFixture<BankEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
