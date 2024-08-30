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
import { lemmatize } from 'wink-lemmatizer'
import CROPS from '../test_data/testCropData.json'

//initialize to a bunch of weird, random values that will make it obvious if it is used
global.dataArray = [ { label: 'temp', name: 'temp', hrfNum: '00', active: 'NaN', location: 'Lorem Ipsum', variety: 'Test', source: 'The store', date: '00/00/1001', comments: 'Who knows', indoors: 'Maybe', type:'Weird'} ]
//create some caches
var compareStrings_cache = {}
var sorensenDiceCoefficient_cache = {}
var removeCommonPrefixAndSuffix_cache = {}
var syllableCount_cache = {}
var damerauLevenshteinDistance_cache = {}
var euclideanDistance_cache = {}
var jaroWinklerSimilarity_cache = {}
var doubleMetaphone_cache = {}
this["genCacheKey"] = function(funcName, firstArg, ...args) {
	cacheKey = `${funcName}:${firstArg}:`
	for (const arg of args) {
		cacheKey += String(arg)
      	cacheKey += ":"
	}
	return cacheKey;
}



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
								fontSize: 14,
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

var preprocessingTime = 0
var sdcTime = 0
var firstLastLetterTime = 0
var lengthSyllableTime = 0
var prefixMatchTime = 0
var dledTime = 0
var jwsTime = 0
var lemmatizeTime = 0
var dmTime = 0


//the search function specifically for the modal version of the search bar
searchFunction = (text, arr) => { 
	//clean up the text based on whether or not it is a number
	var cleanedTxt = ""
	var updatedData = []
	if (isNumeric(text)) {
		cleanedTxt = text.cleanNumForSearch();
		//sort array in descending order (find highest value) based on DLED
		updatedData = arr.sort(function(a,b){ 
			return compareStrings(b.hrfNum,cleanedTxt) - compareStrings(a.hrfNum,cleanedTxt); 
		});
	} else {
		cleanedTxt = text.cleanTextForSearch();
		updatedData = arr.sort(function(a,b){ 
			return compareStrings(b.name,cleanedTxt) - compareStrings(a.name,cleanedTxt); 
		});
	}
	//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder

	dataArray = updatedData
}; 

