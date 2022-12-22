import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { SharedModule } from '../../shared/shared.module';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be create form', () => {
    const form = component.initForm();
    expect(Object.keys(form.controls)).toEqual(['label', 'description', 'category', 'done']);
    expect(form.value).toEqual({
      label: null,
      description: null,
      category: null,
      done: null,
    });
  });

  it('should be emit event with value', () => {
    const spy = spyOn(component.searchEvent, 'emit');
    component.form.patchValue({
      label: 'label',
      description: 'description',
      category: 'category',
      done: true,
    });
    component.submitForm();

    expect(spy).toHaveBeenCalledWith({
      label: 'label',
      description: 'description',
      category: 'category',
      done: true,
    });
  });

  it('should be reset form', () => {
    component.form.patchValue({
      label: 'label',
      description: 'description',
      category: 'category',
      done: true,
    });
    component.reset();

    expect(component.form.value).toEqual({
      label: null,
      description: null,
      category: null,
      done: null,
    });
  });
});
