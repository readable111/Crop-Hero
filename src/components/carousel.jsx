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
    width: width,
    height: 90,
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeCarousel = () =>{
      HomeData = [{id:1, text: "slide 1"}, {id:2, text:"slide 2"}]
    return(<Carousel data={HomeData}/>)

}
export default HomeCarousel