//Function that takes two strings and outputs value reflecting similarity; High score = good
this["compareStrings"] = function(s, t) {
	let startTime = performance.now()
	//remove diacretics and other unicodes by turning them into ASCII-equivalent
	sASCII = unidecode(s)
	tASCII = unidecode(t)
	//ignore case
	sUpper = sASCII.toUpperCase()
	tUpper = tASCII.toUpperCase()

	compareStringsCacheKey = genCacheKey("compareStrings", s, t)
	if (compareStringsCacheKey in compareStrings_cache) {
		return compareStrings_cache[compareStringsCacheKey]
	}

	//if exact match, return highest possible score
	if (matchExact(sUpper,tUpper)) {
		compareStrings_cache[compareStringsCacheKey] = 1000
		return 1000
	}

	//store the length of each passed string
	sL = sUpper.length
	tL = tUpper.length
	matchScore = 0
	let endTime = performance.now()
	preprocessingTime += endTime - startTime

	//give bonus score if first letters match as least likely letter to be wrong
	startTime = performance.now()
	if (sUpper.charAt(0) === tUpper.charAt(0)) {
		matchScore += 18
	}
	//give bonus score if last letters match as still less likely to be wrong
	if (sUpper.charAt(sL - 1) === tUpper.charAt(tL - 1)) {
		matchScore += 5
	}
	//check the first letter after each space for both words by getting all of them, merging them into one string, and sending them through SDC as they are less likely to be wrong
	if (sUpper.indexOf(' ') >= 0 && tUpper.indexOf(' ') >= 0) {
		matchScore += 10 //if both have spaces, provide a bonus
		let sAcronym = sUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
		let tAcronym = tUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
		matchScore += customRound(15 * sorensenDiceCoefficient(sAcronym,tAcronym)) //multiply by X to determine score so diminishing bonus with increasing distance, approaching 0
	}
	else if ((sUpper.indexOf(' ') >= 0 && tUpper.indexOf(' ') < 0) || (sUpper.indexOf(' ') < 0 && tUpper.indexOf(' ') >= 0)) {
		matchScore -= 10 //if only one has a space, apply a penalty
	}
	endTime = performance.now()
	firstLastLetterTime += endTime - startTime

	//remove any common prefix & suffix, providing a bonus the larger that the difference is from the original
	startTime = performance.now()
	corrected_strings = removeCommonPrefixAndSuffix(sUpper, tUpper)
	sShortened = corrected_strings[0]
	tShortened = corrected_strings[1]
	//3 chars removed from both so boost score by 24 total
	matchScore += ((sL - sShortened)*4)
	matchScore += ((tL - tShortened)*4)
	endTime = performance.now()
	prefixMatchTime += endTime - startTime

	//get the SDC value and multiply by 100 to get score and round to nearest whole number to eliminate decimals; high number is good
	startTime = performance.now()
	matchScore += customRound(sorensenDiceCoefficient(sUpper,tUpper) * 100)	
	if (matchScore < 30) {
		compareStrings_cache[compareStringsCacheKey] = matchScore
		return matchScore
	}
	endTime = performance.now()
	sdcTime += endTime - startTime

	//give penalty if different length
	startTime = performance.now()
	if (sL !== tL) {
		matchScore -= customAbs(sL - tL)
	}
	//give bonus if same number of syllables
	if (syllableCount(sUpper) === syllableCount(tUpper)) {
		matchScore += 5
	}
	endTime = performance.now()
	lengthSyllableTime += endTime - startTime

	//apply penalty to score equal to the DLED value times a constant
	//uses the shortened versions of the strings to cut down on string size
	startTime = performance.now()
	matchScore -= (damerauLevenshteinDistance(sShortened,tShortened, 5) * 3)
	if (matchScore < 40) {
		compareStrings_cache[compareStringsCacheKey] = matchScore
		return matchScore
	}
	endTime = performance.now()
	dledTime += endTime - startTime

	//apply bonus from Jaro-Winkler Similarity which counts transpositions and matching characters with scaling bonus for prefix match
	startTime = performance.now()
	jws = jaroWinklerSimilarity(sUpper, tUpper)
	matchScore += (jws * 15)
	if (matchScore < 50) {
		compareStrings_cache[compareStringsCacheKey] = matchScore
		return matchScore
	}
	endTime = performance.now()
	jwsTime += endTime - startTime

	//apply a stemmer algorithm to extract the English stem (removes plurals, men vs. man, past tense, z vs. s, democracy vs democratic, etc.)
	//uses a lemmatizer (Wink family of packages) rather than a stemmer to identify lemma using morphological analysis because a stemmer turns all operational/operative/operating into oper
	//lemmatizer considers context and produces a valid word which works better with doubleMetaphone though it does turn better into good
	//then send that through the Double Metaphone algorithm to receive 2 approximate phonetic encodings (PhonetEx strings) to account for pronunciations and accents (ensures smyth points to smith, not smash)
	startTime = performance.now()
	sMetaphoneCacheKey = genCacheKey("doubleMetaphone", sUpper)
	tMetaphoneCacheKey = genCacheKey("doubleMetaphone", tUpper)
	if (sMetaphoneCacheKey in doubleMetaphone_cache) {
		sMetaphoneCodes = doubleMetaphone_cache[sMetaphoneCacheKey]
	} else {
		var lemmatize = require( 'wink-lemmatizer' )
		sMetaphoneCodes = doubleMetaphone(lemmatize.noun(sUpper))
		doubleMetaphone_cache[sMetaphoneCacheKey] = sMetaphoneCodes
	}
	if (tMetaphoneCacheKey in doubleMetaphone_cache) {
		tMetaphoneCodes = doubleMetaphone_cache[tMetaphoneCacheKey]
	} else {
		var lemmatize = require( 'wink-lemmatizer' )
		tMetaphoneCodes = doubleMetaphone(lemmatize.noun(sUpper))
		doubleMetaphone_cache[tMetaphoneCacheKey] = tMetaphoneCodes
	}	
	endTime = performance.now()
	lemmatizeTime += endTime - startTime

	startTime = performance.now()
	//compare both primary codes; only give bonus if exact match
	if (sMetaphoneCodes[0] === tMetaphoneCodes[0]) {
		matchScore += 15
	}
	//compare s primary with t secondary; only give bonus if exact match
	if (sMetaphoneCodes[0] === tMetaphoneCodes[1]) {
		matchScore += 12
	}
	//compare s secondary with t primary; only give bonus if exact match
	if (sMetaphoneCodes[1] === tMetaphoneCodes[0]) {
		matchScore += 11
	}
	//compare s secondary with s secondary; only give bonus if exact match
	if (sMetaphoneCodes[1] === tMetaphoneCodes[1]) {
		matchScore += 10
	}
	endTime = performance.now()
	dmTime += endTime - startTime

	compareStrings_cache[compareStringsCacheKey] = matchScore
	return matchScore
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
	//If "test" is passed, it finds match for "This is a test" or "This is a test if regex is working" but not "This is a -test+"
	//Positive lookbehind to match group before main expression, main expression, and positive lookahead to match group after main expression
	//Flags: global, case insensitive, and multiline
	const re = new RegExp("(?<=^| )" + s + "(?=$| )", "gmi")
	//match regex against t
	var match = t.match(re);
	//does match exist AND t equals the first value returned in match
	return match && t === match[0];
}

