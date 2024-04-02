import { React, useState, Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	StatusBar, 
	Image, 
	Alert,
	FlatList
} from 'react-native';
import { SearchBar, ListItem } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { doubleMetaphone } from 'double-metaphone';
import { Col, Row } from '../assets/Grid.jsx';
import filter from "lodash.filter";
import Colors from '../assets/Color.js'
import Icons from '../assets/icons/Icons.js';
import AppButton from '../assets/AppButton.jsx';

const DATA = [ 
	{ 
	  id: "1", 
	  hrfNum: "1",
	  title: "Artichoke", 
	}, 
	{ 
	  id: "2", 
	  hrfNum: "42",
	  title: "Avocado", 
	}, 
	{ 
	  id: "3", 
	  hrfNum: "68",
	  title: "Carrot", 
	}, 
	{ 
	  id: "4", 
	  hrfNum: "70",
	  title: "Pecan", 
	}, 
	{ 
	  id: "5", 
	  hrfNum: "185",
	  title: "Apple", 
	}, 
	{ 
	  id: "6", 
	  hrfNum: "95",
	  title: "Grapes", 
	}, 
	{ 
	  id: "7", 
	  hrfNum: "13",
	  title: "Strawberries", 
	}, 
	{ 
	  id: "8", 
	  hrfNum: "56",
	  title: "Tomato", 
	}, 
	{ 
	  id: "9", 
	  hrfNum: "36",
	  title: "Cabbage", 
	}, 
	{ 
	  id: "10", 
	  hrfNum: "28",
	  title: "Red Cabbage", 
	}, 
	{ 
	  id: "11", 
	  hrfNum: "131",
	  title: "Pepper", 
	}, 
	{ 
	  id: "12", 
	  hrfNum: "84",
	  title: "Peach", 
	}, 
]; 

const Item = ({ title, hrfNum }) => { 
	return ( 
	  <View style={styles.item}> 
		<Text>{title} : {hrfNum}</Text> 
	  </View> 
	); 
}; 

const renderItem = ({ item }) => <Item title={item.title} hrfNum={item.hrfNum}/>; 

class SearchInput extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			loading: false, 
			data: DATA, 
			error: null, 
			searchValue: "", 
		}; 
		this.arrayholder = DATA; 
	} 
	
	searchFunction = (text) => { 
		const updatedData = this.arrayholder.filter((item) => { 
			const item_data = `${item.title.toUpperCase()})`; 
			const text_data = text.toUpperCase(); 
			return item_data.indexOf(text_data) > -1; 
		}); 
		this.setState({ data: updatedData, searchValue: text }); 
	}; 

	render() { 
		return ( 
			<View style={styles.container}> 
				<SearchBar 
					placeholder="Search Here..."
					showCancel
					round 
					value={this.state.searchValue} 
					onChangeText={(text) => this.searchFunction(text)} 
					autoCorrect={false} 
					keyboardType='default'
					style={{
						color: 'black',
						fontSize: 16,
					}}
					containerStyle={{
						backgroundColor: 'none',
						borderColor: 'rgba(0, 0, 0, 0)',
						borderRadius: 50,
						marginBottom: 0,
					}}
					inputContainerStyle={{
						backgroundColor: 'white',
						borderRadius: 50,
						marginBottom: 0,
					}}
					placeholderTextColor={Colors.CHARCOAL}
				/> 
				<FlatList 
					data={this.state.data.slice(0,3)} 
					renderItem={renderItem} 
					keyExtractor={(item) => item.id} 
					style={[
						styles.listStyle,
						this.state.searchValue ? styles.filledSearch : styles.emptySearch
					]}
				/> 
			</View> 
		); 
	} 
} 

const styles = StyleSheet.create({ 
	container: { 
		marginTop: 30, 
		padding: 2, 
		width: '100%',
		backgroundColor: 'none',
		alignContent: 'flex-start',
		verticalAlign: 'bottom',
		justifyContent: 'flex-start',
		alignSelf: 'flex-start'
	}, 
	item: { 
		backgroundColor: Colors.SCOTCH_MIST_TAN, 
		padding: 10, 
		marginVertical: 6, 
		marginHorizontal: 10, 
	}, 
	listStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
	},
	emptySearch: {
		opacity: 0,
	},
	filledSearch: {
		opacity: 1,
	}
  });


export default SearchInput;