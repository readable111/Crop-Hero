/****
 * @author Daniel Moreno
 * @reviewer Daniel Moreno
 * @tester Daniel Moreno
 ***/

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
import {cleanText, cleanNumbers} from './sanitizer.jsx'

var mounted = false

//initialize to a bunch of weird, random values that will make it obvious if it is used
global.dataArray = [ [1, "sub123", "12345", "TX", 1, 2, 2, 1, null, 1212121, "stuff", "random text", "default", "Mon, 18 Nov 2024 00:00:00 GMT", "default", 2, 0, 1, "test", "test", "test", "test"] ]
//create some caches
var compareStrings_cache = {}
var sorensenDiceCoefficient_cache = {}
var removeCommonPrefixAndSuffix_cache = {}
var syllableCount_cache = {}
var damerauLevenshteinDistance_cache = {}
var euclideanDistance_cache = {}
var jaroWinklerSimilarity_cache = {}
var doubleMetaphone_cache = {}
function genCacheKey(funcName, firstArg, ...args) {
	cacheKey = `${funcName}:${firstArg}:`
	for (const arg of args) {
		cacheKey += String(arg)
      	cacheKey += ":"
	}
	return cacheKey;
}



export const SearchModal = ({
    modalVisible,
    onBackPress,
    isLoading = false,
	searchValue,
	originalData,
	isDarkMode = false,
	handlePress = null,
}) => {

	const [searchBarTxt, setSearchBarTxt] = useState(searchValue);

	//create a copy of the array
	global.dataArray = JSON.parse(JSON.stringify(originalData))

	if (!handlePress) {
		return (
			<Modal animationType='fade' visible={modalVisible} transparent={true} onRequestClose={onBackPress}> 
				{/*create the dark grey box around it and ability to close modal by clicking*/}
				<Pressable style={styles.modalContainer} onPress={onBackPress}>
					{isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

					{ !isLoading && (
					<View testID={"modal-view"} style={[styles.modalView, isDarkMode ? {backgroundColor: Colors.BALTIC_SEA} : {backgroundColor: Colors.SANTA_GRAY}]} > 
							{/*Display the search bar which looks identical to the dropdown search bar but works slightly differents*/}
							<SearchBar 
								placeholder="Search Crops..."
								showCancel
								round 
								value={searchBarTxt} 
								onChangeText={(text) => {searchFunction(text, originalData, searchBarTxt); setSearchBarTxt(text)}}  //call the search function and set searchBarTxt to whatever has been entered
								autoCorrect={true} 
								keyboardType='default'
								style={ isDarkMode ? {
									color: Colors.WHITE_SMOKE,
									fontSize: 14,
								} : {
									color: Colors.CHARCOAL,
									fontSize: 14,
								}}
								containerStyle={{
									backgroundColor: 'none',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderRadius: 50,
									marginBottom: 0,
									width: '90%'
								}}
								inputContainerStyle={isDarkMode ? {
									backgroundColor: Colors.IRIDIUM,
									borderRadius: 50,
									marginBottom: 0,
								} : {
									backgroundColor: Colors.WHITE_SMOKE,
									borderRadius: 50,
									marginBottom: 0,
								}}
								placeholderTextColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
							/> 
							{/*Display a list of the 8 best matches*/}
							<View style={[styles.modalListStyle, isDarkMode && styles.modalListStyleDark]}>
								{searchBarTxt && dataArray.slice(0,8).map((item, key) => (
									<Link key={key} href={{ pathname: "/crops/cropspage", params: { param: item } }} push style={[styles.item, isDarkMode && styles.itemDark]}>
										<View style={{flex: 0.8, flexShrink: 1, flexGrow: 1, flexWrap:'wrap', flexDirection: 'row',}}>
											<Text style={{flex: 0.8, flexShrink: 1, flexWrap:'wrap', flexDirection: 'row',}}>Name: {item[10]} | Crop Number: {item["9"]}</Text> 
										</View>
									</Link>
								))}
							</View>
					</View>
					)}
				</Pressable>
			</Modal>
		);
	}
	else {
		return (
			<Modal animationType='fade' visible={modalVisible} transparent={true} onRequestClose={onBackPress}> 
				{/*create the dark grey box around it and ability to close modal by clicking*/}
				<Pressable style={styles.modalContainer} onPress={onBackPress}>
					{isLoading && <ActivityIndicator size={70} color={Colors.MEDIUM_TAUPE} />}

					{ !isLoading && (
					<View style={[styles.modalView, isDarkMode ? {backgroundColor: Colors.BALTIC_SEA} : {backgroundColor: Colors.SANTA_GRAY}]} > 
							{/*Display the search bar which looks identical to the dropdown search bar but works slightly differents*/}
							<SearchBar 
								placeholder="Search Crops..."
								showCancel
								round 
								value={searchBarTxt} 
								onChangeText={(text) => {searchFunction(text, originalData, searchBarTxt); setSearchBarTxt(text)}}  //call the search function and set searchBarTxt to whatever has been entered
								autoCorrect={true} 
								keyboardType='default'
								style={ isDarkMode ? {
									color: Colors.WHITE_SMOKE,
									fontSize: 14,
								} : {
									color: Colors.CHARCOAL,
									fontSize: 14,
								}}
								containerStyle={{
									backgroundColor: 'none',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderRadius: 50,
									marginBottom: 0,
									width: '90%'
								}}
								inputContainerStyle={isDarkMode ? {
									backgroundColor: Colors.IRIDIUM,
									borderRadius: 50,
									marginBottom: 0,
								} : {
									backgroundColor: Colors.WHITE_SMOKE,
									borderRadius: 50,
									marginBottom: 0,
								}}
								placeholderTextColor={isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
							/> 
							{/*Display a list of the 8 best matches*/}
							<View style={[styles.modalListStyle, isDarkMode && styles.modalListStyleDark]}>
								{searchBarTxt && dataArray.slice(0,8).map((crop, key) => (
									<Pressable key={key} style={[styles.item, isDarkMode && styles.itemDark]} onPress={()=>{handlePress(crop); setSearchBarTxt(""); onBackPress()}}>
										<View style={{flex: 0.8, flexShrink: 1, flexGrow: 1, flexWrap:'wrap', flexDirection: 'row',}}>
											<Text style={{flex: 0.8, flexShrink: 1, flexWrap:'wrap', flexDirection: 'row',}}>Name: {crop[10]} | Crop Number: {crop["9"]}</Text> 
										</View>
									</Pressable>
								))}
							</View>
					</View>
					)}
				</Pressable>
			</Modal>
		);
	}
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
export const searchFunction = (text, arr, searchBarTxt) => { 
	//clean up the text based on whether or not it is a number
	var cleanedTxt = ""
	var updatedData = []
	if (isNumeric(text)) {
		cleanedTxt = cleanNumbers(text, decimalsAllowed=false, negativesAllowed=false)
		if (cleanedTxt === cleanNumbers(searchBarTxt, noStopwords=true, noSQL=true, textOnly=true)) {
			return
		}
		//sort array in descending order (find highest value)
		quickselect(arr, 8, arr.length, function(a,b){ 
			difference = compareStrings(b.hrfNum, cleanedTxt) - compareStrings(a.hrfNum,cleanedTxt)
			if (difference > 0) {
				return 1
			}
			if (difference < 0) {
				return -1
			}
			return 0
		})
		updatedData = arr.slice(0,8)
		
	} else {
		cleanedTxt = cleanText(text, noStopwords=true, noSQL=true)
		if (cleanedTxt === cleanText(searchBarTxt, noStopwords=true, noSQL=true)) {
			return
		}
		quickselect(arr, 8, arr.length, function(a,b){ 
			difference = compareStrings(b.name, cleanedTxt) - compareStrings(a.name,cleanedTxt)
			if (difference > 0) {
				return 1
			}
			if (difference < 0) {
				return -1
			}
			return 0
		})
		updatedData = arr.slice(0,8)
	}
	//TODO: make FULLTEXT SELECT search of database using cleaned text and store results in arrayholder
	//quickselect function doesn't sort the 3 best matches so this bit will without performance hits since it's only 3 items
	updatedData.sort(function(a,b){ 
		return compareStrings(b["9"],cleanedTxt) - compareStrings(a["9"],cleanedTxt); 
	});
	dataArray = updatedData
}; 

//functions to support the custom sort algorithm
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

//new custom sort algorithm which is extremely fast and works in every situation except this one for now because of an issue with how it interacts with the custom comparator
/**
 * Rearranges items so that all items in the [left, k] are the smallest.
 * The k-th element will have the (k - left + 1)-th smallest value in [left, right].
 */
function quickselect(arr, k, right = arr.length, compare = defaultCompare) {
    let left = 0
    let i = 0
    right = right - 1
    let rr = right
    let ll = left
  
    while (right > left) {
        if (compare(arr[k], arr[left]) < 0) {
          swap(arr, left, k)
        }
        if (compare(arr[right], arr[left]) < 0) {
          swap(arr, left, right)
        }
        if (compare(arr[right], arr[left]) < 0) {
          swap(arr, k, right)
        }
      
        /* Preserved as necessary for certain optimizations beyond my ability
	if (right - left > k) {
            const n = right - left + 1;
            i = k - left + 1;
            const s = (2 * n / 3);
            const sd = (n * s * (n - s) / n) * (i - n / 2 < 0 ? -1 : 1);
            // Biased slightly so that the (k - left + 1)-th element is expected to lie in the smallest set after partitioning
            ll = Math.max(left, k - i * s / n + sd);
            rr = Math.min(right, k + (n - i) * s / n + sd);
        }*/

        //partition elements from arr[left : right] around t (which is set to the kth element)
        //basically a faster version of traditional partition function or subscript range fetching as subscript range checking on i and j has been removed
        const t = arr[k];
        i = left;
        let j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) {
            swap(arr, right, left)
        }

        //Move up left pointer and down right pointer
        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) {
                i++
            }
            while (compare(arr[j], t) > 0) {
                j--
            }
        }

        if (compare(arr[left], t) === 0) {
            swap(arr, left, j)
        }
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) {
            left = j + 1
        };
        if (k <= j) {
            right = j - 1
        };
    }
}

