import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import PrivacyPolicy from "../app/privacypolicy";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode <PrivacyPolicy/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
    });

    test('renders correctly', () =>{
        const tree = render(<PrivacyPolicy/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <PrivacyPolicy/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
    });

    test('renders correctly', () =>{
        const tree = render(<PrivacyPolicy/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <PrivacyPolicy/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
    });

    test('renders correctly', () =>{
        const tree = render(<PrivacyPolicy/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})