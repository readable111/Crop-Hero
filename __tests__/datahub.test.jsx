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
import { Appearance } from 'react-native';

jest.useFakeTimers();
const pastCropsData = require('../test_data/pastCrops.json');
const testCropData = require('../test_data/testCropData.json');

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

    test('Renders correctly', async () => { //run test
        const { toJSON } = render(<DataHub/>);
        await waitFor(() => {
            expect(toJSON()).toMatchSnapshot();
        });
    });

    test('Renders correctly in dark mode', async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        const { toJSON } = render(<DataHub />);
        await waitFor(() => {
            expect(toJSON()).toMatchSnapshot();
        });
    });

    test('Handles missing dark mode setting and apply preference', async () => {
        await AsyncStorage.removeItem("dark_mode_setting");
        Appearance.getColorScheme = jest.fn().mockReturnValue('dark');
        const { getAllByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getAllByText("Data Hub").length).toBeGreaterThan(0);
        });
    });

    test('Handles empty dark mode setting and apply preference', async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Appearance.getColorScheme = jest.fn().mockReturnValue('light');
        const { getAllByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getAllByText("Data Hub").length).toBeGreaterThan(0);
        });
    });
});

describe('<DataHub/> tests', () => {
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
    });

    test('Dark mode setting is applied correctly', async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        const { getAllByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getAllByText("Data Hub").length).toBeGreaterThan(0);
        });
    });

    test('Calculates active crop data correctly', () => {
        const selectedActiveCrops = testCropData.filter(crop => crop.name === 'Abaca' && crop.active === 'Y');
        expect(selectedActiveCrops.length).toBeGreaterThan(0);
    });

    test('Calculates current crop data correctly', () => {
        const currentYear = new Date().getFullYear();
        const selectedCurrentCrops = testCropData.filter(crop => crop.name === 'Abaca' && parseInt(crop.date.split('/')[2]) >= currentYear);
        expect(selectedCurrentCrops.length).toBeGreaterThan(0);
    });

    test('Calculates past crop data correctly', () => {
        const currentYear = new Date().getFullYear();
        const selectedPastCrops = testCropData.filter(crop => crop.name === 'Alfalfa' && parseInt(crop.date.split('/')[2]) < currentYear);
        expect(selectedPastCrops.length).toBeGreaterThan(0);
    });
});

describe('Collapsible renders', () => {
  test('Collapsible renders correctly in dark mode', async () => {
    const { toJSON } = render(
      <CollapsibleSection
        title="Past Crops"
        chartData={pastCropsData}
        chartConfig={chartConfig}
        isDark={true}
      />
    );
    await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    });
  });

  test('Collapsible renders correctly in light mode', async () => {
    const { toJSON } = render(
      <CollapsibleSection
        title="Past Crops"
        chartData={pastCropsData}
        chartConfig={chartConfig}
        isDark={false}
      />
    );
    await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    });
  });
});
