import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { StateService } from '../services/state.service';
import { IToDo } from '../models/IToDo';
import { ICreateToDo } from '../models/ICreateToDo';
import { IUpdateToDo } from '../models/IUpdateToDo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  list$ = this.state.list$;
  item$ = this.state.item$;
  loading$ = this.state.loading$;
  isOpenCreateModal = false;
  isOpenEditModal = false;

  constructor(private state: StateService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.state.fetchList();
  }

  create(item: ICreateToDo): void {
    this.isOpenCreateModal = false;
    this.state.create(item).subscribe(
      () => {
        this.notification.success('Create', 'Success');
        this.state.fetchList();
      },
      () => {
        this.showErrorNotification();
      }
    );
  }

  edit(item: IUpdateToDo, id: number): void {
    this.state.update(item, id).subscribe(
      () => {
        this.notification.success('Edit', 'Success');
        this.state.fetchList();
        this.closeEditModal();
      },
      () => {
        this.showErrorNotification();
      }
    );
  }

  toggleCreateModal(): void {
    this.isOpenCreateModal = !this.isOpenCreateModal;
  }

  delete(id: number): void {
    this.state.delete(id).subscribe(
      () => {
        this.state.fetchList();
        this.notification.success('Delete', 'Success');
      },
      () => {
        this.showErrorNotification();
      }
    );
  }

  showErrorNotification(): void {
    this.notification.error('Error', 'Something go wrong');
  }

  fetchToDoItem(id: number) {
    this.state.fetchItem(id);
  }

  openEditModal(id: number): void {
    this.isOpenEditModal = true;
    this.fetchToDoItem(id);
  }

  closeEditModal() {
    this.isOpenEditModal = false;
    this.state.clearItem();
  }

  search(params: Partial<IToDo>): void {
    this.state.fetchList(params);
  }
}
