import { render } from '@testing-library/react-native'
import addCrops from '../app/addcrops'

describe('<addCrops/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<addCrops/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})