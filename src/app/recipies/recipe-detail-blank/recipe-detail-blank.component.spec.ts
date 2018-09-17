import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailBlankComponent } from './recipe-detail-blank.component';

describe('RecipeDetailBlankComponent', () => {
  let component: RecipeDetailBlankComponent;
  let fixture: ComponentFixture<RecipeDetailBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
