import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import {WeatherSlider} from "../src/components/WeatherSlider"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";

describe('<WeatherSlider/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<WeatherSlider/>).toJSON();

        expect(tree).toMatchSnapshot();
    })
})