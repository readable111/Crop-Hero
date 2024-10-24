/****
 * @author Daniel Moreno
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

    test('renders correctly in light mode', () =>{
        tree = render(<NavBar homeSelected darkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar cropsSelected darkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar notebookSelected darkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar dataHubSelected darkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar profileSelected darkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('renders correctly in dark mode', () =>{
        tree = render(<NavBar homeSelected darkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar cropsSelected darkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar notebookSelected darkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar dataHubSelected darkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();

        tree = render(<NavBar profileSelected darkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should navigate to home when home button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const button = getByTestId('home-icon');
        fireEvent.press(button);

        const txtButton = getByTestId('home-txt');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/home'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/home');
    });

    it('should navigate to crops when crops button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const button = getByTestId('crops-icon');
        fireEvent.press(button);

        const txtButton = getByTestId('crops-txt');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/crops'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/crops');
    });

    it('should navigate to todo when todo button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const button = getByTestId('notebook-icon');
        fireEvent.press(button);

        const txtButton = getByTestId('notebook-txt');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/todo'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/todo');
    });

    it('should navigate to datahub when datahub button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const button = getByTestId('datahub-icon');
        fireEvent.press(button);

        const txtButton = getByTestId('datahub-txt');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/datahub'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/datahub');
    });

    it('should navigate to profile when profile button is clicked', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={false} />
        );

        const button = getByTestId('profile-icon');
        fireEvent.press(button);

        const txtButton = getByTestId('profile-txt');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/profile'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/profile');
    });

    

    it('should navigate to home when home button is clicked in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={true} />
        );

        const button = getByTestId('home-icon-dark');
        fireEvent.press(button);

        const txtButton = getByTestId('home-txt-dark');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/home'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/home');
    });

    it('should navigate to crops when crops button is clicked in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={true} />
        );

        const button = getByTestId('crops-icon-dark');
        fireEvent.press(button);

        const txtButton = getByTestId('crops-txt-dark');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/crops'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/crops');
    });

    it('should navigate to todo when todo button is clicked in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={true} />
        );

        const button = getByTestId('notebook-icon-dark');
        fireEvent.press(button);

        const txtButton = getByTestId('notebook-txt-dark');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/todo'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/todo');
    });

    it('should navigate to datahub when datahub button is clicked in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={true} />
        );

        const button = getByTestId('datahub-icon-dark');
        fireEvent.press(button);

        const txtButton = getByTestId('datahub-txt-dark');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/datahub'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/datahub');
    });

    it('should navigate to profile when profile button is clicked in dark mode', () => {
        const { getByTestId } = render(
            <NavBar homeSelected={false} cropsSelected={false} darkMode={true} />
        );

        const button = getByTestId('profile-icon-dark');
        fireEvent.press(button);

        const txtButton = getByTestId('profile-txt-dark');
        fireEvent.press(txtButton);

        // Check that the router.replace function was called with '/profile'
        expect(require('expo-router').router.replace).toHaveBeenCalledWith('/profile');
    });    
});
