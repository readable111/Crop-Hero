import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import Profile from '../app/profile'
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})