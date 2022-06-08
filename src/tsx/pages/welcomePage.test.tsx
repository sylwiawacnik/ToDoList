import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "../../reducers/task.reducer";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import WelcomePage from "./welcomePage";
import userEvent from "@testing-library/user-event";
import React from "react";
import {Task} from "../../interfaces/task.interface";

const mockStore = configureStore({
  reducer: taskReducer,
  preloadedState: {
    tasks: [
      {
        id: '12345',
        status: 'resolved',
        title: 'Title: First task',
        description: 'Description: First task'
      },
      {
        id: '67890',
        status: 'pending',
        title: 'Title: Second task',
        description: 'Description: Second task'
      }
    ]
  },
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (jest.fn())
}));

test('change status to resolved', () => {
  render(<Provider store={mockStore}>
    <WelcomePage/>
  </Provider>);
  const changeIdButton = screen.getByTestId('67890-resolved');
  userEvent.click(changeIdButton, {button: 0});

  expect(mockStore.getState().tasks.find((task: Task) => task.id === '67890')?.status).toBe('resolved');
});

test('remove task', () => {
  render(<Provider store={mockStore}>
    <WelcomePage/>
  </Provider>);
  const removeIdButton = screen.getByTestId('67890-remove');
  userEvent.click(removeIdButton, {button: 0});

  expect(mockStore.getState().tasks.length).toBe(1);
});
