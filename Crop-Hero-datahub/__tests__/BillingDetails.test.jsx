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


/*const button container.querySelector('div');
  expect(button.innerHTML).toEqual('Start'); */