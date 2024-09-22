import { render } from '@testing-library/react-native'
import crops from '../app/crops'

describe('<crops/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<crops/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})