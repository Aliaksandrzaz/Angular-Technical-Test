import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { FiltersComponent } from './filters/filters.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent, FiltersComponent, ToDoFormComponent],
  imports: [ToDoRoutingModule, SharedModule],
})
export class ToDoModule {}
