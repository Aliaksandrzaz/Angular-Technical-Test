import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { IToDo } from '../models/IToDo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() searchEvent = new EventEmitter<Partial<IToDo>>();

  form = this.initForm();

  constructor(private fb: FormBuilder) {}

  initForm(): FormGroup {
    return this.fb.group({
      label: this.fb.control(null, Validators.required),
      description: this.fb.control(null),
      category: this.fb.control(null),
      done: this.fb.control(null),
    });
  }

  submitForm() {
    const value = Object.entries(this.form.value).reduce((acc, [key, item]) => {
      if ((item !== '' || typeof item === 'boolean') && item !== null) {
        acc[key] = item;
      }

      return acc;
    }, {});
    this.searchEvent.emit(value);
  }

  reset(): void {
    this.form.reset();
  }
}
