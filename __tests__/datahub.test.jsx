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

    test('Renders correctly', () =>{ //run test
        const tree = render(<DataHub/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Renders correctly with a selected crop', async () => {
        const { getByTestId, toJSON } = render(<DataHub />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'Wheat');
        fireEvent.press(searchInput);

        await waitFor(() => {
            expect(toJSON()).toMatchSnapshot();
        });
    });

    test('Renders correctly in dark mode', async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        const tree = render(<DataHub />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Handles missing dark mode setting and apply preference', async () => {
        await AsyncStorage.removeItem("dark_mode_setting");
        Appearance.getColorScheme = jest.fn().mockReturnValue('dark');
        const { getByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getByText("Data Hub")).toBeTruthy();
        });
    });

    test('Handles empty dark mode setting and apply preference', async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Appearance.getColorScheme = jest.fn().mockReturnValue('light');
        const { getByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getByText("Data Hub")).toBeTruthy();
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
        const { getByText } = render(<DataHub />);
        await waitFor(() => {
            expect(getByText("Data Hub")).toBeTruthy();
        });
    });

    test('Search bar selects a crop and updates the chart data', async () => {
        const { getByTestId, getByText } = render(<DataHub />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'Wheat');
        fireEvent.press(getByText('Wheat'));

        await waitFor(() => {
            expect(getByText("Crop Name: Wheat")).toBeTruthy();
        });
    });

    test('Collapsible section "Active Crops" renders with correct data after selecting a crop', async () => {
        const { getByTestId, getByText } = render(<DataHub />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'Corn');
        fireEvent.press(getByText('Corn'));

        await waitFor(() => {
            expect(getByText("Active Crops")).toBeTruthy();
        });
    });

    test('Filters current crops correctly based on selected crop', async () => {
        const { getByTestId, getByText } = render(<DataHub />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'Barley');
        fireEvent.press(getByText('Barley'));

        await waitFor(() => {
            expect(getByText("Crop Name: Barley")).toBeTruthy();
            expect(getByText("Current Crops")).toBeTruthy();
        });
    });

    test('Filters past crops correctly based on selected crop', async () => {
        const { getByTestId, getByText } = render(<DataHub />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'Soybean');
        fireEvent.press(getByText('Soybean'));

        await waitFor(() => {
            expect(getByText("Crop Name: Soybean")).toBeTruthy();
            expect(getByText("Past Crops")).toBeTruthy();
        });
    });

    test('Calculates active crop data correctly', () => {
        const selectedActiveCrops = testCropData.filter(crop => crop.name === 'Wheat' && crop.active === 'Y');
        expect(selectedActiveCrops.length).toBeGreaterThan(0);
    });

    test('Calculates current crop data correctly', () => {
        const currentYear = new Date().getFullYear();
        const selectedCurrentCrops = testCropData.filter(crop => crop.name === 'Wheat' && parseInt(crop.date.split('/')[2]) >= currentYear);
        expect(selectedCurrentCrops.length).toBeGreaterThan(0);
    });

    test('Calculates past crop data correctly', () => {
        const currentYear = new Date().getFullYear();
        const selectedPastCrops = testCropData.filter(crop => crop.name === 'Wheat' && parseInt(crop.date.split('/')[2]) < currentYear);
        expect(selectedPastCrops.length).toBeGreaterThan(0);
    });
});

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
