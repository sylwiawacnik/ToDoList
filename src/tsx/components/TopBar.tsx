import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from "./ScrollTop";
import LOCALS from "../locals";
import ModalAddNewTask from "./ModalAddNewTask";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

interface Props {
  children: React.ReactElement;
}

const TopBar = (props: Props) => {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handlerGoToWelcomePage = () => {
    navigate(`/`);
  }

  const handlerShowModal = () => {
    setOpen(true);
  }

  const handlerCancel = () => {
    setOpen(false);
  }

  const handlerAddNewTask = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar >
        <Toolbar className='top-bar' data-testid="top-bar">
          <Button data-testid="tasks-button" variant="contained" onClick={handlerGoToWelcomePage}>
            {LOCALS.tasks}
          </Button>

          <Button variant="contained"
                  data-testid="add-new-task-button"
                  onClick={handlerShowModal}>{LOCALS.addNewTask}</Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor"/>
      <Container>
        <Box>
          {props.children}
          <ModalAddNewTask open={open} handlerCancel={handlerCancel}
                           handlerAddNewTask={handlerAddNewTask}/>
        </Box>
      </Container>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>

    </React.Fragment>
  );
}
export default TopBar;
