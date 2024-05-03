import { React, Component, useState } from 'react';
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
	Alert
} from 'react-native';
import { useFonts } from 'expo-font'
import { SearchBar } from '@rneui/themed';
import unidecode from 'unidecode';
import Colors from './Color.js'
import { useRouter, Link, useLocalSearchParams } from 'expo-router'
import { doubleMetaphone } from 'double-metaphone'
import { stemmer } from 'stemmer'
import { lemmatize } from 'wink-lemmatizer'
import CROPS from '../test_data/testCropData.json'

//initialize to a bunch of weird, random values that will make it obvious if it is used
global.dataArray = [ { label: 'temp', name: 'temp', hrfNum: '00', active: 'NaN', location: 'Lorem Ipsum', variety: 'Test', source: 'The store', date: '00/00/1001', comments: 'Who knows', indoors: 'Maybe', type:'Weird'} ]

const SearchModal = ({
    modalVisible,
    onBackPress,
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
							autoCorrect={true} 
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
								<Link key={key} href={{ pathname: "/cropspage", params: { param: JSON.stringify(item) } }} push style={styles.item}>
									<View >
										<Text>Name: {item.name} | Crop Number: {item.hrfNum}</Text> 
									</View>
								</Link>
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
	var updatedData = []
	if (isNumeric(text)) {
		cleanedTxt = text.cleanNumForSearch();
		//sort array in descending order (find highest value) based on DLED
		updatedData = arr.sort(function(a,b){ 
			//use the damerauLevenshteinDistance function to sort the array based on the crop's HRFNumber
			return compareStrings(b.hrfNum,cleanedTxt) - compareStrings(a.hrfNum,cleanedTxt); 
		});
	} else {
		cleanedTxt = text.cleanTextForSearch();
		updatedData = arr.sort(function(a,b){ 
			//use the damerauLevenshteinDistance function to sort the array based on the crop's name
			return compareStrings(b.name,cleanedTxt) - compareStrings(a.name,cleanedTxt); 
		});
	}
	//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder

	dataArray = updatedData
}; 

//Function that takes two strings and outputs value reflecting similarity; High score = good
this["compareStrings"] = function(s, t) {
	//remove diacretics and other unicodes by turning them into ASCII-equivalent
	sASCII = unidecode(s)
	tASCII = unidecode(t)
	//ignore case
	sUpper = sASCII.toUpperCase()
	tUpper = tASCII.toUpperCase()

	//if exact match, return highest possible score
	if (matchExact(sUpper,tUpper)) {
		return 500
	}

	//store the length of each passed string
	sL = sUpper.length
	tL = tUpper.length

	//get the SDC value and multiply by 100 to get score and round to nearest whole number to eliminate decimals; high number is good
	matchScore = customRound(sorensenDiceCoefficient(sUpper,tUpper) * 100)	

	//give bonus score if first letters match as least likely letter to be wrong
	if (sUpper.charAt(0) === tUpper.charAt(0)) {
		matchScore += 18
	}
	//give bonus score if last letters match as still less likely to be wrong
	if (sUpper.charAt(sL - 1) === tUpper.charAt(tL - 1)) {
		matchScore += 5
	}
	//check the first letter after each space for both words by getting all of them, merging them into one string, and sending them through DLED as they are less likely to be wrong
	let sAcronym = sUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
	let tAcronym = tUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
	matchScore += customRound(5 / (damerauLevenshteinDistance(sAcronym,tAcronym, 10) )) //add 1 so never dividing by 0, then divide 5 by distance to determine score so diminishing bonus with increasing distance

	//give penalty if different length
	if (sL !== tL) {
		matchScore -= customAbs(sL - tL)
	}
	//give bonus if same number of syllables
	if (syllableCount(sUpper) === syllableCount(tUpper)) {
		matchScore += 5
	}

	//do a prefix match to assign a bonus if t starts with s
	if (tUpper.startsWith(sUpper)) {
		matchScore += 20
	}

	//apply penalty to score equal to the DLED value times a constant
	matchScore -= (damerauLevenshteinDistance(sUpper,tUpper, 50) * 2)

	//apply bonus from Jaro-Winkler Similarity which counts transpositions and matching characters with scaling bonus for prefix match
	jws = jaroWinklerSimilarity(sUpper, tUpper)
	matchScore += (jws * 15)

	//apply a stemmer algorithm to extract the English stem (removes plurals, men vs. man, past tense, z vs. s, democracy vs democratic, etc.)
	//uses a lemmatizer (Wink family of packages) rather than a stemmer to identify lemma using morphological analysis because a stemmer turns all operational/operative/operating into oper
	//lemmatizer considers context and produces a valid word which works better with doubleMetaphone though it does turn better into good
	//then send that through the Double Metaphone algorithm to receive 2 approximate phonetic encodings (PhonetEx strings) to account for pronunciations and accents (ensures smyth points to smith, not smash)
	var lemmatize = require( 'wink-lemmatizer' )
	sMetaphoneCodes = doubleMetaphone(lemmatize.noun(sUpper))
	tMetaphoneCodes = doubleMetaphone(lemmatize.noun(sUpper))
	//compare both primary codes; only give bonus if exact match
	if (matchExact(sMetaphoneCodes[0],tMetaphoneCodes[0])) {
		matchScore += 15
	}
	//compare s primary with t secondary; only give bonus if exact match
	if (matchExact(sMetaphoneCodes[0],tMetaphoneCodes[1])) {
		matchScore += 12
	}
	//compare s secondary with t primary; only give bonus if exact match
	if (matchExact(sMetaphoneCodes[1],tMetaphoneCodes[0])) {
		matchScore += 11
	}
	//compare s secondary with s secondary; only give bonus if exact match
	if (matchExact(sMetaphoneCodes[1],tMetaphoneCodes[1])) {
		matchScore += 10
	}

	return matchScore

	//TODO: possible ideas to improve it; aim for 90% threshold with response time of <=100ms which covers network delay and search
	//look at Sublime Text search which would allow for acronyms and as replacement for substring matching: https://www.forrestthewoods.com/blog/reverse_engineering_sublime_texts_fuzzy_match/ & https://github.com/Srekel/the-debuginator/blob/master/the_debuginator.h#L1856
		//tries to match each character in sequence
		//hidden score where some matched characters are worth more points than others (score starts at 0)
			//matched letter (good): +0
			//unmatched letter (bad): -1
			//Consecutively matched letters (very good): +5
			//letter following separator (good): +10
			//uppercase following lowercase (CamelCase; good): +10
			//unmatched leading letter: -3 (max of -9)
		//exhaustive search and returns match with highest score (basically already doing this with sort)

}

this["matchExact"] = function(s, t) {
	//ensure that s and t are defined and the same length
	if (typeof(s) === 'undefined' || typeof(t) === 'undefined') {
		return false
	}
	if (s.length !== t.length) {
		return false
	}
	//set up the regex to check for exact match
	//Finds match for "This is a test" or "This is a test if regex is working" but not "This is a -test+"
	//Positive lookbehind to match group before main expression, main expression, and positive lookahead to match group after main expression
	//Flags: global, case insensitive, and multiline
	const re = new RegExp("(?<=^| )" + s + "(?=$| )", "gmi")
	//match regex against t
	var match = t.match(re);
	//does match exist AND does t equal the first value returned in match
	return match && t === match[0];
}

this["syllableCount"] = function(s) {
	//ensure that s and t are defined and the same length
	if (typeof(s) === 'undefined') {
		return false
	}
    var someCount = 0;
    if(s.length>3) {
      if(s.substring(0,4)=="SOME") { //accounts for the fact that "somewhere" is two syllables
        s = s.replace("SOME","") 
        someCount++
      }
    }
    s = s.replace(/(?:[^LAEIOUY]|ED|[^LAEIOUY]E)$/, '');   
    s = s.replace(/^Y/, '');                                    
    var syl = s.match(/[AEIOUY]{1,2}/g);
    if(syl) {
        return syl.length + someCount;
    }
}

//Function that is a Javascript translation of Miguel Serrano's C-based version and Lars Garshol's Java-based version of the Jaro-Winkler Similarity algorithm to achieve O(len(s)*len(t)) time complexity
//returns a value between 0 and 1 with 0 being no match and 1 being exact match
this["jaroWinklerSimilarity"] = function(s, a) {
	//return early if either are undefined
	if (typeof(s) === 'undefined' || typeof(a) === 'undefined') {
		return 0.0
	}	
	//return early if either of the strings is empty
	if (!(s.length) || !(a.length)) {
		return 0.0
	}
	//return early if they are an exact match
	if (s === a) {
    	return 1.0;
    }

	//initialize all of these variables to 0
	//i,j,l are indices
	//m is count of matching characters
	//t is count of transpositions
	i = j = l = m = t = 0
	dw = 0.0
	//store the length of the strings
	sL = s.length
	aL = a.length
	//store the viable range so that it isn't recalculated
	range = aL / 2
	//initialize the flag arrays
	flags = Array(aL).fill(0)

	//calculate matching characters and transpositions simultaneously, decreasing number of loops
	prevpos = -1
	for (i = 0; i < sL; i++) {
	  ch = s.charAt(i) //store the character so that it isn't recalculated
    for (j = customMax(i - range, 0), l = customMin(i + range, aL); j < l; j++) {
      if (ch == a.charAt(j) && !flags[j]) {
        m++ //matching char found
        flags[j] = true
        if (prevpos != -1 && j < prevpos) {
          t++ //moved back before earlier
        }
        prevpos = j
        break
      }
    }
  }

	//return early if no matches were found
	if (!m || m === 0) {
		return 0.0
	}

	//calculate Jaro Distance
	dw = ((m / sL) + (m / aL) + ((m - t) / m)) / 3.0
	
	//only calculate Jaro-Winkler distance if above threshold
	const JD_THRESHOLD = 0.5
	if (dw > JD_THRESHOLD) {
  	//calculate common string prefix up to 4 chars
  	l = 0;
    for (i = 0; i < customMin(customMin(sL, aL), 4); i++){
      if (s.charAt(i) == a.charAt(i)) {
        l++;
      }
    }
  
  	//calculate Jaro-Winkler distance with scaling factor of 0.2
  	const SCALING_FACTOR = 0.3
  	dw = dw + (l * SCALING_FACTOR * (1 - dw));
	}

	return dw.toFixed(6)
}

//write some custom math functions to speed stuff up
this["customMax"] = function(x, y) {
	return x > y ? x : y
}
this["customMin"] = function(x, y) {
	return x < y ? x : y
}
this["customRound"] = function(x) {
	return (x + (x>0?0.5:-0.5)) << 0;
}
this["customAbs"] = function(x) {
	return (x + (x >> 31)) ^ (x >> 31);
}

//Function that uses Ka-Weihe Fast Sorensen-Dice Coefficient (SDC) algorithm to quickly calculate value in nearly O(len(fst) + len(snd)) time complexity
//Returns value in range of [0, 1] with 1 being a perfect match
//This function was copied in rather than being imported from the library due to issues with outdated npm; comments are mine; original at www.npmjs.com/package/fast-dice-coefficient
this["sorensenDiceCoefficient"] = function(fst, snd) {
	//if a variable is undefined, just return 0
	if (typeof(fst) === 'undefined' || typeof(snd) === 'undefined') {
		return 0
	}
	
	//define variables
	var i, j, k, map, match, ref, ref1, sub;
	fstL = fst.length
	sndL = snd.length
	//if either string is too short, just return 0
	if (fstL < 2 || sndL < 2) {
		return 0;
	}
	//define map if previous if wasn't triggered, saving space
	map = new Map;
	//create a map of bigrams
	for (i = j = 0, ref = fstL - 2; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
		sub = fst.substr(i, 2);
		if (map.has(sub)) {
			map.set(sub, map.get(sub) + 1);
		} else {
			map.set(sub, 1);
		}
	}
	//find the number of bigrams in common between the two strings based on set theory
	match = 0;
	for (i = k = 0, ref1 = sndL - 2; (0 <= ref1 ? k <= ref1 : k >= ref1); i = 0 <= ref1 ? ++k : --k) {
		sub = snd.substr(i, 2);
		if (map.get(sub) > 0) {
			match++;
			map.set(sub, map.get(sub) - 1);
		}
	}
	//divide the number of elements in common by the average size of sets (mostly)
	//multiple by two because otherwise you're only getting a half
	//simplified version of 2 * true positives / (2 * true positives + false positives + false negatives)
	return 2.0 * match / (fstL + sndL - 2);
};

//map of cartesian coordinates for all letters on a QWERTY keyboard
keyboardCartesianCoords = {
    'Q': {'y': 0, 'x': 0},
    'W': {'y': 0, 'x': 1},
    'E': {'y': 0, 'x': 2},
    'R': {'y': 0, 'x': 3},
    'T': {'y': 0, 'x': 4},
    'Y': {'y': 0, 'x': 5},
    'U': {'y': 0, 'x': 6},
    'I': {'y': 0, 'x': 7},
    'O': {'y': 0, 'x': 8},
    'P': {'y': 0, 'x': 9},
	//0.25 x stagger from top row
    'A': {'y': 1, 'x': 0.25},
    'S': {'y': 1, 'x': 1.25},
    'D': {'y': 1, 'x': 2.25},
    'F': {'y': 1, 'x': 3.25},
    'G': {'y': 1, 'x': 4.25},
    'H': {'y': 1, 'x': 5.25},
    'J': {'y': 1, 'x': 6.25},
    'K': {'y': 1, 'x': 7.25},
    'L': {'y': 1, 'x': 8.25},
	//0.75 x stagger from top row
    'Z': {'y': 2, 'x': 0.75},
    'X': {'y': 2, 'x': 1.75},
    'C': {'y': 2, 'x': 2.75},
    'V': {'y': 2, 'x': 3.75},
    'B': {'y': 2, 'x': 4.75},
    'N': {'y': 2, 'x': 5.75},
    'M': {'y': 2, 'x': 6.75},
}
//based the keyboardCartesianCoords, it will output a value of 0 or a decimal between 1 and 9 (inclusive)
this["euclideanDistance"] = function(a, b) {
	if (typeof(a) === 'undefined' || typeof(b) === 'undefined') {
		return 50
	}
	if (a.length === 1 && a.match(/[A-Z]/i) && b.length === 1 && b.match(/[A-Z]/i)) {
		s = (keyboardCartesianCoords[a]['x']-keyboardCartesianCoords[b]['x'])**2
		t = (keyboardCartesianCoords[a]['y']-keyboardCartesianCoords[b]['y'])**2
		return Math.sqrt(s+t)
	} else {
		return 50
	}	
}

//Function that implements the Damerau-Levenshtein Edit Distance (DLED) algorithm which considers insertions, deletions, substitutions, and transpositions in O(len(s)*maxDistance) time complexity
//Also applies Euclidean Distance between keys on a QWERTY keyboard to penalize certain combinations
//Stored using this[] to improve size compression during compilation without it getting shrunk down to nothingness
//Returns distance in range of [0, maxDistance]
this["damerauLevenshteinDistance"] = function(s, t, maxDistance=50) {
	//Step 0: test to see if it should exit prematurely
	//if a variable is undefined, just return maxDistance
	if (typeof(s) === 'undefined' || typeof(t) === 'undefined') {
		return maxDistance
	}

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
		for (var j = customMax(0, i-maxDistance); j <= customMin(m, i+maxDistance); j++) {
            //Check the jagged levenshtein distance total so far to see if the length of n can be returned as the edit distance early
            if (i == j && d[i][j] > 4) return n;

			// Step 5: store the costs based on distance on QWERTY keyboard
            var t_j = t.charAt(j - 1);
            var subCost = euclideanDistance(s_i, t_j) / 3; //divide by 3 so bring range down to [0,3]; also used for transposition (plus extra penalty) as still related to nearness on keyboard
			var insertCost = 2 //always less than distance between say 'q' and 'p' but still more than the deletion cost
			var deleteCost = 1
			

            //Calculate the values for Levenshtein distance
            var mi = d[i - 1][j] + deleteCost; //deletion
            var b = d[i][j - 1] + insertCost; //insertion; slight penalty to insertions so 1.5 rather than 1
            var c = d[i - 1][j - 1] + subCost; //substitution
			//find the minimum
            if (b < mi) mi = b;
            if (c < mi) mi = c;

			// Step 6: store the minimum
            d[i][j] = mi; 

            //Damerau transposition check based on optimal string alignment distance (triangle inequality doesn't hold)
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = customMin(d[i][j], d[i - 2][j - 2] + subCost + 0.5);
            }
        }
    }

    // Step 7: return the value in the final cell of the table
    return d[n][m];
};

