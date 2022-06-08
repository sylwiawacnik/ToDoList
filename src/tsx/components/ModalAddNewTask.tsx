import * as React from 'react';
import {MouseEvent, MouseEventHandler, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LOCALS from '../locals';
import {TextField} from '@mui/material';
import {Task} from '../../interfaces/task.interface';
import {useDispatch} from 'react-redux';
import {saveTask} from '../../actions/task.actions';
import {v4 as uuidv4} from 'uuid';
import '../../scss/components/modal.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


interface ModalAddNewTaskProps {
  open: boolean;
  handlerCancel: MouseEventHandler;
  handlerAddNewTask: MouseEventHandler;
}

const ModalAddNewTask = ({open, handlerAddNewTask, handlerCancel}: ModalAddNewTaskProps) => {
  const [titleValue, setTitleValue] = useState(LOCALS.modal.title);
  const [descriptionValue, setDescriptionValue] = useState(LOCALS.modal.description);
  const [errorTitle, setErrorTitle] = useState(true);
  const [errorDescription, setErrorDescription] = useState(true);
  const dispatch = useDispatch();

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
    validationTask(event.target.value, setErrorDescription);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    validationTask(event.target.value, setErrorTitle);
  }

  const handlerCheckAndAddNewTask = (e: MouseEvent) => {
    if (errorTitle || errorDescription) {
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: titleValue,
      description: descriptionValue,
      status: LOCALS.status.pending
    }
    dispatch(saveTask(newTask));
    handlerAddNewTask(e);
  }

  useEffect(() => {
    if (!open) {
      setTitleValue('');
      setDescriptionValue('');
      setErrorTitle(true);
      setErrorDescription(true);
    }
  }, [open])

  const validationTask = (value: String, setError: Function) => {
    value.trim() != '' ? setError(false) : setError(true);
  }

  return (<>
      <Dialog
        title='Dialog'
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handlerCancel}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className='dialog'>
        <DialogTitle className='dialog__title' id="scroll-dialog-title">
          {LOCALS.modal.header}</DialogTitle>
        <DialogContent>
          <div className='dialog__content'>
            <TextField
              id="outlined-multiline-flexible"
              name='title'
              className='dialog__content--title'
              helperText={errorTitle ? LOCALS.modal.error : ''}
              error={errorTitle}
              label={LOCALS.modal.title}
              inputProps={{maxLength: 75}}
              maxRows={3}
              multiline
              value={titleValue}
              onChange={handleChangeTitle}/>

            <TextField
              id="outlined-multiline-static"
              name='description'
              className='dialog__content--description'
              helperText={errorDescription ? LOCALS.modal.error : ''}
              error={errorDescription}
              label={LOCALS.modal.description}
              inputProps={{maxLength: 1500}}
              multiline
              minRows={15}
              maxRows={30}
              value={descriptionValue}
              onChange={handleChangeDescription}/>
          </div>

        </DialogContent>
        <DialogActions className='dialog__actions'>
          <Button variant="outlined"
                  onClick={handlerCancel}
                  startIcon={<DeleteIcon/>}>
            {LOCALS.cancel}
          </Button>
          <Button variant="contained"
                  onClick={handlerCheckAndAddNewTask}
                  endIcon={<SendIcon/>}>
            {LOCALS.add}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalAddNewTask;