this["syllableCount"] = function(s) {
	//ensure that s is defined and has a length
	if (typeof(s) === 'undefined' || s.length === 0) {
		return 0
	}

	cacheKey = genCacheKey("syllableCount", s)
	if (cacheKey in syllableCount_cache) {
		return syllableCount_cache[cacheKey]
	}

    var someCount = 0;
    if(s.length>3) {
      if(s.substring(0,4)=="SOME") { //accounts for the fact that "somewhere" is two syllables as silent e causes issues
        s = s.replace("SOME","") 
        someCount++
      }
    }
	//remove last character of string if not vowel or L OR remove last two chracters if 'ed' or last character is 'E'
    s = s.replace(/(?:[^LAEIOUY]|ED|[^LAEIOUY]E)$/, '');   
	//remove y if first character of string
    s = s.replace(/^Y/, ''); 
	//remove U's that follow a Q or a vowel pair for acquaintance and beautiful 
	s = s.replace(/(?<=Q)U|(?<=[AEIOUY]{2,2})U/, '');            
    var syl = s.match(/[AEIOUY]{1,2}/g);
    if(syl) {
		finalVal = syl.length + someCount
		syllableCount_cache[cacheKey] = finalVal
        return finalVal;
    } else {
		syllableCount_cache[cacheKey] = 0
		return 0
	}
}

