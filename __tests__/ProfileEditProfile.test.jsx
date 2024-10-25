/****
 * @author Daniel Moreno
 * @reviewer
 * @tester 
 ***/

import React from "react";
import { 
	StyleSheet
} from 'react-native'
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import * as ImagePicker from 'expo-image-picker'
import EditProfile from '../app/profile-editprofile'
import UploadImage from "../assets/ProfilePageImages/UploadImage";
import UploadModal from "../assets/ProfilePageImages/UploadModal";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
jest.useFakeTimers();

const mockLaunchImage = jest.fn();
jest.mock('expo-image-picker', () => {
    return {
        ...jest.requireActual('expo-image-picker'),
        requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValueOnce({
            status: 'granted'
        }), 
        launchImageLibraryAsync: jest.fn().mockResolvedValue({
          cancelled: false, type: 'image', 
          uri: 'abc.jpeg',
          width: '200',
          height: '200'
        }),
        requestCameraPermissionsAsync: jest.fn().mockResolvedValueOnce({
            status: 'granted'
        }), 
        launchCameraAsync: jest.fn().mockResolvedValue({
          cancelled: false, type: 'image', 
          uri: 'abc.jpeg',
          width: '200',
          height: '200'
        }),
    }
})

jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))
jest.mock('expo-router', () => ({
    router: {
        back: jest.fn(),
    }
}));

describe('Light Mode <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <EditProfile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<EditProfile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Test <UploadModal/>', () =>{
    beforeEach(async () => {
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const logSpy = jest.spyOn(console, 'log');
        render(<UploadModal
            modalVisible={true}
            onBackPress={() => console.log("back")}
            onCameraPress={() => console.log("camera")}
            onGalleryPress={() => console.log("gallery")}
            onRemovePress={() => console.log("remove")}
        />);
        const buttonBack = screen.getByTestId("back")
        fireEvent.press(buttonBack)
        expect(logSpy).toHaveBeenCalledWith('back');

        const buttonCamera = screen.getByTestId("camera")
        fireEvent.press(buttonCamera)
        expect(logSpy).toHaveBeenCalledWith('camera');

        const buttonGallery = screen.getByTestId("gallery")
        fireEvent.press(buttonGallery)
        expect(logSpy).toHaveBeenCalledWith('gallery');

        const buttonRemove = screen.getByTestId("remove")
        fireEvent.press(buttonRemove)
        expect(logSpy).toHaveBeenCalledWith('remove');

        expect(screen.toJSON()).toMatchSnapshot()
    })
})

describe('Test <UploadImage/>', () =>{
    beforeEach(async () => {
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly with edit turned off', () =>{
        const logSpy = jest.spyOn(console, 'log');
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={false}
            cameraMode='selfie'
            darkMode={false}
        />);
        
        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('renders correctly with edit turned on in gallery mode', async () =>{
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={true}
            cameraMode='gallery'
            darkMode={false}
        />);
        
        const buttonOpen = screen.getByTestId("open")
        fireEvent.press(buttonOpen)

        const buttonGallery = screen.getByTestId("gallery")
        fireEvent.press(buttonGallery)
        expect(ImagePicker.requestMediaLibraryPermissionsAsync).toBeCalledTimes(1)
        await waitFor(() =>  expect(ImagePicker.launchImageLibraryAsync).toBeCalledTimes(1))

        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('renders correctly with edit turned on in selfie mode', async () =>{
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={true}
            cameraMode='selfie'
            darkMode={false}
        />);
        
        const buttonOpen = screen.getByTestId("open")
        fireEvent.press(buttonOpen)

        const buttonCamera = screen.getByTestId("camera")
        fireEvent.press(buttonCamera)
        await waitFor(() => expect(ImagePicker.requestCameraPermissionsAsync).toBeCalledTimes(1))
        await waitFor(() =>  expect(ImagePicker.launchCameraAsync).toBeCalledTimes(1))

        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('renders correctly with edit turned on in back camera mode', async () =>{
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={true}
            cameraMode='back'
            darkMode={false}
        />);
        
        const buttonOpen = screen.getByTestId("open")
        fireEvent.press(buttonOpen)

        const buttonCamera = screen.getByTestId("camera")
        fireEvent.press(buttonCamera)
        await waitFor(() => expect(ImagePicker.requestCameraPermissionsAsync).toBeCalledTimes(2))
        await waitFor(() =>  expect(ImagePicker.launchCameraAsync).toBeCalledTimes(2))

        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('renders correctly after hitting remove', async () =>{
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={true}
            cameraMode='back'
            darkMode={false}
        />);
        
        const buttonOpen = screen.getByTestId("open")
        fireEvent.press(buttonOpen)

        const buttonRemove = screen.getByTestId("remove")
        fireEvent.press(buttonRemove)

        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('renders correctly with edit turned on with back press', async () =>{
        render(<UploadImage
            style={styles.avatarImage}
            isEditable={true}
            cameraMode='gallery'
            darkMode={false}
        />);
        
        const buttonOpen = screen.getByTestId("open")
        fireEvent.press(buttonOpen)

        const buttonBack = screen.getByTestId("back")
        fireEvent.press(buttonBack)

        expect(screen.queryByText('Remove')).toBeNull();

        expect(screen.toJSON()).toMatchSnapshot()
    })
})

describe('Unit Tests <Profile/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('can click back arrow', () =>{
        const { getByTestId } = render(
            <EditProfile/>
        );

        const button = getByTestId('back-arrow');
        fireEvent.press(button);
        expect(require('expo-router').router.back).toHaveBeenCalled();
    })

    test('can click save button', () =>{
        const logSpy = jest.spyOn(console, 'log');
        const { getByTestId } = render(
            <EditProfile/>
        );

        const button = getByTestId('save');
        fireEvent.press(button);
        expect(logSpy).toHaveBeenCalledWith(
            expect.any(String)
        );
    })

    test('can type in first name input', async() =>{
        const { getByTestId } = render(
            <EditProfile/>
        );

        const input = getByTestId('first-name-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "Daniel"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("Daniel")
        })
    })

    test('can type in last name input', async() =>{
        const { getByTestId } = render(
            <EditProfile/>
        );

        const input = getByTestId('last-name-input');
        fireEvent.changeText(input, {
            target: {
                defaultValue: "Moreno"
            }
        })
        await waitFor(() => {
            expect(input._fiber.alternate.pendingProps.defaultValue.target.defaultValue).toBe("Moreno")
        })
    })
})

const styles = StyleSheet.create({
	avatarImage: {
		marginTop: -100,
        marginBottom: 40,
	}
})