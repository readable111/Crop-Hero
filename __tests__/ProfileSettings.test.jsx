import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import SettingsProfile from "../app/profile-settings";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode <SettingsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
    });

    test('renders correctly', () =>{
        const tree = render(<SettingsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})