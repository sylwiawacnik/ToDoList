import {useNavigate, useParams} from "react-router-dom";
import TopBar from "../components/TopBar";
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "../../interfaces/state.interfaces";
import {Task} from "../../interfaces/task.interface";
import LOCALS from "../locals";
import React, {BaseSyntheticEvent} from "react";
import '../../scss/pages/task.scss';
import Button from '@mui/material/Button';

import {changeStatusTaskToResolved, removeTask} from "../../actions/task.actions";

const TaskPage = () => {

  const params = useParams();
  const task = useSelector((state: GlobalState) => state?.tasks.find((task: Task) => task.id === params.taskId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerRemoveTask = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    dispatch(removeTask(`${params.taskId}`));
    navigate(`/`);
  }

  const handlerChangeStatusTaskToResolved = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    dispatch(changeStatusTaskToResolved(`${params.taskId}`));
  }


  return (
    <TopBar>
      {!task ?
        <section className='task-box'>
          <h2>
            <div>{LOCALS.taskNotFound}</div>
          </h2>
        </section>
        :
        <section className='task-box'>
          <div className='task-box__id'>{LOCALS.taskPage.id} {task?.id}</div>
          <div className='task-box__status'>{LOCALS.taskPage.status} {task?.status}</div>
          {task.status === LOCALS.status.pending ?
            <Button className='task-box__resolved' variant="contained" onClick={handlerChangeStatusTaskToResolved}
                    size="small">{LOCALS.status.resolved}</Button> : ''}
          <div className='task-box__title'>
            <div className='task-box__title--label'>{LOCALS.taskPage.title} </div>
            <div className='task-box__title--text'>{task?.title} </div>
          </div>
          <div className='task-box__description'>
            <div className='task-box__description--label'>{LOCALS.taskPage.description} </div>
            <div className='task-box__description--text'>{task?.description} </div>
          </div>
          <Button className='task-box__remove' variant="outlined" onClick={handlerRemoveTask} size="small">{LOCALS.remove}</Button>
        </section>
      }
    </TopBar>
  );
}

export default TaskPage;
