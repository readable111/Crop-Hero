/****
 * @author Matthew Bustamente, Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Matthew Bustamente
 * 
 * Transferred stuff from main file here for testing purposes
 ***/

import React, { useState, useEffect, useRef } from 'react';
import { View, Platform, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Alert, PermissionsAndroid } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from './Color.js';
import NavBar from './NavBar.jsx';
import {SearchInput} from './SearchFeature.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';


const defaultDataset = {
  "labels": ["D", "E", "F", "A", "U", "L", "T"],
  "datasets": [
    {
      "data": [1, 2, 3, 4, 5, 6, 7]
    }
  ]
};

export const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: "#000000" },
  propsForLabels: {fontSize: 50,},
};

const screenWidth = Dimensions.get("window").width;

export const CollapsibleSection = ({ title, chartData, chartConfig, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const viewShotRef = useRef(null); // Reference for the ViewShot

  const exportGraph = async () => {
    console.log('Export button pressed');
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        if (!viewShotRef.current) {
          console.error('ViewShot reference is null');
          return;
        }

        setTimeout(async () => {
          try {
            const uri = await viewShotRef.current.capture();
            if (!uri) {
              console.error("Failed to capture URI");
              return;
            }
            console.log('Captured URI:', uri);
            //await MediaLibrary.saveToLibraryAsync(uri);  //saves image to the gallery as a temporary image
            await Sharing.shareAsync(uri)
          } catch (cameraRollError) {
            console.error("CameraRoll save error:", cameraRollError);
            Alert.alert('Failed to save chart');
          }
        }, 500);
      } else {
        console.log("Failed to grant permissions");
        return;
      }
  } catch (error) {
    console.error("Error saving image:", error);
    Alert.alert('Failed to save chart');
  }
};

  return (
    <View style={[styles.collapsibleContainer, isDark && styles.collapsibleContainerDark]}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerText, isDark && styles.headerTextDark]}>{title}</Text>
        <Text style={[styles.triangle, isDark && styles.triangleDark]}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && chartData && (
        <View style={styles.chartContainer}>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
            <ChartComponent chartData={chartData} chartConfig={chartConfig} isDark={isDark} />
          </ViewShot>
          <TouchableOpacity onPress={exportGraph} style={[styles.exportButton, isDark && styles.exportButtonDark]}>
            <Text style={[styles.exportButtonText, isDark && styles.exportButtonTextDark]}>Export Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const ChartComponent = ({ chartData, isDark }) => {
  const darkChartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#333333",
    backgroundGradientTo: "#000000",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.MALACHITE,
    },
    propsForLabels: { fontSize: 12 },
  };

  const lightChartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.IRIDIUM,
    },
    propsForLabels: { fontSize: 10 },
  };

  if (!Array.isArray(chartData.labels) || !chartData.labels.length) {
    return (
      <View style={[styles.collapsibleContent, isDark && styles.collapsibleContentDark]}>
        <LineChart
          data={{
            labels: ["D", "E", "F", "A", "U", "L", "T"],
            datasets: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
          }}
          width={screenWidth - 80}
          height={220}
          yAxisInterval={4}
          chartConfig={isDark ? darkChartConfig : lightChartConfig}
          bezier
          style={[styles.chartStyle, isDark && styles.chartStyleDark]}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.collapsibleContent, isDark && styles.collapsibleContentDark]}>
        <LineChart
          data={chartData}
          width={screenWidth - 80}
          height={220}
          yAxisInterval={4}
          chartConfig={isDark ? darkChartConfig : lightChartConfig}
          bezier
          style={[styles.chartStyle, isDark && styles.chartStyleDark]}
        />
      </View>
    );
  }
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
  chartContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  exportButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
