import {TaskActionType} from '../enums/task.enums';
import {Task} from './task.interface';

export interface SaveTaskAction {
  type: TaskActionType.SaveTask;
  payload: Task;
}

export interface RemoveTaskAction {
  type: TaskActionType.RemoveTask
  payload: string;
}

export interface ChangeStatusTaskToResolvedAction {
  type: TaskActionType.ChangeStatusTaskToResolved
  payload: string;
}

export type TaskAction =
  | ChangeStatusTaskToResolvedAction
  | RemoveTaskAction
  | SaveTaskAction;
