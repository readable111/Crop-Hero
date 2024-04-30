import { React, Component, useState, setState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Modal,
	Platform,
	TouchableOpacity,
    Pressable,
    ActivityIndicator,
	Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font'
import { SearchBar } from '@rneui/themed';
import unidecode from 'unidecode';
import Colors from './Color.js'

global.dataArray = [ { id: "1", hrfNum: "01", title: "Artichoke" } ]

const SearchModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
	searchValue,
	originalData
}) => {

	const [searchBarTxt, setSearchBarTxt] = useState(searchValue);

    const [fontsLoaded, fontError] = useFonts({
        'Domine-Regular': require('./fonts/Domine-Regular.ttf'),
        'WorkSans-Regular': require('./fonts/WorkSans-Regular.ttf'),
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

	//create a copy of the array
	global.dataArray = JSON.parse(JSON.stringify(originalData))

    return (
        <Modal animationType='fade' visible={modalVisible} transparent={true} onRequestClose={onBackPress}>
			{/*create the dark grey box around it and ability to close modal by clicking*/}
            <Pressable style={styles.modalContainer} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

                { !isLoading && (
				<View style={[styles.modalView, {backgroundColor: Colors.SANTA_GRAY}]} > 
						{/*Display the search bar which looks identical to the dropdown search bar but works slightly differents*/}
						<SearchBar 
							placeholder="Search Crops..."
							showCancel
							round 
							value={searchBarTxt} 
							onChangeText={(text) => {searchFunction(text, originalData); setSearchBarTxt(text)}}  //call the search function and set searchBarTxt to whatever has been entered
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
								width: '90%'
							}}
							inputContainerStyle={{
								backgroundColor: 'white',
								borderRadius: 50,
								marginBottom: 0,
							}}
							placeholderTextColor={Colors.CHARCOAL}
						/> 
						{/*Display a list of the 10 best matches*/}
						<View style={styles.modalListStyle}>
							{searchBarTxt && dataArray.slice(0,10).map((item, key) => (
								<View key={key} style={styles.item}>
									<Text>Name: {item.title} | Crop Number: {item.hrfNum}</Text> 
								</View>
							))}
						</View>
				</View>
                )}
            </Pressable>
        </Modal>
    );
};

//the search function specifically for the modal version of the search bar
searchFunction = (text, arr) => { 
	//clean up the text based on whether or not it is a number
	var cleanedTxt = ""
	if (isNumeric(text)) {
		cleanedTxt = text.cleanNumForSearch();
	} else {
		cleanedTxt = text.cleanTextForSearch();
	}
	//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder

	//sort array in descending order based on DLED
	const updatedData = arr.sort(function(a,b){ 
		//if number, check against HRFNumber, otherwise look at name
		if (isNumeric(text)) {
			//use the damerauLevenshteinDistance function to sort the array in descending order based on the crop's HRFNumber
			return compareStrings(a.hrfNum,cleanedTxt) - compareStrings(b.hrfNum,cleanedTxt); 
		} else {
			//use the damerauLevenshteinDistance function to sort the array in descending order based on the crop's name
			return compareStrings(a.title,cleanedTxt) - compareStrings(b.title,cleanedTxt); 
		}
	});
	dataArray = updatedData
}; 

//Function that takes two strings and outputs value reflecting similarity
//Uses Dice Coefficient as faster and does a better job with substrings; If match found, returns 1
//Uses Damerau-Levenshtein Edit Distance as more resilient to both typos and overlapping patterns; Returns DLED + 0.1
this["compareStrings"] = function(s, t) {
	//get the SDC value
	sdc = sorensenDiceCoefficient(s.toUpperCase(),t.toUpperCase())
	//if the SDC is high enough, just return that and skip DLED
	if (sdc >= 0.45) { //TODO: tune this with proper database
		return 1
	}
	//get the DLED value
	dled = damerauLevenshteinDistance(s.toUpperCase(),t.toUpperCase(), 10) + 0.1 //add 0.1 to ensure that it is always going to be bigger than the SDC
	return dled
}

