import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import { DataHub,
       Collapsible,
        ChartConfig }
       from "../app/datahub.jsx";
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
jest.useFakeTimers();

jest.mock('expo-font', ()=>({ //mock fonts
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))

jest.mock('react-native-chart-kit', () => ({ //mock chart kit
  LineChart: () => null,
}));

describe('<DataHub/>', () =>{
    beforeEach(async () => { //beforeEach must come before each test
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('Renders correctly', () =>{ //run test
        const tree = render(<DataHub/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Collapsible renders open', () => {
  test('Collapsible renders correctly when open', () => {
  const tree = render(
    <Collapsible
      isOpen={true}
      toggleOpen={() => {}}
      title="Active Crops"
      chartConfig={{/* mock chartConfig */}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
});

test('Collapsible renders closed', () => {
    test('Collapsible renders correctly when closed', () => {
  const tree = render(
    <Collapsible
      isOpen={false}
      toggleOpen={() => {}}
      title="Active Crops"
      chartConfig={{/* mock chartConfig */}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
});