//Function that is a Javascript translation of Miguel Serrano's C-based version and Lars Garshol's Java-based version of the Jaro-Winkler Similarity algorithm to achieve O(len(s)*len(a)) time complexity
//returns a value between 0 and 1 with 0 being no match and 1 being exact match
this["jaroWinklerSimilarity"] = function(s, a, p_val=0.16, min_score=0.7) {
	//return early if either are undefined
	if (typeof(s) === 'undefined' || typeof(a) === 'undefined') {
		return 0.0
	}

	cacheKey = genCacheKey("jaroWinklerSimilarity", s, a, p_val, min_score)
	if (cacheKey in jaroWinklerSimilarity_cache) {
		return jaroWinklerSimilarity_cache[cacheKey]
	}

	sL = s.length
	aL = a.length
	//return early if either of the strings is empty
	if (!(sL) || !(aL)) {
		jaroWinklerSimilarity_cache[cacheKey] = 0
		return 0.0
	}
	//return early if they are an exact match
	if (s === a) {
		jaroWinklerSimilarity_cache[cacheKey] = 1
    	return 1.0;
    }

	//check if min_score is even possible
	min_matches_for_score = Math.ceil((3.0 * min_score * sL * aL - (sL * aL)) / (sL + aL))
	if (min_matches_for_score > aL) {
		jaroWinklerSimilarity_cache[cacheKey] = 0
		return 0.0
	}

	//initialize all of these variables to 0
	//i,j,l are indices
	//m is count of matching characters
	//t is count of transpositions
	i = j = l = m = t = 0
	dw = 0.0
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
					t++ //transposition found
				}
				prevpos = j
				break
			}
		}
  	}

	//return early if no matches were found
	if (!m || m === 0) {
		jaroWinklerSimilarity_cache[cacheKey] = 0
		return 0.0
	}

	//calculate Jaro Distance
	dw = ((m / sL) + (m / aL) + ((m - t) / m)) / 3.0
	
	//only calculate Jaro-Winkler distance if Jaro Similarity is above threshold
	const JD_THRESHOLD = 0.4
	if (dw > JD_THRESHOLD) {
		//calculate common string prefix length
		l = getCommonPrefix(s, a)
		//calculate Jaro-Winkler distance with scaling factor
		dw = dw + (l * p_val * (1 - dw));
	}

	jaroWinklerSimilarity_cache[cacheKey] = dw.toFixed(2)
	return dw.toFixed(2)
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
this["customSqrt"] = function(x) {
	return x ** 0.5;
}