//Function that Ka-Weihe Fast Sorensen-Dice Coefficient (SDC) algorithm to quickly calculate value in nearly O(N) time complexity
//Returns value in range of [0, 1] with 1 being a perfect match
//This function was copied in rather than being imported from the library due to issues with outdated npm; comments are mine; original at www.npmjs.com/package/fast-dice-coefficient
this["sorensenDiceCoefficient"] = function(fst, snd) {
	//define variables
	var i, j, k, map, match, ref, ref1, sub;
	//if either string is too short, just return 0
	if (fst.length < 2 || snd.length < 2) {
		return 0;
	}
	//define map if previous if wasn't triggered, saving space
	map = new Map;
	//create a map of bigrams
	for (i = j = 0, ref = fst.length - 2; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
		sub = fst.substr(i, 2);
		if (map.has(sub)) {
			map.set(sub, map.get(sub) + 1);
		} else {
			map.set(sub, 1);
		}
	}
	//find the number of bigrams in common between the two strings based on set theory
	match = 0;
	for (i = k = 0, ref1 = snd.length - 2; (0 <= ref1 ? k <= ref1 : k >= ref1); i = 0 <= ref1 ? ++k : --k) {
		sub = snd.substr(i, 2);
		if (map.get(sub) > 0) {
			match++;
			map.set(sub, map.get(sub) - 1);
		}
	}
	//divide the number of elements in common by the average size of sets (mostly)
	//multiple by two because otherwise you're only getting a half
	//simplified version of 2 * true positives / (2 * true positives + false positives + false negatives)
	return 2.0 * match / (fst.length + snd.length - 2);
};

