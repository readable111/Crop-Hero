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
import {SearchInput, SearchModal, searchFunction, compareStrings} from "../assets/SearchFeature.jsx";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
import CROPS from '../test_data/testCropData.json'
jest.useFakeTimers();

jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))

const MOCK_CROPS = CROPS.slice(0, 10)



describe('Light Mode <SearchInput/>', () =>{
    beforeEach(async () => {
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<SearchInput isDarkMode={false} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
 
    test('modal mode renders correctly', () =>{
        const tree = render(<SearchInput isDarkMode={false} resultDisplayMode={"modal"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <SearchInput/>', () =>{
    beforeEach(async () => {
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<SearchInput isDarkMode={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('renders correctly', () =>{
        const tree = render(<SearchInput isDarkMode={true} resultDisplayMode={"modal"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Search Function', () => {
    test('modal version is callable and doesn\'t throw error', ()=> {
        searchFunction("carro", MOCK_CROPS, "carr")
    })
})

describe('Search Modal <SearchModal />', () => {
    test('renders correctly in light mode', ()=> {
        const tree = render(<SearchModal
            modalVisible={true} 
            onBackPress={null} //disappear if it is clicked outside of the modal
            searchValue={"carro"}
            originalData={MOCK_CROPS}
            isDarkMode={false}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('renders correctly in dark mode', ()=> {
        const tree = render(<SearchModal
            modalVisible={true} 
            onBackPress={null} //disappear if it is clicked outside of the modal
            searchValue={"carro"}
            originalData={MOCK_CROPS}
            isDarkMode={true}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('can be opened', ()=> {
        const { getByTestId } = render(
            <SearchInput isDarkMode={false} resultDisplayMode={"modal"} />
        );

        const button = getByTestId('search-modal');
        fireEvent.press(button);

        const viewModal = getByTestId('modal-view');
        expect(viewModal.childElementCount).not.toEqual(0);
    })
})

describe('compareStrings', () => {
    test('function works', ()=> {
        expect(compareStrings("carr", "carrot") > compareStrings("date", "carrot")).toBeTruthy()
        expect(compareStrings("carrot", "carrot") > compareStrings("carr", "carrot")).toBeTruthy()
    })
})