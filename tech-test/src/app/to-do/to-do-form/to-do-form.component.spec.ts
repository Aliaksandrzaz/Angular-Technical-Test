import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFormComponent } from './to-do-form.component';
import { SharedModule } from '../../shared/shared.module';
import { SimpleChange } from '@angular/core';

describe('ToDoFormComponent', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;
  const toDoItem = {
    label: 'label',
    description: 'description',
    category: 'category',
    done: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoFormComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be init form', () => {
    const form = component.initForm();
    expect(Object.keys(form.controls)).toEqual(['label', 'description', 'category', 'done']);
    expect(form.value).toEqual({
      label: '',
      description: '',
      category: '',
      done: false,
    });
  });

  it('should be update form', () => {
    component.ngOnChanges({
      toDo: new SimpleChange(null, toDoItem, true),
    });
    expect(component.form.value).toEqual(toDoItem);
  });

  it('should be emit submit event', () => {
    const spy = spyOn(component.submitEvent, 'emit');
    component.form.patchValue(toDoItem);
    component.submitForm();

    expect(spy).toHaveBeenCalledWith({
      label: 'label',
      description: 'description',
      category: 'category',
      done: true,
    });
  });
});
