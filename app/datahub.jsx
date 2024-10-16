/****
 * @author Matthew Bustamente
 * @reviewer Daniel Moreno
 * @tester Matthew Bustamente
 ***/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Appearance } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../assets/Color';
import NavBar from '../assets/NavBar.jsx';
import {SearchInput} from '../assets/SearchFeature.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CollapsibleSection, chartConfig} from '../assets/DataHubCollapsibles'


const screenWidth = Dimensions.get("window").width;

const DataHub = () => {
  const activeCropsData = require('../test_data/activeCrops.json');
  const currentCropsData = require('../test_data/currentCrops.json');
  const pastCropsData = require('../test_data/pastCrops.json');

  const [selectedCrop, setSelectedCrop] = useState({});
  const [isDark, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkModeSetting = async () => {
      const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting');
      let result = null;
      if (JSON_VALUE && JSON_VALUE !== "") {
        result = JSON.parse(JSON_VALUE);
      } else {
        colorScheme = Appearance.getColorScheme()
				if (colorScheme == 'dark') {
					result = true
				} else {
					result = false
				}
      }
      setIsDarkMode(result);
    };
    fetchDarkModeSetting().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar
        backgroundColor={isDark ? Colors.ALMOST_BLACK : Colors.WHITE_SMOKE}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent={false}
      />
      <ScrollView style={[styles.scrollArea, isDark && styles.scrollAreaDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Data Hub</Text>
        <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
          <SearchInput
            resultDisplayMode={"dropdown"}
            handlePress={(crop) => setSelectedCrop(crop)}
          />
          <Text>Crop Name: {selectedCrop.name || "____"}</Text>
        </View>

        <CollapsibleSection
          title="Active Crops"
          chartData={activeCropsData}
          chartConfig={chartConfig}
          isDark={isDark}
        />
        <CollapsibleSection
          title="Current Crops"
          chartData={currentCropsData}
          chartConfig={chartConfig}
          isDark={isDark}
        />
        <CollapsibleSection
          title="Past Crops"
          chartData={pastCropsData}
          chartConfig={chartConfig}
          isDark={isDark}
        />
      </ScrollView>
      <NavBar dataHubSelected darkMode={isDark} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY,
  },
  safeAreaDark: {
    backgroundColor: Colors.BALTIC_SEA,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY,
  },
  scrollAreaDark: {
    backgroundColor: Colors.BALTIC_SEA,
  },
  title: {
    fontFamily: 'Domine-Medium',
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 0, // Remove extra margins
    paddingVertical: 15, // Provide consistent vertical padding
    backgroundColor: Colors.ALMOND_TAN,
    color: 'black',
  },
  titleDark: {
    backgroundColor: Colors.CHARCOAL,
    color: 'white',
  },
  searchContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.SANTA_GRAY,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainerDark: {
    backgroundColor: Colors.BALTIC_SEA,
  },
  collapsibleContainer: {
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  collapsibleContainerDark: {
    backgroundColor: Colors.CHARCOAL,
  },
  header: {
    backgroundColor: Colors.ALMOND_TAN,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  headerDark: {
    backgroundColor: Colors.CHARCOAL,
  },
  headerText: {
    fontFamily: 'Domine-Medium',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  headerTextDark: {
    color: 'white',
  },
  triangle: {
    fontSize: 20,
    color: 'gray',
  },
  triangleDark: {
    color: 'white',
  },
  collapsibleContent: {
    padding: 15,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  collapsibleContentDark: {
    backgroundColor: Colors.CHARCOAL,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.ALMOND_TAN,
    marginHorizontal: 10,
  },
  chartStyleDark: {
    borderColor: Colors.CHARCOAL,
  },
});

export default DataHub;