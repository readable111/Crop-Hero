import { render, fireEvent } from '@testing-library/react-native'
import { useRouter } from 'expo-router'
import crops from '../app/crops'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'

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

describe('<crops/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", false);

        Font.useFonts.mockReturnValue([true, false])
        
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)

    })

    it('should go to addCrops page on button press', () => {
        const { getByTestId } = render(
            <crops/>
        )
        
        const addButton = getByTestId('addCrops');
        fireEvent.press(homeButton);

        expect(require('expo-router').router.push).toHaveBeenCalledWith('/home');
    })

    test('renders correctly', () =>{
        const tree = render(<crops/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    

})