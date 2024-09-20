import { render } from '@testing-library/react-native'
import Navbar from "../assets/NavBar.jsx"

describe('<Navbar/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<Navbar/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})