//Function that takes two strings and outputs value reflecting similarity; High score = good
export function compareStrings(s, t) {
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
		compareStrings_cache[compareStringsCacheKey] = 5000
		return 5000
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
		matchScore += 90
	}
	//give a small bonus score if last letters match as still less likely to be wrong
	if (sUpper.charAt(sL - 1) === tUpper.charAt(tL - 1)) {
		matchScore += 25
	}
	//check the first letter after each space for both words by getting all of them, merging them into one string, and sending them through SDC as they are less likely to be wrong
	if (sUpper.indexOf(' ') >= 0 && tUpper.indexOf(' ') >= 0) {
		matchScore += 75 //if both have spaces, provide a bonus
		let sAcronym = sUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
		let tAcronym = tUpper.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
		matchScore += customRound(25 * sorensenDiceCoefficient(sAcronym,tAcronym)) //multiply by X to determine score so diminishing bonus with increasing distance, approaching 0
	}
	else if ((sUpper.indexOf(' ') >= 0 && tUpper.indexOf(' ') < 0) || (sUpper.indexOf(' ') < 0 && tUpper.indexOf(' ') >= 0)) {
		matchScore -= 500 //if only one has a space, apply a penalty
	}
	endTime = performance.now()
	firstLastLetterTime += endTime - startTime

	//remove any common prefix & suffix, providing a bonus the larger that the difference is from the original
	startTime = performance.now()
	corrected_strings = removeCommonPrefixAndSuffix(sUpper, tUpper)
	sShortened = corrected_strings[0]
	tShortened = corrected_strings[1]
	//Example: 3 chars removed from both so boost score by 30+30=60 total
	if (sShortened.length > 0) {
		matchScore += ((sL - sShortened.length)*10)
	}
	if (tShortened.length > 0) {
		matchScore += ((tL - tShortened.length)*10)
	}
	endTime = performance.now()
	prefixMatchTime += endTime - startTime

	//get the SDC value and multiply by 100 to get score and round to nearest whole number to eliminate decimals; high number is good
	startTime = performance.now()
	matchScore += customRound(sorensenDiceCoefficient(sUpper,tUpper) * 200)	
	if (matchScore < 40) {
		compareStrings_cache[compareStringsCacheKey] = matchScore
		return matchScore
	}
	endTime = performance.now()
	sdcTime += endTime - startTime

	//give penalty if different length
	startTime = performance.now()
	if (sL !== tL) {
		matchScore -= (customAbs(sL - tL) * 10)
	}
	//give bonus if same number of syllables
	if (syllableCount(sUpper) === syllableCount(tUpper)) {
		matchScore += 25
	}
	endTime = performance.now()
	lengthSyllableTime += endTime - startTime

	//apply penalty to score equal to the DLED value times a constant
	//uses the shortened versions of the strings to cut down on string size
	startTime = performance.now()
	matchScore -= (damerauLevenshteinDistance(sShortened,tShortened, 5) * 20)
	if (matchScore < 40) {
		compareStrings_cache[compareStringsCacheKey] = matchScore
		return matchScore
	}
	endTime = performance.now()
	dledTime += endTime - startTime

	//apply bonus from Jaro-Winkler Similarity which counts transpositions and matching characters with scaling bonus for prefix match
	startTime = performance.now()
	jws = jaroWinklerSimilarity(sUpper, tUpper)
	matchScore += (jws * 65)
	if (matchScore < 80) {
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
		matchScore += 45
	}
	//compare s primary with t secondary; only give bonus if exact match
	if (sMetaphoneCodes[0] === tMetaphoneCodes[1]) {
		matchScore += 30
	}
	//compare s secondary with t primary; only give bonus if exact match
	if (sMetaphoneCodes[1] === tMetaphoneCodes[0]) {
		matchScore += 20
	}
	//compare s secondary with s secondary; only give bonus if exact match
	if (sMetaphoneCodes[1] === tMetaphoneCodes[1]) {
		matchScore += 15
	}
	endTime = performance.now()
	dmTime += endTime - startTime

	if(!matchScore) {
		compareStrings_cache[compareStringsCacheKey] = 0
		return 0
	}
	compareStrings_cache[compareStringsCacheKey] = matchScore
	return matchScore
}

