import React from 'react';
import './scss/index.scss';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {taskReducer} from './reducers/task.reducer';
import {configureStore} from '@reduxjs/toolkit'
import WelcomePage from './tsx/pages/welcomePage';
import NotFoundPage from './tsx/pages/notFoundPage';
import TaskPage from './tsx/pages/taskPage';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import URLS from './tsx/urls';


function App() {

  const store = configureStore({
    reducer: taskReducer,
    preloadedState: JSON.parse(localStorage.getItem('ToDoGlobalState') || '{}')
  });

  store.subscribe(() => {
    localStorage.setItem('ToDoGlobalState', JSON.stringify(store.getState()))
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#75577A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#E9CDEE',
        contrastText: '#ffffff',
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={URLS.home} element={<WelcomePage/>}/>
              <Route path={URLS.task} element={<TaskPage/>}/>
              <Route path={URLS.other} element={<NotFoundPage/>}/>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
