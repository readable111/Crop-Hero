import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../assets/Color.js';
import NavBar from '../assets/NavBar.jsx';
import SearchInput from '../assets/SearchFeature.jsx';

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
      <View style={styles.container}>
        <Text style={styles.title}>Data Hub</Text>
        <StatusBar backgroundColor={Colors.WHITE_SMOKE} />
      </View>
      <View style={styles.searchContainer}>
        <SearchInput/>
      </View>
      <View style={styles.scrollContainer}>
        <View style={styles.collapsiblesContainer}>
          <CollapsibleSection
            isOpen={isOpen1}
            toggleOpen={() => setIsOpen1(!isOpen1)}
            title="Active Crops"
          />
          <CollapsibleSection
            isOpen={isOpen2}
            toggleOpen={() => setIsOpen2(!isOpen2)}
            title="Current Crops"
          />
          <CollapsibleSection
            isOpen={isOpen3}
            toggleOpen={() => setIsOpen3(!isOpen3)}
            title="Past Crops"
          />
        </View>
      </View>
      <NavBar dataHubSelected />
    </SafeAreaView>
  );
};

const CollapsibleSection = ({ isOpen, toggleOpen, title }) => (
  <View style={styles.collapsibleContainer}>
    <TouchableOpacity onPress={toggleOpen} style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </TouchableOpacity>
    {isOpen && (
      <View style={styles.collapsibleContent}>
        <Text style={styles.detailsText}>Placeholder for graph</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.SANTA_GRAY
  },
  container: {
    backgroundColor: Colors.ALMOND_TAN,
    width: '100%',
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 10, // Added padding bottom for spacing below the header
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start to remove extra space at the top
  },
  title: {
    fontFamily: 'Domine-Medium',
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 10, // Reduced margin for tighter layout
  },
  collapsiblesContainer: {
    width: '90%',
    marginTop: 10, // Reduced the top margin
  },
  collapsibleContainer: {
    marginBottom: 20, // Space between each collapsible
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 5,
    padding: 20,
  },
  header: {
    backgroundColor: Colors.ALMOND_TAN,
    padding: 10,
    borderRadius: 3,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  collapsibleContent: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  detailsText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Add space below the search bar
  },
});

export default DataHub;
