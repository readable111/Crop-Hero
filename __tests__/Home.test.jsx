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
import {Home, WeatherIcon, getGridpoints} from "../app/home"
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

describe('Light Mode <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Unit Tests <Home/>', () =>{
    test('WeatherIcon renders correctly with no chance', () =>{
        const tree = render(<WeatherIcon />).toJSON();
        expect(tree).toMatchSnapshot();
        const tree2 = render(<WeatherIcon forecastVal={"a few clouds"} isDarkMode={true}/>).toJSON();
        expect(tree2).toMatchSnapshot();
        const tree3 = render(<WeatherIcon forecastVal={"partly cloudy"}/>).toJSON();
        expect(tree3).toMatchSnapshot();
        const tree4 = render(<WeatherIcon forecastVal={"mostly cloudy"}/>).toJSON();
        expect(tree4).toMatchSnapshot();
        const tree5 = render(<WeatherIcon forecastVal={"overcast"}/>).toJSON();
        expect(tree5).toMatchSnapshot();
        const tree6 = render(<WeatherIcon forecastVal={"drizzle"}/>).toJSON();
        expect(tree6).toMatchSnapshot();
        const tree7 = render(<WeatherIcon forecastVal={"dust storm"}/>).toJSON();
        expect(tree7).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with slight chance', () =>{
        const tree = render(<WeatherIcon forecastVal={"slight chance rain"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with chance', () =>{
        const tree = render(<WeatherIcon forecastVal={"chance snow"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with likely', () =>{
        const tree = render(<WeatherIcon forecastVal={"likely thunderstorm"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('valid gridpoints for provided zipcode', async () => {
        data = await getGridpoints("76131");
        expectedData = {"gridpoint": "FWD/69,108", "status": 200}
        expect(data).toStrictEqual(expectedData);

        data = await getGridpoints("1");
        expectedData = {"gridpoint": "", "status": 406}
        expect(data).toStrictEqual(expectedData);
    });
})