import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import todo from '../app/todo';
import { fetchTasks, updateTaskInDatabase, insertTaskIntoDatabase } from '../database'; // mock the database functions

// Mock the database functions
jest.mock('../database', () => ({
  fetchTasks: jest.fn(),
  updateTaskInDatabase: jest.fn(),
  insertTaskIntoDatabase: jest.fn(),
}));

describe('Todo Component', () => {
  // Dummy task data for testing
  const mockTasks = [
    {
      TaskID: 1,
      AssignedFarmerID: '1',
      TaskType: 'Planting',
      LocationID: 'Field 1',
      CropID: 'Corn',
      Comments: 'Plant corn in Field 1',
      DueDate: '2024-10-07',
      IsCompleted: false,
      DateCompleted: null,
    },
    {
      TaskID: 2,
      AssignedFarmerID: '2',
      TaskType: 'Harvesting',
      LocationID: 'Field 2',
      CropID: 'Wheat',
      Comments: 'Harvest wheat in Field 2',
      DueDate: '2024-10-08',
      IsCompleted: true,
      DateCompleted: '2024-10-06',
    },
  ];

  beforeEach(() => {
    fetchTasks.mockResolvedValue(mockTasks); // Resolve fetchTasks with mock data
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('renders the todo list correctly', async () => {
    const { getByText } = render(<todo />);

    // Wait for the tasks to be loaded
    await waitFor(() => {
      expect(getByText('Assigned Farmer ID: 1')).toBeTruthy();
      expect(getByText('Task Type: Planting')).toBeTruthy();
      expect(getByText('Assigned Farmer ID: 2')).toBeTruthy();
      expect(getByText('Task Type: Harvesting')).toBeTruthy();
    });
  });

  test('toggles the IsCompleted status of a task', async () => {
    const { getByText, getByRole } = render(<todo />);

    // Wait for tasks to load
    await waitFor(() => getByText('Assigned Farmer ID: 1'));

    // Check initial state of the task (not completed)
    expect(getByText('Not Completed')).toBeTruthy();

    // Simulate pressing the "Not Completed" text (which toggles the checkbox)
    fireEvent.press(getByText('Not Completed'));

    // Ensure the database update was called with the toggled task
    await waitFor(() => {
      expect(updateTaskInDatabase).toHaveBeenCalledWith(1, expect.objectContaining({
        TaskID: 1,
        IsCompleted: true, // Toggled to true
      }));
    });
  });

  test('adds a new task', async () => {
    const { getByText, getByRole } = render(<todo />);

    // Wait for tasks to load
    await waitFor(() => getByText('Assigned Farmer ID: 1'));

    // Simulate pressing the add task button (SpeedDial)
    fireEvent.press(screen.getByRole('button', { name: 'Add Task' }));

    // Mock data for a new task
    const newTask = {
      TaskID: 3,
      AssignedFarmerID: '3',
      TaskType: 'Watering',
      LocationID: 'Field 3',
      CropID: 'Rice',
      Comments: 'Water rice in Field 3',
      DueDate: '2024-10-10',
      IsCompleted: false,
    };

    // Simulate inserting a task and updating state
    insertTaskIntoDatabase.mockResolvedValue(newTask);

    // Simulate adding the task to the modal
    fireEvent.changeText(screen.getByPlaceholderText('Assigned Farmer ID'), '3');
    fireEvent.changeText(screen.getByPlaceholderText('Task Type'), 'Watering');
    fireEvent.changeText(screen.getByPlaceholderText('Location ID'), 'Field 3');
    fireEvent.changeText(screen.getByPlaceholderText('Crop ID'), 'Rice');
    fireEvent.changeText(screen.getByPlaceholderText('Comments'), 'Water rice in Field 3');
    fireEvent.changeText(screen.getByPlaceholderText('Due Date'), '2024-10-10');

    // Simulate closing the modal and saving the task
    fireEvent.press(screen.getByText('Save'));

    // Wait for the insertTaskIntoDatabase function to be called with the new task
    await waitFor(() => {
      expect(insertTaskIntoDatabase).toHaveBeenCalledWith(newTask);
    });

    // Ensure the new task appears in the list
    expect(getByText('Task Type: Watering')).toBeTruthy();
  });

  test('deletes a task', async () => {
    const { getByText } = render(<todo />);

    // Wait for tasks to load
    await waitFor(() => getByText('Assigned Farmer ID: 1'));

    // Simulate pressing the delete button
    fireEvent.press(screen.getByText('Delete', { selector: 'button' }));

    // Ensure the task is removed from the display (you will need to implement the mock delete logic)
    await waitFor(() => {
      expect(screen.queryByText('Assigned Farmer ID: 1')).toBeNull();
    });

    // Verify the deletion logic (implement this in the database mock)
    // expect(deleteTaskFromDatabase).toHaveBeenCalledWith(1);
  });
});
