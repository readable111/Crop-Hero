/****
 * @author Matthew Bustamente, Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Matthew Bustamente
 *
 * Secondary author primarily hooked up the graphs to the search bar so that they were no longer random mock graphs
 * Also fixed some bugs
 ***/

import React, { useState, useEffect } from 'react';
import { View, Platform, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Appearance } from 'react-native';
import Colors from '../assets/Color';
import NavBar from '../assets/NavBar.jsx';
import {SearchInput} from '../assets/SearchFeature.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CollapsibleSection, chartConfig} from '../assets/DataHubCollapsibles'
import CROPS from '../test_data/testCropData.json'


const screenWidth = Dimensions.get("window").width;

const DataHub = () => {
  const [selectedCrop, setSelectedCrop] = useState({"name": ""});
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


  const DATE = new Date().getFullYear() + "";
  //TEMP CODE to handle mock data for demos, specifically for the active crops chart, and is based on search input
  const selectedActiveCrops = CROPS
  .filter(crop => crop.name === selectedCrop.name)
  .filter(crop => crop.active === 'Yes')
  .filter(crop => {
    const cropYear = crop.datePlanted.split('/')[2];
    return parseInt(cropYear) >= parseInt(DATE);
  });
  //sum yields by year and month
  const selectiveActiveDateCounts = {};
  selectedActiveCrops.forEach(entry => {
      const [month, day, year] = entry.datePlanted.split('/');
      const monthYear = `${year}-${month.padStart(2, '0')}`; // Format as 'YYYY-MM'
      selectiveActiveDateCounts[monthYear] = (selectiveActiveDateCounts[monthYear] || 0) + parseFloat(entry.yield);
  });
  formattedSelectiveActiveData = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };
  //get the 6 newest entries and convert to necessary format
  Object.entries(selectiveActiveDateCounts)
  .sort(([dateA], [dateB]) => {
    const [yearA, monthA] = dateA.split('-').map(Number);
    const [yearB, monthB] = dateB.split('-').map(Number);
    return yearB - yearA || monthB - monthA;
  })
  .slice(0, 6)
  .sort(([dateA], [dateB]) => {
    const [yearA, monthA] = dateA.split('-').map(Number);
    const [yearB, monthB] = dateB.split('-').map(Number);
    return yearA - yearB || monthA - monthB;
  })
  .forEach(([date, value]) => {
    formattedSelectiveActiveData.labels.push(date);
    formattedSelectiveActiveData.datasets[0].data.push(parseFloat(value.toFixed(2)));
  });


  //TEMP CODE to handle mock data for demos, specifically for the current crops chart, and is based on search input
  const selectedCurrentCrops = CROPS
  .filter(crop => crop.name === selectedCrop.name)
  .filter(crop => {
    const cropYear = crop.datePlanted.split('/')[2];
    return parseInt(cropYear) >= parseInt(DATE);
  });
  //sum yields by year and month
  const selectiveCurrentDateCounts = {};
  selectedCurrentCrops.forEach(entry => {
      const [month, day, year] = entry.datePlanted.split('/');
      const monthYear = `${year}-${month.padStart(2, '0')}`; // Format as 'YYYY-MM'
      selectiveCurrentDateCounts[monthYear] = (selectiveCurrentDateCounts[monthYear] || 0) + parseFloat(entry.yield);
  });
  formattedSelectiveCurrentData = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };
  //get the 6 newest entries and convert to necessary format
  Object.entries(selectiveCurrentDateCounts)
  .sort(([dateA], [dateB]) => {
    const [yearA, monthA] = dateA.split('-').map(Number);
    const [yearB, monthB] = dateB.split('-').map(Number);
    return yearB - yearA || monthB - monthA;
  })
  .slice(0, 6)
  .sort(([dateA], [dateB]) => {
    const [yearA, monthA] = dateA.split('-').map(Number);
    const [yearB, monthB] = dateB.split('-').map(Number);
    return yearA - yearB || monthA - monthB;
  })
  .forEach(([date, value]) => {
    formattedSelectiveCurrentData.labels.push(date);
    formattedSelectiveCurrentData.datasets[0].data.push(parseFloat(value.toFixed(2)));
  });

  //TEMP CODE to handle mock data for demos, specifically for active current crops chart, and is based on search input
  const selectedPastCrops = CROPS
  .filter(crop => crop.name === selectedCrop.name)
  .filter(crop => {
    const cropYear = crop.datePlanted.split('/')[2];
    return parseInt(cropYear) < parseInt(DATE);
  });
  // Sum yields by year
  const selectivePastDateCounts = {};
  selectedPastCrops.forEach(entry => {
    const year = entry.datePlanted.split('/')[2];
    selectivePastDateCounts[year] = (selectivePastDateCounts[year] || 0) + parseFloat(entry.yield);
  });
  formattedSelectivePastData = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };
  // Get the 6 newest entries by year and convert to the necessary format
  Object.entries(selectivePastDateCounts)
    .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
    .slice(0, 6)
    .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
    .forEach(([year, value]) => {
      formattedSelectivePastData.labels.push(year);
      formattedSelectivePastData.datasets[0].data.push(parseFloat(value.toFixed(2)));
    });



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
          chartData={formattedSelectiveActiveData}
          chartConfig={chartConfig}
          isDark={isDark}
        />
        <CollapsibleSection
          title="Current Crops"
          chartData={formattedSelectiveCurrentData}
          chartConfig={chartConfig}
          isDark={isDark}
        />
        <CollapsibleSection
          title="Past Crops"
          chartData={formattedSelectivePastData}
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
    zIndex: 9999,
		elevation: (Platform.OS === 'android') ? 9999 : 0,
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
exportButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: Colors.MALACHITE,
    borderRadius: 3,
  },
  exportButtonDark: {
    backgroundColor: Colors.SANTA_GRAY,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exportButtonTextDark: {
    color: 'white',
  },
});

export default DataHub;
