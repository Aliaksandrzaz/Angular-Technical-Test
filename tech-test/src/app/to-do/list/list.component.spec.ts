import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { SharedModule } from '../../shared/shared.module';
import { FiltersComponent } from '../filters/filters.component';
import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StateService } from '../services/state.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let notification: NzNotificationService;
  const createToDoItem = {
    category: '',
    done: false,
    description: '',
    label: '',
  };
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StateService', ['fetchList', 'create']);

    await TestBed.configureTestingModule({
      declarations: [ListComponent, FiltersComponent, ToDoFormComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [{ provide: StateService, useValue: spy }, NzNotificationService],
    }).compileComponents();

    stateServiceSpy = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    notification = TestBed.inject(NzNotificationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create method', fakeAsync(() => {
    stateServiceSpy.create = jasmine.createSpy().and.returnValue(of({}));
    const spy = spyOn(notification, 'success');

    component.create(createToDoItem);
    expect(stateServiceSpy.create).toHaveBeenCalledWith(createToDoItem);
    flush();
    tick();
    expect(spy).toHaveBeenCalledWith('Create', 'Success');
  }));
});
