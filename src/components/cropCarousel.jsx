/****
 * @author Tyler Bowen, Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * Secondary author (Daniel) added dark mode
 ***/

import React from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Colors from '../../assets/Color.js'
const { width } = Dimensions.get('window')

const Carousel = ({data,  isDarkMode=false}) => {
  const router  = useRouter();

  return(
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
        <Pressable onPress = {() => router.push({pathname:'crops/cropspage', params: item})}>
          <View style={[styles.item, isDarkMode && styles.itemDark]}>
            <Image source = {require("../../assets/icons/cropDefaultImage.png")}/>
            <Text>Name: {item[10]}</Text> 
            <Text>Medium: {item[18]}</Text>
            <Text>Location: {item[19]}</Text>
            <Text>Start Date: {new Date(item[13]).toISOString().slice(0,10)}</Text>
          </View>
        </Pressable>
        )}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    width: 151,
    height: 232,
    backgroundColor: Colors.SCOTCH_MIST_TAN,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  itemDark: {
    backgroundColor: Colors.LICHEN,
  }
});

const CropCarousel = ({crops, isDarkMode=false}) =>{
    return(<Carousel data={crops} isDarkMode={isDarkMode}/>)

}
export default CropCarousel
