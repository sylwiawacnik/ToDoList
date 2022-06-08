import {GlobalState} from '../interfaces/state.interfaces';
import {TaskAction} from '../interfaces/task.actions.interface';
import {TaskActionType} from '../enums/task.enums';
import {Task} from '../interfaces/task.interface';
import LOCALS from '../tsx/locals';

const initialState: GlobalState = {
  tasks: [],
};

export const taskReducer = (state: GlobalState = initialState, action: TaskAction) => {
  switch (action.type) {

    case TaskActionType.SaveTask: {
      const currentTasks = state.tasks || [];
      return {
        ...state,
        tasks: [...currentTasks, action.payload],
      };
    }

    case TaskActionType.RemoveTask: {
      const currentTasks = state.tasks || [];
      const newState = currentTasks.filter((task: Task) => task.id != action.payload)
      return {
        ...state,
        tasks: [...newState],
      };
    }

    case TaskActionType.ChangeStatusTaskToResolved: {
      const currentTasks = state.tasks || [];
      const newState = currentTasks.map((task: Task) => task.id === action.payload ? {...task, status: LOCALS.status.resolved} : task);
      return {
        ...state,
        tasks: [...newState],
      };
    }

    default: {
      return state;
    }
  }
};
