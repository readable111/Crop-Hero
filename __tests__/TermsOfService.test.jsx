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
import ToS from '../app/termsofservice';
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

describe('Light Mode <ToS/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<ToS/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <ToS/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<ToS/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <ToS/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<ToS/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})