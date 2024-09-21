import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import EditProfile from '../app/profile-editprofile'
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})