//Function that uses Ka-Weihe Fast Sorensen-Dice Coefficient (SDC) algorithm to quickly calculate value in nearly O(len(s) + len(t)) time complexity
//Returns value in range of [0, 1] with 1 being a perfect match
//This function was copied in rather than being imported from the library due to issues with outdated npm; comments are mine; original at www.npmjs.com/package/fast-dice-coefficient
this["sorensenDiceCoefficient"] = function(s, t, ngram_len=2) {
	//if a variable is undefined, just return 0
	if (typeof(s) === 'undefined' || typeof(t) === 'undefined') {
		return 0;
	}

	cacheKey = genCacheKey("sorensenDiceCoefficient", s, t, ngram_len)
	if (cacheKey in sorensenDiceCoefficient_cache) {
		return sorensenDiceCoefficient_cache[cacheKey]
	}
	
	//define variables
	var i, j, k, map, match, ref, ref1, sub;
	sL = s.length;
	tL = t.length;
	//if either string is too short for a n-gram to be collected, just return 0.11
	if (sL < ngram_len || tL < ngram_len) {
		sorensenDiceCoefficient_cache[cacheKey] = 0.11
		return 0.11;
	}
	//define map after conditional returns to save space and time
	map = new Map;
	//create a map of ngrams (bi-gram = n-gram with length of 2)
	for (i = j = 0, ref = sL - ngram_len; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
		sub = s.substr(i, ngram_len);
		if (map.has(sub)) {
			map.set(sub, map.get(sub) + 1);
		} else {
			map.set(sub, 1);
		}
	}
	//find the number of ngrams in common between the two strings based on set theory
	match = 0;
	for (i = k = 0, ref1 = tL - ngram_len; (0 <= ref1 ? k <= ref1 : k >= ref1); i = 0 <= ref1 ? ++k : --k) {
		sub = t.substr(i, ngram_len);
		if (map.get(sub) > 0) {
			match++;
			map.set(sub, map.get(sub) - 1);
		}
	}
	//divide the number of elements in common by the average size of sets (mostly)
	//multiple by two because otherwise you're only getting a half
	result = 2.0 * match / (sL + tL - 2)
	sorensenDiceCoefficient_cache[cacheKey] = result
	return result;
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
this["euclideanDistance"] = function(a, b, maxDistance=50) {
	if (typeof(a) === 'undefined' || typeof(b) === 'undefined') {
		return maxDistance
	}

	cacheKey = genCacheKey("euclideanDistance", a, b, maxDistance)
	if (cacheKey in euclideanDistance_cache) {
		return euclideanDistance_cache[cacheKey]
	}

	if (a.length === 1 && a.match(/[A-Z]/i) && b.length === 1 && b.match(/[A-Z]/i)) {
		s = (keyboardCartesianCoords[a]['x']-keyboardCartesianCoords[b]['x'])**2
		t = (keyboardCartesianCoords[a]['y']-keyboardCartesianCoords[b]['y'])**2
		result = customSqrt(s+t)
		euclideanDistance_cache[cacheKey] = result
		return result
	} else {
		euclideanDistance_cache[cacheKey] = maxDistance
		return maxDistance
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

	cacheKey = genCacheKey("damerauLevenshteinDistance", s, t, maxDistance)
	if (cacheKey in damerauLevenshteinDistance_cache){
		return damerauLevenshteinDistance_cache[cacheKey]
	}

	//make s shorter than t, even if that means swapping them
	if (s.length > t.length) {
		temp = t;
		t = s;
		s = temp;
	}

    var d = []; //2d matrix

    // Step 1: store string lengths
    var n = s.length;
    var m = t.length;
	//ensure that both strings contain characters based on principles of short-circuit evaluation
    if (n == 0) {
		damerauLevenshteinDistance_cache[cacheKey] = m
		return m
	};
    if (m == 0) {
		damerauLevenshteinDistance_cache[cacheKey] = n
		return n
	};
	//if strings are equal, return 0
	if (s == t) {
		damerauLevenshteinDistance_cache[cacheKey] = 0
		return 0
	};

	//check if either string is prefix of other and return length difference if so
	if (t.indexOf(s) == 0) {
		damerauLevenshteinDistance_cache[cacheKey] = m - n
		return m - n;
	}
	else if (s.indexOf(t) == 0) {
		damerauLevenshteinDistance_cache[cacheKey] = n - m
		return n - m;
	}

    //Create an array of arrays in javascript with note that d is zero-indexed while n is one-indexed
	//A descending loop is quicker
    for (var i = n; i >= 0; i--) d[i] = [];
	
    // Step 2: initialize the table
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = (2*maxDistance); j >= 0; j--) d[0][j] = j;

    // Step 3: populate the rows of the 2d table (row-major order)
	//remember that n and m are one-indexed as lengths
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
		var col_min = maxDistance;
        // Step 4: populate the columns of the 2d table
		//optimize algorithm by ignoring all cells in original matrix where |i-j| > max_distance
		for (var j = customMax(0, i-maxDistance); j <= customMin(m, i+maxDistance); j++) {
            //Check the jagged levenshtein distance total so far to see if the length of n can be returned as the edit distance early
            if (i == j && d[i][j] > maxDistance) {
				damerauLevenshteinDistance_cache[cacheKey] = n
				return n
			};
			var t_j = t.charAt(j - 1);
			//if the two characters are the same, use the jagged distance
			if (s_i === t_j) {
				d[i][j] = d[i][j - 1];
			}
			else {
				// Step 5: store the costs based on distance on QWERTY keyboard
				var subCost = euclideanDistance(s_i, t_j, maxDistance) / 3 //divide by 3 so bring range down to [0,3]; also used for transposition (plus extra penalty) as still related to nearness on keyboard
				var insertCost = 2 //always less than distance between say 'q' and 'p' but still more than the deletion cost
				var deleteCost = 1
				var transCost = 1.5
				

				//Calculate the values for Levenshtein distance
				var mi = d[i - 1][j] + deleteCost; //deletion
				var b = d[i][j - 1] + insertCost; //insertion; slight penalty to insertions so 2 rather than 1
				var c = d[i - 1][j - 1] + subCost; //substitution
				//find the minimum
				if (b < mi) mi = b;
				if (c < mi) mi = c;

				//Damerau transposition check based on optimal string alignment distance (triangle inequality doesn't hold)
				if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
					mi = customMin(mi, d[i - 2][j - 2] + transCost);
				}

				// Step 6: store the minimum
				d[i][j] = mi; 
			}

			col_min = customMin(col_min, d[i][j]);
        }
		//early exit if min. edit distance exceeds the max distance
		if (col_min > maxDistance) {
			damerauLevenshteinDistance_cache[cacheKey] = maxDistance
			return maxDistance;
		}
    }

    // Step 7: return the value in the final cell of the table
	damerauLevenshteinDistance_cache[cacheKey] = d[n][m]
    return d[n][m];
};

