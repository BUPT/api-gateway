import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAtomApiComponent } from './modify-atom-api.component';

describe('ModifyAtomApiComponent', () => {
  let component: ModifyAtomApiComponent;
  let fixture: ComponentFixture<ModifyAtomApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAtomApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAtomApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
