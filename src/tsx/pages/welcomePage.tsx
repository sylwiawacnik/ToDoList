import TopBar from '../components/TopBar';
import TasksList from '../components/TasksList';
import React, {MouseEvent, useEffect, useState} from 'react';
import {GlobalState} from '../../interfaces/state.interfaces';
import {Task} from '../../interfaces/task.interface';
import {useSelector} from 'react-redux';
import LOCALS from '../locals';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';


const WelcomePage = () => {

  const tasks = useSelector(((state: GlobalState) => state?.tasks || []));
  const [list, setList] = useState(tasks);
  const [filter, setFilter] = useState(LOCALS.status.all);

  useEffect(() => {
    switch (filter) {
      case LOCALS.status.pending: {
        setList(tasks.filter((task: Task) => task.status === LOCALS.status.pending));
        break;
      }
      case LOCALS.status.resolved: {
        setList(tasks.filter((task: Task) => task.status === LOCALS.status.resolved));
        break;
      }
      default: {
        setList(tasks);
        break;
      }
    }
  }, [filter, tasks])


  const handlerChangeStatusFilter = (event: MouseEvent, newStatus: string) => {
    if (newStatus != filter && newStatus != null)
      setFilter(newStatus);
  }

  return (
    <TopBar>
      <section className='content-page' title='Home Page'>
        <ToggleButtonGroup   data-testid="filers-buttons"
          color="primary"
          value={filter}
          exclusive
          onChange={handlerChangeStatusFilter}>
          <ToggleButton data-testid="filers-button-all" value={LOCALS.status.all}>{LOCALS.status.all}</ToggleButton>
          <ToggleButton data-testid="filers-button-resolved" value={LOCALS.status.resolved}>{LOCALS.status.resolved}</ToggleButton>
          <ToggleButton data-testid="filers-button-pending" value={LOCALS.status.pending}>{LOCALS.status.pending}</ToggleButton>
        </ToggleButtonGroup>
        <TasksList tasks={list}/>
      </section>
    </TopBar>

  );
}

export default WelcomePage;
