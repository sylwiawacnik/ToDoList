import * as React from 'react';
import List from '@material-ui/core/List';
import TaskRow from './TaskRow';
import {Task} from '../../interfaces/task.interface';
import {ListItem} from '@mui/material';
import LOCALS from "../locals";


interface TaskListProps {
  tasks: Task[];
}

const TasksList = ({tasks}: TaskListProps) => {

  return (
    <List data-testid='tasks-list'>
      {tasks.length > 0 &&
        tasks?.map((task: Task) => (
          <TaskRow
            title={task.title}
            description={task.description}
            status={task.status}
            id={task.id}
            key={task.id + '0'}
          />

        ))}
      {(tasks?.length == null) && <ListItem>{LOCALS.emptyTasksList}</ListItem>}
    </List>
  );
}

export default TasksList;
