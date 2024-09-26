/****
 * @author Isaac Boodt, Daniel Moreno
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
import CropsPage from "../app/cropspage";
jest.useFakeTimers();

describe('<CropsPage/>', () =>{
        test('renders correctly', () =>{
                const tree = render(<CropsPage />).toJSON();
                console.log(tree)
                expect(tree).toMatchSnapshot();
        })
})