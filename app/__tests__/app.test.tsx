import { render } from '@testing-library/react-native';

import HomeScreen, { CustomText } from '../placeholder';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Welcome!');
  });
});
