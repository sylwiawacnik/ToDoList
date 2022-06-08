import {Task} from '../interfaces/task.interface';
import {ChangeStatusTaskToResolvedAction, RemoveTaskAction, SaveTaskAction} from '../interfaces/task.actions.interface';
import {TaskActionType} from '../enums/task.enums';


export const saveTask = (data: Task): SaveTaskAction => ({
  type: TaskActionType.SaveTask,
  payload: data,
});

export const removeTask = (data: string): RemoveTaskAction => ({
  type: TaskActionType.RemoveTask,
  payload: data,
})

export const changeStatusTaskToResolved = (data: string): ChangeStatusTaskToResolvedAction => ({
  type: TaskActionType.ChangeStatusTaskToResolved,
  payload: data,
})
