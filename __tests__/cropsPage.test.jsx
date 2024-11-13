/****
 * @author Isaac Boodt
 * @reviewer
 * @tester 
 ***/

import { render } from "@testing-library/react-native";
import CropsPage from "../app/cropspage";
import { useLocalSearchParams } from 'expo-router';
import * as Font from 'expo-font';

jest.mock('expo-font', ()=>({
        useFonts: jest.fn(),
        loadAsync: jest.fn().mockResolvedValue(true),
        isLoaded: jest.fn(()=>true)
}))

const searchParams = { label: 'temp', name: 'temp', hrfNum: '00', active: 'NaN', location: 'Lorem Ipsum', variety: 'Test', source: 'The store', date: '00/00/1001', comments: 'Who knows', indoors: 'Maybe', type:'Weird'};

jest.mock('expo-router', () => ({
        useLocalSearchParams: jest.fn(),
}));

describe('<CropsPage/>', () =>{
        test('renders correctly', () =>{
                useLocalSearchParams.mockReturnValue(searchParams);

                const tree = render(<CropsPage/>).toJSON();
                expect(tree).toMatchSnapshot();
        })
})