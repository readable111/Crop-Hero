import { render } from "@testing-library/react-native";
import cropsPage from "../app/cropspage";

describe('<cropsPage/>', () =>{
        test('renders correctly', () =>{
                const tree = render(<cropsPage/>).toJSON();
                expect(tree).toMatchSnapshot();
        })
})