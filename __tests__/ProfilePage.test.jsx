/****
 * @author Daniel Moreno
 * @reviewer
 * @tester 
 ***/

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
import { router } from 'expo-router';
import * as Font from 'expo-font';
jest.useFakeTimers();


jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    }
}));
jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
  }))

describe('Light Mode <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('can click edit profile', () =>{
        const { getByTestId } = render(
            <Profile/>
        );

        const button = getByTestId('edit-profile');
        fireEvent.press(button);
        expect(require('expo-router').router.push).toHaveBeenCalledWith('/profile-editprofile');
    })

    test('can click settings', () =>{
        const { getByTestId } = render(
            <Profile/>
        );

        const button = getByTestId('settings-icon');
        fireEvent.press(button);

        const buttonArrow = getByTestId('settings-arrow');
        fireEvent.press(buttonArrow);

        expect(require('expo-router').router.push).toHaveBeenCalledWith('/profile-settings');
    })

    test('can click billing details', () =>{
        const { getByTestId } = render(
            <Profile/>
        );

        const button = getByTestId('billing-icon');
        fireEvent.press(button);

        const buttonArrow = getByTestId('billing-arrow');
        fireEvent.press(buttonArrow);

        expect(require('expo-router').router.push).toHaveBeenCalledWith('/profile-billingdetails');
    })

    test('can click logout', () =>{
        const logSpy = jest.spyOn(console, 'log');
        const { getByTestId } = render(
            <Profile/>
        );

        const button = getByTestId('logout-icon');
        fireEvent.press(button);

        const buttonArrow = getByTestId('logout-arrow');
        fireEvent.press(buttonArrow);

        expect(logSpy).toHaveBeenCalledWith('logout pressed');
    })
})

describe('Dark Mode <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})