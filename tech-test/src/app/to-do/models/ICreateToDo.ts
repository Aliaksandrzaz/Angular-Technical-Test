import { IToDo } from './IToDo';

export type ICreateToDo = Omit<IToDo, 'id'>;
