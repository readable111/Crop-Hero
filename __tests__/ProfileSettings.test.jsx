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
import SettingsProfile from "../app/profile-settings"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
jest.useFakeTimers();

jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))
jest.mock('expo-router', () => ({
    router: {
        back: jest.fn(),
        push: jest.fn(),
    }
}));



describe('Light Mode <SettingsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<SettingsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <SettingsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<SettingsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <SettingsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<SettingsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Font Loading Error <SettingsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([false, true])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(false)
        expect(fontError).toBe(true)
    });

    test('renders correctly', () =>{
        const tree = render(<SettingsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})


describe('Unit Tests <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('can click back arrow', () =>{
        const { getByTestId } = render(
            <SettingsProfile/>
        );

        const button = getByTestId('back-arrow');
        fireEvent.press(button);
        expect(require('expo-router').router.back).toHaveBeenCalled();
    })

    test('can click light/dark switch', () =>{
        const { getByTestId } = render(
            <SettingsProfile/>
        );

        const switchButton = getByTestId('light-dark-switch');
        fireEvent(switchButton, 'ValueChange', true);
        expect(switchButton._fiber.pendingProps.value).toBe(false)
    })

    test('can click visibility switch', () =>{
        const { getByTestId } = render(
            <SettingsProfile/>
        );

        const switchButton = getByTestId('visibility-switch');
        fireEvent(switchButton, 'ValueChange', true);
        expect(switchButton._fiber.pendingProps.value).toBe(false)
    })

    test('can click notif switch', () =>{
        const { getByTestId } = render(
            <SettingsProfile/>
        );

        const switchButton = getByTestId('notif-switch');
        fireEvent(switchButton, 'ValueChange', true);
        expect(switchButton._fiber.pendingProps.value).toBe(false)
    })

    test('can click sync button', () =>{
        const logSpy = jest.spyOn(console, 'log');
        const { getByTestId } = render(
            <SettingsProfile/>
        );

        const button = getByTestId('sync');
        fireEvent.press(button);
        expect(logSpy).toHaveBeenCalledWith("sync");
    })

    test('should navigate to terms of service', () => {
        const { getByTestId } = render(
            <SettingsProfile />
        );

        const button = getByTestId('tos');
        fireEvent.press(button);

        // Check that the router.replace function was called with '/home'
        expect(require('expo-router').router.push).toHaveBeenCalledWith('/termsofservice');
    });

    test('should navigate to privacy policy', () => {
        const { getByTestId } = render(
            <SettingsProfile />
        );

        const button = getByTestId('privacy');
        fireEvent.press(button);

        // Check that the router.replace function was called with '/home'
        expect(require('expo-router').router.push).toHaveBeenCalledWith('/privacypolicy');
    });
})