//check if input is numeric
const isNumeric = (num) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num);

//clean up input specifically for search function
//list of stopwords for InnoDB with space following it to ensure it only hits words
const StopWords = ['a ', 'about ', 'an ', 'are ', 'as ', 'at ', 'be ', 'by ', 'com ', 'de ', 'en ', 'for ', 'from ', 'how ', 'i ', 'in ', 'is ', 'it ', 'la ', 'of ', 'on ', 'or ', 'that ', 'the ', 'this ', 'to ', 'was ', 'what ', 'when ', 'where ', 'who ', 'will ', 'with ', 'und ', 'the ', 'www ']
String.prototype.cleanTextForSearch = function(){
	newVal = this.toUpperCase() //make all characters uppercase
	newVal = newVal.replace(/[^A-Z ]/g, ""); //remove all characters that aren't a letter or space
	let regex = new RegExp("\\b"+StopWords.join('|')+"\\b","gi") //remove all stopwords
	return newVal.replace(regex, '');
}
String.prototype.cleanNumForSearch = function(){
	newVal = this.replace(/[^0-9]/g, ""); //remove all characters that aren't a letter or space
	return newVal;
}

const SearchListItem = ({itemProp}) =>{
    return(
		<Pressable onPress={() => router.push({pathname:'/cropspage', params: itemProp})}>
			<View style={styles.item}>
				<Text>Name: {itemProp.name} | Crop Number: {itemProp.hrfNum}</Text> 
			</View>
		</Pressable>
	)
}

