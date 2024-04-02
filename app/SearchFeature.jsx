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

{/*Function that implements the Damerau-Levenshtein Edit Distance (DLED) algorithm which considers insertions, deletions, substitutions, and transpositions*/}
{/*Stored using this[] to improve size compression during compilation without it getting shrunk down to nothingness*/}
{/*Takes two strings as parameters to compare*/}
this["damerauLevenshteinDistance"] = function(s, t) {
    var d = []; //2d matrix

    // Step 1: store string lengths
    var n = s.length;
    var m = t.length;
	//ensure that both strings contain characters based on principles of short-circuit evaluation
    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript with note that d is zero-indexed while n is one-indexed
	//A descending loop is quicker
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2: initialize the table
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3: populate the rows of the 2d table (row-major order)
	//remember that n and m are one-indexed as lengths
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
        // Step 4: populate the columns of the 2d table
        for (var j = 1; j <= m; j++) {
            //Check the jagged levenshtein distance total so far to see if the length of n can be returned as the edit distance early
            if (i == j && d[i][j] > 4) return n;

			// Step 5: store the cost for substitution
            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; 

            //Calculate the values for Levenshtein distance
            var mi = d[i - 1][j] + 1; //deletion
            var b = d[i][j - 1] + 1; //insertion
            var c = d[i - 1][j - 1] + cost; //substitution
			//find the minimum
            if (b < mi) mi = b;
            if (c < mi) mi = c;

			// Step 6: store the minimum
            d[i][j] = mi; 

            //Damerau transposition check based on optimal string alignment distance (triangle inequality doesn't hold)
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7: return the value in the final cell of the table
    return d[n][m];
}

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
		const updatedData = this.arrayholder.sort(function(a,b){ 
			return damerauLevenshteinDistance(a.title.toUpperCase(),text.toUpperCase()) - damerauLevenshteinDistance(b.title.toUpperCase(),text.toUpperCase()); 
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