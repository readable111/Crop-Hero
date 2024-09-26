/****
 * @author Isaac Boodt, Daniel Moreno
 * @reviewer 
 * @tester 
 ***/

import { render, fireEvent, screen} from '@testing-library/react-native'
import { Input } from 'react-native'
import AddCrops from '../app/addcrops'
import React from 'react';
import AppButton from '../assets/AppButton.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import NavBar from '../assets/NavBar.jsx';
import Colors from '../assets/Color';
import * as Font from 'expo-font';


jest.mock('expo-router', () => ({
    router:{
        push: jest.fn(),
    },
}
))

jest.mock('expo-font', () => ({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))


describe('<AddCrops/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", false);

        Font.useFonts.mockReturnValue([true, false])
        
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)

    })
    /*
    it('render input with placeholder, handles text change', () => {
        const handleChange = jest.fn();

        const { getByTestId} = 
        render(<addCrops handleChange={handleChange}/>);

        const nameInput = getByTestId("name-input")

        fireEvent.changeText(nameInput, Apple);

        expect(handleChange).toHaveBeenCalledWith('name', 'Apple');
    })
        */
    test('renders correctly', () =>{
        const tree = render(<AddCrops/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
/*
describe('<addCrops/>', () =>{
    it('render input with placeholder, handles text change', () => {
        const handleChange = jest.fn();

        const { getByTestId} = 
        render(<addCrops handleChange={handleChange}/>);

        const nameInput = getByTestId("name-input")

        fireEvent.changeText(nameInput, Apple);

        expect(handleChange).toHaveBeenCalledWith('name', 'Apple');
    })
})
    */