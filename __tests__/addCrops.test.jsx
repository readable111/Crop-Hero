import { render, fireEvent, screen} from '@testing-library/react-native'
import { Input } from 'react-native'
import addCrops from '../app/addcrops'

describe('<addCrops/>', () =>{
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
        const tree = render(<addCrops/>).toJSON();
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