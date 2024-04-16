import React from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet, Image } from 'react-native'
import Colors from '../../assets/Color.js'
const { width } = Dimensions.get('window')

const Carousel = ({data}) => {
  return(
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source = {require("../../assets/icons/cropDefaultImage.png")}/>
            <Text> Name: {item.cropName}</Text> 
            <Text> Medium: {item.medium}</Text>
            <Text> Loction: {item.location}</Text>
            <Text> Day #: {item.day}</Text>
          </View>
        )}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    width: 151,
    height: 232,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CropCarousel = ({crops}) =>{
    return(<Carousel data={crops}/>)

}
export default CropCarousel
