import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import BillingDetailsProfile from "../app/profile-billingdetails"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode <BillingDetailsProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
    });

    test('renders correctly', () =>{
        const tree = render(<BillingDetailsProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})