import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEntitiesComponent } from './message-entities.component';

describe('MessageEntitiesComponent', () => {
  let component: MessageEntitiesComponent;
  let fixture: ComponentFixture<MessageEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
