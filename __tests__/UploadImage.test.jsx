import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import UploadImage from "../assets/ProfilePageImages/UploadImage"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

describe('Light Mode Selfie <UploadImage/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<UploadImage style={{}} cameraMode={"selfie"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Light Mode Gallery <UploadImage/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<UploadImage style={{}} cameraMode={"gallery"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Light Mode Gallery <UploadImage/>', () =>{
    test('renders correctly', () =>{
        const tree = render(<UploadImage style={{}} cameraMode={"back"} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})