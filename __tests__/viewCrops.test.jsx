/****
 * @author Isaac Boodt
 * @reviewer
 * @tester 
 ***/

import { render } from "@testing-library/react-native";
import viewCrops from '../app/viewcrops'

describe('<viewCrops/>', () =>{
        test('renders correctly', () =>{
                const tree = render(<viewCrops/>).toJSON();
                expect(tree).toMatchSnapshot();
        })
})