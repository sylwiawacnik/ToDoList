import * as React from 'react';
import {BaseSyntheticEvent} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core//CardContent';


import Typography from '@material-ui/core/Typography';
import {Avatar, CardHeader, ListItem} from '@mui/material';
import LOCALS from '../locals';
import {useNavigate} from 'react-router-dom';
import {changeStatusTaskToResolved, removeTask} from '../../actions/task.actions';
import {useDispatch} from 'react-redux';
import '../../scss/components/task-row.scss'
import Button from '@mui/material/Button';

interface TaskRowProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskRow = ({id, title, description, status}: TaskRowProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerGoToTaskPage = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    navigate(`/tasks/${id}`);
  }

  const handlerRemoveTask = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    dispatch(removeTask(`${id}`));
  }

  const handlerChangeStatusTaskToResolved = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    dispatch(changeStatusTaskToResolved(`${id}`));
  }

  return (
    <ListItem
      id={id}
      key={id}
      onClick={handlerGoToTaskPage}>
      <Card className='task-row'>
        <CardHeader
          className='task-row--header'
          avatar={
            <Avatar
              className={`${status}` === `${LOCALS.status.pending}` ? 'task-row--header__pending' : 'task-row--header__resolved'}
              aria-label="recipe">
              {status === LOCALS.status.pending ? 'P' : 'R'}
            </Avatar>
          }
          action={
            status === LOCALS.status.pending ?
              <Button data-testid={id+'-resolved'} variant="contained" onClick={handlerChangeStatusTaskToResolved} size="small">{LOCALS.status.resolved}</Button> : ''}
          title='Status : '
          subheader={`${status}`}
        />
        <CardContent
          className='task-row--content'>

          <Typography className='task-row--content__title' variant='h5'>
            {title}
          </Typography>

          <Typography className='task-row--content__description'>
            {description}
          </Typography>
        </CardContent>
        <CardActions className='task-row--actions'>
          <Button data-testid={id + '-remove'} variant="outlined" onClick={handlerRemoveTask} size="small">{LOCALS.remove}</Button>
        </CardActions>
      </Card>
    </ListItem>
  );
}

export default TaskRow;
