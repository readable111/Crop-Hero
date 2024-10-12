/****
 * @author Matthew Bustamente, Daniel Moreno
 * @reviewer
 * @tester 
 * 
 * Secondary author focused on fixing errors
 ***/

import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import DataHub from "../app/datahub.jsx";
import {
  CollapsibleSection,
  chartConfig
} from "../assets/DataHubCollapsibles"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
jest.useFakeTimers();
const pastCropsData = require('../test_data/pastCrops.json');

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

describe('Collapsible renders', () => {
  test('Collapsible renders correctly in dark mode', () => {
    const tree = render(
      <CollapsibleSection
        title="Past Crops"
        chartData={pastCropsData}
        chartConfig={chartConfig}
        isDark={true}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Collapsible renders correctly in light mode', () => {
    const tree = render(
      <CollapsibleSection
        title="Past Crops"
        chartData={pastCropsData}
        chartConfig={chartConfig}
        isDark={false}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});