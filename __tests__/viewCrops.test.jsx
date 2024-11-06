/****
 * @author Isaac Boodt
 * @reviewer
 * @tester 
 ***/

import { render } from "@testing-library/react-native";
import ViewCrops from '../app/viewcrops'
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-font', ()=>({
        useFonts: jest.fn(),
        loadAsync: jest.fn().mockResolvedValue(true),
        isLoaded: jest.fn(()=>true)
}))

describe('<ViewCrops/>', () =>{
        beforeEach(async () => {
                await AsyncStorage.setItem("dark_mode_setting", false);
        
                Font.useFonts.mockReturnValue([true, false])
                
                const [fontsLoaded, fontError] = Font.useFonts()
                expect(fontsLoaded).toBe(true)
                expect(fontError).toBe(false)
        
        })

        test('renders correctly', () =>{
                const tree = render(<ViewCrops/>).toJSON();
                expect(tree).toMatchSnapshot();
        })
})