/****
 * @author Isaac Boodt, Daniel Moreno
 * @reviewer 
 * @tester 
 ***/

import { render } from "@testing-library/react-native";
import ViewCrops from '../app/viewcrops'

describe('<viewCrops/>', () =>{
        test('renders correctly', () =>{
                const tree = render(<ViewCrops/>).toJSON();
                expect(tree).toMatchSnapshot();
        })
})