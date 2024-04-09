import React from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet } from 'react-native'
import Colors from '../../assets/Color.js'
const { width } = Dimensions.get('window')

const Carousel = ({data}) => {
  return(
        <View style = {styles.container}>
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
          <View style={styles.item}>
            <Text> {item.text}</Text> 
          </View>
        )}
        snapToInterval={width*0.8}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: width * .8,
    height: 90,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeCarousel = () =>{
      HomeData = [{id:1, text: "slide 1"}, {id:2, text:"slide 2"}]
    return(<Carousel data={HomeData}/>)

}
export default HomeCarousel