function matchExact(s, t) {
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

function syllableCount(s) {
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
function jaroWinklerSimilarity(s, a, p_val=0.16, min_score=0.7) {
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
function customMax(x, y) {
	return x > y ? x : y
}
function customMin(x, y) {
	return x < y ? x : y
}
function customRound(x) {
	return (x + (x>0?0.5:-0.5)) << 0;
}
function customAbs(x) {
	return (x + (x >> 31)) ^ (x >> 31);
}
function customSqrt(x) {
	return x ** 0.5;
}

//Function that uses Ka-Weihe Fast Sorensen-Dice Coefficient (SDC) algorithm to quickly calculate value in nearly O(len(s) + len(t)) time complexity
//Returns value in range of [0, 1] with 1 being a perfect match
//This function was copied in rather than being imported from the library due to issues with outdated npm; comments are mine; original at www.npmjs.com/package/fast-dice-coefficient
function sorensenDiceCoefficient(s, t, ngram_len=2) {
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
	'1': {'y': 0, 'x': 0},
    '2': {'y': 0, 'x': 1},
    '3': {'y': 0, 'x': 2},
    '4': {'y': 0, 'x': 3},
    '5': {'y': 0, 'x': 4},
    '6': {'y': 0, 'x': 5},
    '7': {'y': 0, 'x': 6},
    '8': {'y': 0, 'x': 7},
    '9': {'y': 0, 'x': 8},
    '0': {'y': 0, 'x': 9},
	//0.5 x stagger from previous row
    'Q': {'y': 1, 'x': 0.5},
    'W': {'y': 1, 'x': 1.5},
    'E': {'y': 1, 'x': 2.5},
    'R': {'y': 1, 'x': 3.5},
    'T': {'y': 1, 'x': 4.5},
    'Y': {'y': 1, 'x': 5.5},
    'U': {'y': 1, 'x': 6.5},
    'I': {'y': 1, 'x': 7.5},
    'O': {'y': 1, 'x': 8.5},
    'P': {'y': 1, 'x': 9.5},
	//0.25 x stagger from previous row
    'A': {'y': 2, 'x': 0.75},
    'S': {'y': 2, 'x': 1.75},
    'D': {'y': 2, 'x': 2.75},
    'F': {'y': 2, 'x': 3.75},
    'G': {'y': 2, 'x': 4.75},
    'H': {'y': 2, 'x': 5.75},
    'J': {'y': 2, 'x': 6.75},
    'K': {'y': 2, 'x': 7.75},
    'L': {'y': 2, 'x': 8.75},
	//0.5 x stagger from previous row
    'Z': {'y': 3, 'x': 1.25},
    'X': {'y': 3, 'x': 2.25},
    'C': {'y': 3, 'x': 3.25},
    'V': {'y': 3, 'x': 4.25},
    'B': {'y': 3, 'x': 5.25},
    'N': {'y': 3, 'x': 6.25},
    'M': {'y': 3, 'x': 7.25},
}
//based the keyboardCartesianCoords, it will output a value of 0 or a decimal between 1 and 9 (inclusive)
function euclideanDistance(a, b, maxDistance=50) {
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
function damerauLevenshteinDistance(s, t, maxDistance=50) {
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
				if (!mi) {
					d[i][j] = maxDistance; 
				} else {
					d[i][j] = mi; 
				}
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
function getCommonPrefix(first, last) {
	let prefix_len = 0
    for(let i = 0; i < customMin(first.length,last.length); i++){
        if(first[i] != last[i]){
            break
        }
        prefix_len += 1
    }
	return prefix_len
}
function getCommonSuffix(first, last) {
	let suffix_len = 0;
    while (suffix_len < customMin(first.length,last.length) && first[first.length - 1 - suffix_len] === last[last.length - 1 - suffix_len]) {
        suffix_len++;
    }
    suffix_len = -1 * suffix_len;
	return suffix_len
}
function removeCommonPrefixAndSuffix(first, last) {
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

export class SearchInput extends Component { 
	constructor(props) { 
		super(props); 
		this.state = { 
			loading: false, 
			data: null, 
			error: null, 
			searchValue: "", 
			isModalVisible: false,
			arrayholder: null,
		}; 
		this.props.listOfCrops; //only mandatory prop
		this.props.resultDisplayMode = "dropdown";
		this.props.isDarkMode = false;
		this.props.handlePress = null;
	} 

	//Since the state and componentDidMount functions didn't work at all, I came up with this solution
	//The first time that searchFunction is called, data and arrayholder get initialized to listOfCrops
	initialMounting = () => {
		if (!mounted || this.state.data == null) {
			this.setState({ data: this.props.listOfCrops, arrayholder: this.props.listOfCrops });
			mounted = true
		}
	}

	searchFunction = (text) => { 
		this.initialMounting()
		if (text.length != 0) {
			//clean up the text based on whether or not it is a number
			var cleanedTxt = ""
			var updatedData = []
			let searchStartTime = performance.now()
			//if the first character is a number, assume that the user wants to enter a number
			let firstChar = text.charAt(0)
			if (firstChar <= '9' && firstChar >= '0') {
				cleanStartTime = performance.now()
				cleanedTxt = cleanNumbers(text, decimalsAllowed=false, negativesAllowed=false)
				cleanEndTime = performance.now()
				console.log("Cleaning time   : " + (cleanEndTime - cleanStartTime) + "ms")
				//early return if no change
				if (cleanedTxt === cleanNumbers(this.state.searchValue, noStopwords=true, noSQL=true, textOnly=true)) {
					this.setState({ searchValue: text }); 
					let searchEndTime = performance.now()
					console.log("Sort Time       : " + (searchEndTime - searchStartTime) + "ms")
					searchStartTime = searchEndTime = 0
					return
				}
				//sort array in descending order (find highest value)
				quickselect(this.state.arrayholder, 3, this.state.arrayholder.length, function(a,b){ 
					difference = compareStrings(b["9"], cleanedTxt) - compareStrings(a["9"],cleanedTxt)
					if (difference > 0) {
						return 1
					}
					if (difference < 0) {
						return -1
					}
					return 0
				})
				updatedData = this.state.arrayholder.slice(0,3)
				//quickselect function doesn't sort the 3 best matches so this bit will without performance hits since it's only 3 items
				updatedData.sort(function(a,b){ 
					return compareStrings(b["9"],cleanedTxt) - compareStrings(a["9"],cleanedTxt); 
				});
			} else {
				cleanStartTime = performance.now()
				cleanedTxt = cleanText(text, noStopwords=true, noSQL=true, textOnly=true)
				cleanEndTime = performance.now()
				console.log("Cleaning time   : " + (cleanEndTime - cleanStartTime) + "ms")
				//early return if no change
				if (cleanedTxt === cleanText(this.state.searchValue, noStopwords=true, noSQL=true, textOnly=true)) {
					this.setState({ searchValue: text }); 
					let searchEndTime = performance.now()
					console.log("Sort Time       : " + (searchEndTime - searchStartTime) + "ms")
					searchStartTime = searchEndTime = 0
					return
				}
				//sort array in descending order (find highest value)
				quickselect(this.state.arrayholder, 3, this.state.arrayholder.length, function(a,b){ 
					difference = compareStrings(b[10], cleanedTxt) - compareStrings(a[10],cleanedTxt)
					if (difference > 0) {
						return 1
					}
					if (difference < 0) {
						return -1
					}
					return 0
				})
				updatedData = this.state.arrayholder.slice(0,3)
				//quickselect function doesn't sort the 3 best matches so this bit will without performance hits since it's only 3 items
				updatedData.sort(function(a,b){ 
					return compareStrings(b[10],cleanedTxt) - compareStrings(a[10],cleanedTxt); 
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
			this.setState({ data: this.props.listOfCrops, searchValue: text });
		}
	}; 

	render() {
		if (Array.isArray(this.props.listOfCrops) && this.props.listOfCrops.length === 0) {
			console.log("Passed nothing")
			return (
				<SearchBar 
					placeholder="Search Crops Disabled"
					round 
					editable={false}
					readOnly
					keyboardType='default'
					style={this.props.isDarkMode ? {
						color: Colors.WHITE_SMOKE,
						fontSize: 14,
					} : {
						color: Colors.CHARCOAL,
						fontSize: 14,
					}}
					containerStyle={{
						backgroundColor: 'none',
						borderColor: 'rgba(0, 0, 0, 0)',
						borderRadius: 50,
						marginBottom: 0,
					}}
					inputContainerStyle={this.props.isDarkMode ? {
						backgroundColor: Colors.IRIDIUM,
						borderRadius: 50,
						marginBottom: 0,
					} : {
						backgroundColor: Colors.WHITE_SMOKE,
						borderRadius: 50,
						marginBottom: 0,
					}}
					searchIcon={this.props.isDarkMode ? {
						color: Colors.WHITE_SMOKE
					} : {
						color: Colors.CHARCOAL
					}}
					placeholderTextColor={this.props.isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
				/>
			)
		}
		else {
			if  (this.props.resultDisplayMode === "modal") {
				const { isModalVisible } = this.state;
				const setIsModalVisible = isModalVisible => this.setState({ isModalVisible });
				return ( 
					<View style={styles.container}> 
						<TouchableOpacity testID={"search-modal"} activeOpacity={0.8} onPress={() => setIsModalVisible(true)}>
							<SearchBar 
								placeholder="Search Crops..."
								round 
								editable={false}
								readOnly
								keyboardType='default'
								style={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE,
									fontSize: 14,
								} : {
									color: Colors.CHARCOAL,
									fontSize: 14,
								}}
								containerStyle={{
									backgroundColor: 'none',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderRadius: 50,
									marginBottom: 0,
								}}
								inputContainerStyle={this.props.isDarkMode ? {
									backgroundColor: Colors.IRIDIUM,
									borderRadius: 50,
									marginBottom: 0,
								} : {
									backgroundColor: Colors.WHITE_SMOKE,
									borderRadius: 50,
									marginBottom: 0,
								}}
								searchIcon={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE
								} : {
									color: Colors.CHARCOAL
								}}
								placeholderTextColor={this.props.isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
							/>
						</TouchableOpacity>
						<SearchModal modalVisible={isModalVisible} 
							onBackPress={() => setIsModalVisible(false)} //disappear if user clicks outside of the modal
							searchValue={this.state.searchValue}
							searchFunction={(text) => this.searchFunction(text)}
							originalData={this.state.data}
							isDarkMode={this.props.isDarkMode}
							handlePress={this.props.handlePress}
						/>
					</View> 
				); 
			}
			//if it isn't a modal, assume that the user wants the dropdown format
			else {
				//if onPress is null (default), then use link feature
				if (!this.props.handlePress) {
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
								style={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE,
									fontSize: 14,
								} : {
									color: Colors.CHARCOAL,
									fontSize: 14,
								}}
								containerStyle={{
									backgroundColor: 'none',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderRadius: 50,
									marginBottom: 0,
								}}
								inputContainerStyle={this.props.isDarkMode ? {
									backgroundColor: Colors.IRIDIUM,
									borderRadius: 50,
									marginBottom: 0,
								} : {
									backgroundColor: Colors.WHITE_SMOKE,
									borderRadius: 50,
									marginBottom: 0,
								}}
								searchIcon={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE
								} : {
									color: Colors.CHARCOAL
								}}
								placeholderTextColor={this.props.isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
							/> 
							{/*I use a slice and map function instead of a FlatList so that it will work on pages with ScrollView*/}
							{/*Only possible because I only ever want the top 3 options*/}
							{this.state.searchValue && <View style={[styles.unfoldedlistStyle, this.props.isDarkMode && styles.unfoldedlistStyleDark]}> 
								{this.state.data.slice(0,3).map((item, key) => (
									<Link key={key} href={{ pathname: "/crops/cropspage", params: { param: JSON.stringify(item) } }} push style={[styles.item, this.props.isDarkMode && styles.itemDark]}>
										<View >
											<Text>Name: {item[10]} | Crop Number: {item["9"]}</Text> 
										</View>
									</Link>
								))}
							</View>}
							{!this.state.searchValue && <View style={styles.foldedlistStyle}>
							</View>}
						</View> 
					); 
				}
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
								style={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE,
									fontSize: 14,
								} : {
									color: Colors.CHARCOAL,
									fontSize: 14,
								}}
								containerStyle={{
									backgroundColor: 'none',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderRadius: 50,
									marginBottom: 0,
								}}
								inputContainerStyle={this.props.isDarkMode ? {
									backgroundColor: Colors.IRIDIUM,
									borderRadius: 50,
									marginBottom: 0,
								} : {
									backgroundColor: Colors.WHITE_SMOKE,
									borderRadius: 50,
									marginBottom: 0,
								}}
								searchIcon={this.props.isDarkMode ? {
									color: Colors.WHITE_SMOKE
								} : {
									color: Colors.CHARCOAL
								}}
								placeholderTextColor={this.props.isDarkMode ? Colors.WHITE_SMOKE : Colors.CHARCOAL}
							/> 
							{/*I use a slice and map function instead of a FlatList so that it will work on pages with ScrollView*/}
							{/*Only possible because I only ever want the top 3 options*/}
							{this.state.searchValue && <View style={[styles.unfoldedlistStyle, this.props.isDarkMode && styles.unfoldedlistStyleDark]}> 
								{this.state.data.slice(0,3).map((crop, key) => (
									<Pressable key={key} style={[styles.item, this.props.isDarkMode && styles.itemDark]} onPress={()=>{this.props.handlePress(crop); this.setState({ searchValue: "" })}}>
										<View >
											<Text>Name: {crop[10]} | Crop Number: {crop["9"]}</Text> 
										</View>
									</Pressable>
								))}
							</View>}
							{!this.state.searchValue && <View style={styles.foldedlistStyle}>
							</View>}
						</View> 
					); 
				}
			}
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
		flexWrap: 'wrap',
		flexShrink: 1,
		flexGrow: 1,
		flex: 1,
		width: 'auto',
		height: 'auto',
	}, 
	itemDark: { 
		backgroundColor: Colors.LICHEN, 
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
	unfoldedlistStyleDark: {
		backgroundColor: Colors.CHARCOAL,
		borderColor: Colors.LICHEN,
	},
	modalListStyle: {
		backgroundColor: Colors.ALMOND_TAN,
		marginTop: 0,
		position: 'absolute',
		top: 90,
		alignSelf: 'center',
		width: '86%',
	},
	modalListStyleDark: {
		backgroundColor: Colors.CHARCOAL,
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
