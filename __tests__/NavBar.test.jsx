/****
 * @author Tyler Bowen
 * @reviewer 
 * @tester 
 ***/

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavBar from '../assets/NavBar.jsx';
import Colors from '../assets/Color.js';
import AppButton from '../assets/AppButton.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as Font from 'expo-font';
// Mock expo-router
jest.useFakeTimers()

jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(),
    }
}));
//copy the following mock if you are testing a component using expo-fonts
jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))


describe('<NavBar/>', () => {
    //you will need this beforeEach for every test, sets dark mode to false and sets the fontsLoaded to true
    beforeEach(async () =>{
        await AsyncStorage.setItem("dark_mode_setting", "false");

        Font.useFonts.mockReturnValue([true, false])

        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    })

    it('should render the NavBar component in light mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={true} cropsSelected={false} darkMode={false} />
        );
        expect(getByTestId('navbar-light')).toBeTruthy()
    });

    it('should render the NavBar component in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={true} cropsSelected={false} darkMode={true} />
        );

        // Check that the dark mode navbar is rendered
        expect(getByTestId('navbar-dark-mode')).toBeTruthy();
    });

    it('should navigate to home when home button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const homeButton = getByTestId('home-button');
        fireEvent.press(homeButton);

        // Check that the router.replace function was called with '/home'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/home');
    });

    it('should navigate to crops when crops button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={true} darkMode={false} />
        );

        const cropsButton = getByTestId('crops');
        fireEvent.press(cropsButton);

        // Check that the router.replace function was called with '/crops'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/crops');
    });

    it('should change button color when homeSelected is true', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={true} cropsSelected={false} darkMode={false} />
        );

        const homeButton = getByTestId('home-button');
        const buttonStyle = homeButton.props.style;

        // Check that the home button has the selected style (i.e., with MALACHITE color)
        expect(buttonStyle.backgroundColor).toBe(Colors.IRISH_GREEN);
    });
    it('should change profile when homeSelected is true', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} profileSelected={true} />
        );
        const profileButton = getByTestId('profile');
        const buttonColor = profileButton.props.style;

        // Check that the profile button has the selected style (i.e., with MALACHITE color)
        expect(buttonColor.color).toBe(Colors.MALACHITE);
    });

    it('should render correct icons in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={true} darkMode={true} />
        );

        // Check that the crops icon in dark mode is rendered
        const cropsButton = getByTestId('crops');
        expect(cropsButton).toBeTruthy();
    });
});
