import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Notebook from './Notebook';
import { Alert } from 'react-native';

// Mocking external dependencies like NavBar, AppButton, etc.
jest.mock('../assets/NavBar', () => 'NavBar');
jest.mock('../assets/AppButton', () => 'AppButton');
jest.mock('@rneui/themed', () => ({
  SpeedDial: ({ children }) => <>{children}</>,
  SpeedDialAction: ({ title, onPress }) => <Button title={title} onPress={onPress} />,
}));
jest.mock('../assets/NotebookModals/JournalEntryModal', () => 'JournalEntryModal');

// Mocking the Alert so it doesn't show actual alerts during tests
jest.spyOn(Alert, 'alert');

describe('Notebook Component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Notebook />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('opens modal for adding a new entry', () => {
    const { getByText } = render(<Notebook />);
    
    // Simulate clicking the "Add" button from the Speed Dial
    fireEvent.press(getByText('Add'));
    
    // Since the JournalEntryModal is mocked, we can't test the modal's contents here
    // But we can check if the action was triggered correctly (i.e., modal visibility state changed)
    expect(getByText('JournalEntryModal')).toBeTruthy();
  });

  it('filters entries by month and year', async () => {
    const { getByText, getByTestId } = render(<Notebook />);

    // Simulate changing the month and year picker values
    fireEvent(getByTestId('month-picker'), 'onValueChange', '01');
    fireEvent(getByTestId('year-picker'), 'onValueChange', '2024');

    // Check if the filtered results are displayed correctly (you can customize this based on your actual entries)
    await waitFor(() => {
      expect(getByText('Entry ID:')).toBeTruthy();
    });
  });

  it('handles delete entry', () => {
    const { getByText } = render(<Notebook />);
    
    // Simulate clicking the "Delete" button from Speed Dial
    fireEvent.press(getByText('Delete'));

    // Check if the delete confirmation alert was shown
    expect(Alert.alert).toHaveBeenCalledWith(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      expect.any(Array),
      { cancelable: false }
    );
  });

  it('edits an existing entry', () => {
    const { getByText } = render(<Notebook />);
    
    // Simulate clicking the "Edit" button from Speed Dial
    fireEvent.press(getByText('Edit'));

    // Check if the modal opens for editing (again, due to mocking, we just check modal presence)
    expect(getByText('JournalEntryModal')).toBeTruthy();
  });
});
