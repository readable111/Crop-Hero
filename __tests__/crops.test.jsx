/****
 * @author Isaac Boodt
 * @reviewer
 * @tester 
 ***/

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppButton from '../assets/AppButton.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import NavBar from '../assets/NavBar.jsx';
import Colors from '../assets/Color';
import * as Font from 'expo-font';
import Crops from '../app/crops'
import { StatusBar } from 'expo-status-bar';



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

describe('<Crops/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", false);

        Font.useFonts.mockReturnValue([true, false])
        
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)

    })
    /*
    it('should go to addCrops page on button press', () => {
        const { getByTestId } = render(
            <Crops/>
        )
        
        const addButton = getByTestId('addCrops');
        fireEvent.press(homeButton);

        expect(require('expo-router').router.push).toHaveBeenCalledWith('/home');
    })
    */
    test('renders correctly', () =>{
        const tree = render(<Crops/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    

})