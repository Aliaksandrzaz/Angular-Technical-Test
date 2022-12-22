import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IToDo } from '../models/IToDo';
import { ICreateToDo } from '../models/ICreateToDo';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoFormComponent implements OnChanges {
  @Input() toDo: IToDo | undefined;
  @Output() submitEvent = new EventEmitter<ICreateToDo>();
  form = this.initForm();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.toDo.currentValue) {
      this.form.patchValue(changes.toDo.currentValue);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      label: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      category: this.fb.control(''),
      done: this.fb.control(false),
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.form.controls.label.updateValueAndValidity();
    }
  }
}
