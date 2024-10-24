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
    act
} from "@testing-library/react-native";
import BillingDetailsProfile from "../app/profile-billingdetails";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {renderer, create} from "react-test-renderer";
import { ErrorBoundary } from "react-error-boundary";
import * as Font from 'expo-font';
jest.useFakeTimers();
let component;

jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))
jest.mock('expo-router', () => ({
    router: {
        back: jest.fn(),
    }
}));

it('Light Mode <BillingDetailsProfile/>', async () =>{
    await AsyncStorage.setItem("dark_mode_setting", "false");
    Font.useFonts.mockReturnValue([true, false])
    const [fontsLoaded, fontError] = Font.useFonts()
    expect(fontsLoaded).toBe(true)
    expect(fontError).toBe(false)

    const tree = render(<BillingDetailsProfile/>).toJSON();

    await waitFor(() => {
        expect(tree).toMatchSnapshot();
    })
})

it('Dark Mode <BillingDetailsProfile/>', async () =>{
    await AsyncStorage.setItem("dark_mode_setting", "true");
    Font.useFonts.mockReturnValue([true, false])
    const [fontsLoaded, fontError] = Font.useFonts()
    expect(fontsLoaded).toBe(true)
    expect(fontError).toBe(false)

    const tree = render(<BillingDetailsProfile/>).toJSON();

    await waitFor(() => {
        expect(tree).toMatchSnapshot();
    })
})

it('No Async <BillingDetailsProfile/>', async () =>{
    await AsyncStorage.setItem("dark_mode_setting", "");
    Font.useFonts.mockReturnValue([true, false])
    const [fontsLoaded, fontError] = Font.useFonts()
    expect(fontsLoaded).toBe(true)
    expect(fontError).toBe(false)

    const tree = render(<BillingDetailsProfile/>).toJSON();

    await waitFor(() => {
        expect(tree).toMatchSnapshot();
    })
})

describe('Light Mode <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('can click back arrow', () =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const button = getByTestId('back-arrow');
        fireEvent.press(button);
        expect(require('expo-router').router.back).toHaveBeenCalled();
    })

    test('can click save button', () =>{
        const logSpy = jest.spyOn(console, 'log');
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const button = getByTestId('save');
        fireEvent.press(button);
        expect(logSpy).toHaveBeenCalledWith(
            expect.any(String)
        );
    })

    test('can open dropdown and options render', () =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const button = getByTestId('submodel-dropdown');
        fireEvent.press(button);
        expect(getByTestId('free')).not.toBeNull();
    })

    test('can type in email input', async() =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const input = getByTestId('email-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "placeholder@cropally.com"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("placeholder@cropally.com")
        })
    })

    test('can type in phone input', async() =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const input = getByTestId('phone-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "+1 (987) 654-3210"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("+1 (987) 654-3210")
        })
    })

    test('can type in zip input', async() =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const input = getByTestId('zip-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "98765"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("98765")
        })
    })

    test('can type in state input', async() =>{
        const { getByTestId } = render(
            <BillingDetailsProfile/>
        );

        const input = getByTestId('state-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "Rhode Island"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("Rhode Island")
        })
    })
})