import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../assets/Color.js';
import NavBar from '../assets/NavBar.jsx';
import SearchInput from '../assets/SearchFeature.jsx';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width; // from react-native

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#000000"
  }
};

const DataHub = () => {
  const [fontsLoaded] = useFonts({
    'Domine-Medium': require('../assets/fonts/Domine-Medium.ttf'),
  });
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts are loading
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.WHITE_SMOKE} />
      <ScrollView style={styles.scrollArea}>
            <Text style={styles.title}>Data Hub</Text>
        <View style={styles.searchContainer}>
          <SearchInput/>
        </View>
        <View style={styles.collapsiblesContainer}>
          <Collapsible
            isOpen={isOpen1}
            toggleOpen={() => setIsOpen1(!isOpen1)}
            title="Active Crops"
            chartConfig={chartConfig}
          />
          <Collapsible
            isOpen={isOpen2}
            toggleOpen={() => setIsOpen2(!isOpen2)}
            title="Current Crops"
            chartConfig={chartConfig}
          />
          <Collapsible
            isOpen={isOpen3}
            toggleOpen={() => setIsOpen3(!isOpen3)}
            title="Past Crops"
            chartConfig={chartConfig}
          />
        </View>
      </ScrollView>
      <NavBar dataHubSelected/>
    </SafeAreaView>
  );
};

const Collapsible = ({ isOpen, toggleOpen, title, chartConfig }) => ( // Receive chartConfig as prop
  <View style={styles.collapsibleContainer}>
    <TouchableOpacity onPress={toggleOpen} style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.triangle}>{isOpen ? '▲' : '▼'}</Text>
    </TouchableOpacity>
    {isOpen && (
      <View style={styles.collapsibleContent}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [11, 13, 12, 14, 14, 15] }]
          }}
          width={screenWidth - 80} // Adjusted width for padding
          height={220}
          yAxisInterval={1}
          chartConfig={chartConfig} // Use chart config passed as prop
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginHorizontal: 10, // Adjusted horizontal margin
            borderWidth: 1,
            borderColor: Colors.ALMOND_TAN,
          }}
        />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY, // Ensures the entire background is SANTA_GRAY
  },
  title: {
    fontFamily: 'Domine-Medium',
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 0,
    backgroundColor: Colors.ALMOND_TAN,
    padding: 10,
    borderRadius:2
  },
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY, // Background for the scrolling area
  },
  searchContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.SANTA_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 9999,
  },
  collapsiblesContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    zIndex: 1,
  },
  collapsibleContainer: {
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    zIndex: 1,
  },
  header: {
     backgroundColor: Colors.ALMOND_TAN,
     padding: 10,
     borderRadius: 3,
     flexDirection: 'row',  // Ensure the title and triangle are in a row
     justifyContent: 'space-between', // Align items at the start and end
     alignItems: 'center', // Center items vertically
     paddingRight: 20, // Increase right padding for visual balance
   },
   headerText: {
     fontFamily: 'Domine-Medium',
     color: 'black',
     fontSize: 30,
     textAlign: 'center', // Align text to the left
     flex: 1, // Allows text to expand and push the triangle to the edge
   },
   triangle: {
     color: 'gray',
     fontSize: 20,
   },
 collapsibleContent: {
   padding: 20, // Increased padding around the content
   backgroundColor: Colors.ALMOND_TAN,
   borderRadius: 5,
   marginTop: 5,
   minHeight: 200,
   alignItems: 'center'
 },
  detailsText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DataHub;
