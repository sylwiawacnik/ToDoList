import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders the top bar ', () => {
  render(<App/>);
  const topBar = screen.getByTestId('top-bar');
  expect(topBar).toBeInTheDocument();
});

test('renders task button on the top bar', () => {
  render(<App/>);
  const topBarTasksButton = screen.getByTestId('tasks-button');
  expect(topBarTasksButton).toBeInTheDocument();
});

test('renders add the new task button on the top bar ', () => {
  render(<App/>);
  const topBarAddNewTaskButton = screen.getByTestId('add-new-task-button');
  expect(topBarAddNewTaskButton).toBeInTheDocument();
});

test('top bar contains task button and add net task button', () => {
  render(<App/>);
  const topBar = screen.getByTestId('top-bar');
  const topBarTasksButton = screen.getByTestId('tasks-button');
  const topBarAddNewTaskButton = screen.getByTestId('add-new-task-button');
  expect(topBar).toContainElement(topBarTasksButton)
  expect(topBar).toContainElement(topBarAddNewTaskButton)
});

test('click on the task button on the top bar', () => {
  render(<App/>);
  const topBarTasksButton = screen.getByTestId('tasks-button');
  userEvent.click(topBarTasksButton, {button: 0});
  const homePage = screen.getByTitle('Home Page');
  expect(homePage).toBeInTheDocument();
});

test('renders filters buttons group', () => {
  render(<App/>);
  const filtersButtonsGroup = screen.getByTestId('filers-buttons');
  expect(filtersButtonsGroup).toBeInTheDocument();
});

test('renders filter button add', () => {
  render(<App/>);
  const filtersButtonsAdd = screen.getByTestId('filers-button-all');
  expect(filtersButtonsAdd).toBeInTheDocument();
});

test('renders filter button resolved', () => {
  render(<App/>);
  const filtersButtonsResolved = screen.getByTestId('filers-button-resolved');
  expect(filtersButtonsResolved).toBeInTheDocument();
});

test('renders filter button pending', () => {
  render(<App/>);
  const filtersButtonsPending = screen.getByTestId('filers-button-pending');
  expect(filtersButtonsPending).toBeInTheDocument();
});

test('filter buttons contains all, pending and resolved buttons', () => {
  render(<App/>);
  const filtersButtonsGroup = screen.getByTestId('filers-buttons');
  const filtersButtonsAdd = screen.getByTestId('filers-button-all');
  const filtersButtonsResolved = screen.getByTestId('filers-button-resolved');
  const filtersButtonsPending = screen.getByTestId('filers-button-pending');
  expect(filtersButtonsGroup).toContainElement(filtersButtonsAdd);
  expect(filtersButtonsGroup).toContainElement(filtersButtonsResolved);
  expect(filtersButtonsGroup).toContainElement(filtersButtonsPending);

});


test('click on the add new task button on the top bar', () => {
  render(<App/>);
  const topBarAddNewTaskButton = screen.getByTestId('add-new-task-button');
  userEvent.click(topBarAddNewTaskButton, {button: 0});
  const modal = screen.findByTitle('Dialog');
  expect(modal).toBeTruthy();
});