class SearchInput extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			loading: false, 
			data: CROPS, 
			error: null, 
			searchValue: "", 
			sampleState: false,
		}; 
		this.arrayholder = CROPS; 
		this.props.resultDisplayMode = "dropdown";
	} 

	searchFunction = (text) => { 
		//clean up the text based on whether or not it is a number
		var cleanedTxt = ""
		var updatedData = []
		if (isNumeric(text)) {
			cleanedTxt = text.cleanNumForSearch();
			//sort array in descending order (find highest value) based on DLED
			updatedData = this.arrayholder.sort(function(a,b){ 
				//use the damerauLevenshteinDistance function to sort the array based on the crop's HRFNumber
				return compareStrings(b.hrfNum,cleanedTxt) - compareStrings(a.hrfNum,cleanedTxt); 
			});
		} else {
			cleanedTxt = text.cleanTextForSearch();
			//sort array in descending order (find highest value) based on DLED
			updatedData = this.arrayholder.sort(function(a,b){ 
				//use the damerauLevenshteinDistance function to sort the array based on the crop's HRFNumber
				return compareStrings(b.name,cleanedTxt) - compareStrings(a.name,cleanedTxt); 
			});
		}
		//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder

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
						autoCorrect={true} 
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
							<Link key={key} href={{ pathname: "/cropspage", params: { param: JSON.stringify(item) } }} push style={styles.item}>
								<View >
									<Text>Name: {item.name} | Crop Number: {item.hrfNum}</Text> 
								</View>
							</Link>
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