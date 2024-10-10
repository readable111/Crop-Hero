jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const MockInput = () => (<View />)
jest.mock('@rneui/themed', () => ({
  AirbnbRating: jest.fn(),
  Input: jest.fn(() => <MockInput />),
  Icon: jest.fn(() => <></>),
  CheckBox: jest.fn(() => null)
}))


jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  const spy = jest.spyOn(rn.Animated, 'createAnimatedComponent');
  spy.mockImplementation(() => jest.fn(() => null));
  return rn;
});
jest.mock("react-native-pager-view", () => {
  const React = require("react");
  const View = require("react-native").View;

  return class ViewPager extends React.Component {
    // *********************
    // THIS WAS MISSING
    setPage() {}
    setPageWithoutAnimation() {}
    setScrollEnabled() {}
    // *********************

    render() {
      const {
        children,
        initialPage,
        onPageScroll,
        onPageScrollStateChanged,
        onPageSelected,
        style,
        scrollEnabled,
        accessibilityLabel,
      } = this.props;

      console.log({
        children,
        initialPage,
        onPageScroll,
        onPageScrollStateChanged,
        onPageSelected,
        style,
        scrollEnabled,
        accessibilityLabel,
      });

      return (
        <View
          testID={this.props.testID}
          initialPage={initialPage}
          onPageScroll={onPageScroll}
          onPageScrollStateChanged={onPageScrollStateChanged}
          onPageSelected={onPageSelected}
          style={style}
          scrollEnabled={scrollEnabled}
          accessibilityLabel={accessibilityLabel}>
          {children}
        </View>
      );
    }
  };
});