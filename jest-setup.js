jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const MockInput = () => (<View />)
jest.mock('@rneui/themed', () => ({
  // AirbnbRating: jest.fn()
  Input: jest.fn(() => <MockInput />),
  Icon: jest.fn(() => <></>)
}))


