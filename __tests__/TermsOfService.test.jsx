import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import ToS from '../app/termsofservice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('<ToS/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem(dark_mode_setting, "false");
        waitFor(async () => {
            expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
        });
    });

    test('renders correctly', () =>{
        const tree = render(<ToS/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})