//Function that implements the Damerau-Levenshtein Edit Distance (DLED) algorithm which considers insertions, deletions, substitutions, and transpositions in O(len(s)*maxDistance) time complexity
//Stored using this[] to improve size compression during compilation without it getting shrunk down to nothingness
//Returns distance in range of [0, maxDistance]
this["damerauLevenshteinDistance"] = function(s, t, maxDistance=50) {
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
		//optimize algorithm by ignoring all cells in original matrix where |i-j| > max_distance
		for (var j = Math.max(0, i-maxDistance); j <= Math.min(m, i+maxDistance); j++) {
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
};

const DATA = [ 
	{ 
	  id: "1", 
	  hrfNum: "01",
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
	{ 
		id: "13", 
		hrfNum: "08",
		title: "Carrots", 
	}, 
]; 

//check if input is numeric
const isNumeric = (num) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num);

//clean up input specifically for search function
//list of stopwords for InnoDB with space following it to ensure it only hits words
const StopWords = ['a ', 'about ', 'an ', 'are ', 'as ', 'at ', 'be ', 'by ', 'com ', 'de ', 'en ', 'for ', 'from ', 'how ', 'i ', 'in ', 'is ', 'it ', 'la ', 'of ', 'on ', 'or ', 'that ', 'the ', 'this ', 'to ', 'was ', 'what ', 'when ', 'where ', 'who ', 'will ', 'with ', 'und ', 'the ', 'www ']
String.prototype.cleanTextForSearch = function(){
	newVal = unidecode(this) //handle most Unicode characters by romanizing them
	newVal = newVal.toUpperCase() //make all characters uppercase
	newVal = newVal.replace(/[^A-Z ]/g, ""); //remove all characters that aren't a letter or space
	let regex = new RegExp("\\b"+StopWords.join('|')+"\\b","gi") //remove all stopwords
	return newVal.replace(regex, '');
}
String.prototype.cleanNumForSearch = function(){
	newVal = this.replace(/[^0-9]/g, ""); //remove all characters that aren't a letter or space
	return newVal;
}

class SearchInput extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			loading: false, 
			data: DATA, 
			error: null, 
			searchValue: "", 
			sampleState: false,
		}; 
		this.arrayholder = DATA; 
		this.props.resultDisplayMode = "dropdown";
	} 

	searchFunction = (text) => { 
		//clean up the text based on whether or not it is a number
		var cleanedTxt = ""
		if (isNumeric(text)) {
			cleanedTxt = text.cleanNumForSearch();
		} else {
			cleanedTxt = text.cleanTextForSearch();
		}
		//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder

		//sort array in descending order based on DLED
		const updatedData = this.arrayholder.sort(function(a,b){ 
			//if number, check against HRFNumber, otherwise look at name
			if (isNumeric(text)) {
				//use the damerauLevenshteinDistance function to sort the array in descending order based on the crop's HRFNumber
				return compareStrings(a.hrfNum,cleanedTxt) - compareStrings(b.hrfNum,cleanedTxt); 
			} else {
				//use the damerauLevenshteinDistance function to sort the array in descending order based on the crop's name
				return compareStrings(a.title,cleanedTxt) - compareStrings(b.title,cleanedTxt); 
			}
		});
		this.setState({ data: updatedData, searchValue: text }); 
	}; 

	render() {
		if  (this.props.resultDisplayMode === "modal") {
			const { sampleState } = this.state;
			const setSampleState = sampleState => this.setState({ sampleState });
			return ( 
				<View style={styles.container}> 
					<TouchableOpacity activeOpacity={0.8} onPress={() => setSampleState(true)}>
						<SearchBar 
							placeholder="Search Crops..."
							round 
							editable={false}
							readOnly
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
					</TouchableOpacity>
					<SearchModal modalVisible={sampleState} 
                    	onBackPress={() => setSampleState(false)} //disappear if it is clicked outside of the modal
						searchValue={this.state.searchValue}
						searchFunction={(text) => this.searchFunction(text)}
						originalData={this.state.data}
                	/>
				</View> 
			); 
		}
		//if it isn't a modal, assume that the user wants the dropdown format
		else { 
			return ( 
				<View style={styles.container}> 
					<SearchBar 
						placeholder="Search Crops..."
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
					{/*I use a slice and map function instead of a FlatList so that it will work on pages with ScrollView*/}
					{/*Only possible because I only ever want the top 3 options*/}
					{this.state.searchValue && <View style={styles.unfoldedlistStyle}>
						{this.state.data.slice(0,3).map((item, key) => (
							<View key={key} style={styles.item}>
								<Text>Name: {item.title} | Crop Number: {item.hrfNum} | {this.props.resultDisplayMode}</Text> 
							</View>
						))}
					</View>}
					{!this.state.searchValue && <View style={styles.foldedlistStyle}>
					</View>}
				</View> 
			); 
		}
	} 
} 

const styles = StyleSheet.create({ 
	container: { 
		padding: 2, 
		width: '100%',
		backgroundColor: 'none',
		alignContent: 'flex-start',
		verticalAlign: 'bottom',
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		zIndex: 9999,
		elevation: (Platform.OS === 'android') ? 9999 : 0,
	}, 
	item: { 
		backgroundColor: Colors.SCOTCH_MIST_TAN, 
		padding: 10, 
		marginVertical: 6, 
		marginHorizontal: 10, 
	}, 
	foldedlistStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
		position: 'absolute',
		top: 65,
		alignSelf: 'center',
		width: '86%',
		zIndex: 9999,
		elevation: (Platform.OS === 'android') ? 9999 : 0,
	},
	unfoldedlistStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
		position: 'absolute',
		top: 65,
		alignSelf: 'center',
		width: '86%',
		zIndex: 9999,
		elevation: (Platform.OS === 'android') ? 9999 : 0,
		borderColor: Colors.CHARCOAL,
		borderWidth: 2,
		borderRadius: 5,
	},
	modalListStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
		position: 'absolute',
		top: 90,
		alignSelf: 'center',
		width: '86%',
	},
	modalContainer: {
		height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
		alignContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
	modalView: {
        height: Dimensions.get('window').height * 0.9,
        width: Dimensions.get('window').width * 0.86,
        alignItems: 'center',
        borderRadius: 25,
    },
});


export default SearchInput;