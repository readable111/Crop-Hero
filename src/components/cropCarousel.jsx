import React from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Colors from '../../assets/Color.js'
const { width } = Dimensions.get('window')

const Carousel = ({data}) => {
  const router  = useRouter();


  return(
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
        <Pressable onPress = {() => router.push({pathname:'/cropspage', params: item})}>
          <View style={styles.item}>
            <Image source = {require("../../assets/icons/cropDefaultImage.png")}/>
            <Text> Name: {item.name}</Text> 
            <Text> Medium: {/*item.medium*/}</Text>
            <Text> Loction: {item.location}</Text>
            <Text> Start Date: {item.date}</Text>
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
    backgroundColor: Colors.ALMOND_TAN,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});

const CropCarousel = ({crops}) =>{
    return(<Carousel data={crops}/>)

}
export default CropCarousel