//Return modified strings with the common prefixes and suffixes between them removed
this["getCommonPrefix"] = function(first, last) {
	let prefix_len = 0
    for(let i = 0; i < customMin(first.length,last.length); i++){
        if(first[i] != last[i]){
            break
        }
        prefix_len += 1
    }
	return prefix_len
}
this["getCommonSuffix"] = function(first, last) {
	let suffix_len = 0;
    while (suffix_len < customMin(first.length,last.length) && first[first.length - 1 - suffix_len] === last[last.length - 1 - suffix_len]) {
        suffix_len++;
    }
    suffix_len = -1 * suffix_len;
	return suffix_len
}
this["removeCommonPrefixAndSuffix"] = function(first, last) {
	cacheKey = genCacheKey("removeCommonPrefixAndSuffix", first, last)
	if (cacheKey in removeCommonPrefixAndSuffix_cache) {
		return removeCommonPrefixAndSuffix_cache[cacheKey]
	}
	else {
		let prefix_len = getCommonPrefix(first, last)

		let suffix_len = getCommonSuffix(first, last)

		results = [first.slice(prefix_len, suffix_len), last.slice(prefix_len, suffix_len)]
		removeCommonPrefixAndSuffix_cache[cacheKey] = results
		return results
	}
}

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

class SearchInput extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			loading: false, 
			data: CROPS, 
			error: null, 
			searchValue: "", 
			isModalVisible: false,
		}; 
		this.arrayholder = CROPS;
		this.props.resultDisplayMode = "dropdown";
	} 

	searchFunction = (text) => { 
		if (text.length != 0) {
			//clean up the text based on whether or not it is a number
			var cleanedTxt = ""
			var updatedData = []
			let searchStartTime = performance.now()
			//if the first character is a number, assume that the user wants to enter a number
			let firstChar = text.charAt(0)
			if (firstChar <= '9' && firstChar >= '0') {
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
			let searchEndTime = performance.now()
			//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder
			console.log("Preprocessing   : " + preprocessingTime + "ms")
			preprocessingTime = 0
			console.log("Sorensen Dice   : " + sdcTime + "ms")
			sdcTime = 0
			console.log("Check 1st/last  : " + firstLastLetterTime + "ms")
			firstLastLetterTime = 0
			console.log("Length/Syllable : " + lengthSyllableTime + "ms")
			lengthSyllableTime = 0
			console.log("Prefix Match    : " + prefixMatchTime + "ms")
			prefixMatchTime = 0
			console.log("DLEditDistance  : " + dledTime + "ms")
			dledTime = 0
			console.log("JWS algorithm   : " + jwsTime + "ms")
			jwsTime = 0
			console.log("Lemmatizer      : " + lemmatizeTime + "ms")
			lemmatizeTime = 0
			console.log("Double Metaphone: " + dmTime + "ms")
			dmTime = 0
			console.log("Sort Time       : " + (searchEndTime - searchStartTime) + "ms")
			searchStartTime = searchEndTime = 0
			this.setState({ data: updatedData, searchValue: text }); 
		}
		else {
			this.setState({ data: this.arrayholder, searchValue: text });
		}
	}; 

	render() {
		if  (this.props.resultDisplayMode === "modal") {
			const { isModalVisible } = this.state;
			const setIsModalVisible = isModalVisible => this.setState({ isModalVisible });
			return ( 
				<View style={styles.container}> 
					<TouchableOpacity activeOpacity={0.8} onPress={() => setIsModalVisible(true)}>
						<SearchBar 
							placeholder="Search Crops..."
							round 
							editable={false}
							readOnly
							keyboardType='default'
							style={{
								color: 'black',
								fontSize: 14,
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
					<SearchModal modalVisible={isModalVisible} 
                    	onBackPress={() => setIsModalVisible(false)} //disappear if it is clicked outside of the modal
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
							fontSize: 14,
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
		fontSize: 10,
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