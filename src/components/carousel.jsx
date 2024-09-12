/****
 * @author Tyler Bowen
 * @reviewer Daniel Moreno
 * @tester 
 ***/

import React from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet, Image} from 'react-native'
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
          <View syle = {styles.image}>
            <Image source = {require("../../assets/icons/Thermometer.png")} />
          </View>
          <View style = {styles.text}>
            <Text>Temperature: {item.temp}F</Text> 
            <Text>Feels Like: {item.perc}F</Text> 
          </View>
          </View>
        )}
      />
  )
}

const styles = StyleSheet.create({
  item: {
    width: width * .8,
    height: 90,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40
  },
  text:{
    flex: 1,
    alignContent: 'center',
    justifyContent:'center',
    marginHorizontal: 30
  },
  image: {
    flex:1,
    height: 67,
    width: 31,
    margin: 20,
  }
});

const HomeCarousel = ({data}) =>{
    return(<Carousel data={data}/>)

}
export default HomeCarousel
