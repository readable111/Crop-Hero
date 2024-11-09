/****
 * @author Tyler Bowen, Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester 
 * 
 * Secondary author (Daniel) added dark mode
 ***/

import React, {useEffect, useState} from 'react'
import { View, FlatList, Dimensions, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Colors from '../../assets/Color.js'
const { width } = Dimensions.get('window')

const Carousel = ({data, isDarkMode=false}) => {
  const router  = useRouter();
  const [data, setData] = useState(data)


  useEffect(() => {
    const fetchData = async () => {
      const updatedData = await Promise.all(
        data.map(async (item) => {
          // Fetch CropMedium data
          const cropMediumResponse = await fetch(
            `https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/getCropMedium/${item.fld_s_SubscriberID_pk}/${item.fld_c_CropID_pk}`
          );
          const cropMediumData = await cropMediumResponse.json();

          // Fetch CropLocation data
          const cropLocationResponse = await fetch(
            `https://cabackend-a9hseve4h2audzdm.canadacentral-01.azurewebsites.net/getCropLocation/${item.fld_s_SubscriberID_pk}/${item.fld_c_CropID_pk}`
          );
          const cropLocationData = await cropLocationResponse.json();

          return {
            ...item,
            CropMedium: cropMediumData,
            CropLocation: cropLocationData,
          };
        })
      );

      setData(updatedData);
    };

    fetchData();
  }, [data]); 
  
  return(
          <FlatList
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
        <Pressable onPress = {() => router.push({pathname:'/cropspage', params: item})}>
          <View style={[styles.item, isDarkMode && styles.itemDark]}>
            <Image source = {require("../../assets/icons/cropDefaultImage.png")}/>
            <Text>Name: {item.name}</Text> 
            <Text>Medium: {item.CropMediumData.fld_m_MediumName}</Text>
            <Text>Location: {item.CropLocationData.fld_l_location}</Text>
            <Text>Start Date: {item.date}</Text>
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
