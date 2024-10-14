import unidecode from 'unidecode';


//list of stopwords for InnoDB with space following it to ensure it only hits words
const STOP_WORDS = ['a', 'about', 'an', 'are', 'as', 'at', 'be', 'by', 'com', 'de', 'en', 'for', 'from', 'how', 'i', 'in', 'is', 'it', 'la', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 'was', 'what', 'when', 'where', 'who', 'will', 'with', 'und', 'the', 'www']
const SQL_KEYWORDS = ['select', 'or', 'and', 'not', 'alter', 'delete', 'drop', 'table', 'from', 'where', 'union', 'column', 'row']



export function cleanText(textToClean, noStopwords=false, noSQL=false, textOnly=false) {
    //make everything lowercase after converting to ascii
    asciiVal = unidecode(textToClean)
    lowerVal = asciiVal.toLowerCase() 
    whitelistVal = lowerVal.replace(/[^a-z1-9'. ]/g, "");

    if (noStopwords) {
        whitelistVal = whitelistVal.replace(/[^a-z1-9'. ]/g, "");
        //remove stopwords and words that are too short
        //precompile regex to save time
        let stopWordRegex = new RegExp(`\\b(${STOP_WORDS.join('|')})\\b`, 'gi')
        //InnoDB also has issues with words <=2 characters long
        let shortWordRegex = new RegExp("\\b[a-z]{1,2}\\b\\s*","gi")
        let previousVal = ""
        //loop until no more changes are applied
        while (whitelistVal !== previousVal) {
            previousVal = whitelistVal;
            whitelistVal = whitelistVal.replace(stopWordRegex, '').replace(/\s+/g, ' ').trim();
            whitelistVal = whitelistVal.replace(shortWordRegex, "");
        }
    }
    
    if (noSQL) {
        whitelistVal = whitelistVal.replace(/[^a-z1-9 ]/g, "");
        //precompile regex to save time
        let sqlRegex = new RegExp(`(${SQL_KEYWORDS.join('|')})`, 'gi');
        let previousVal = ""
        //loop until no more changes are applied
        while (whitelistVal !== previousVal) {
            previousVal = whitelistVal;
            whitelistVal = whitelistVal.replace(sqlRegex, '').trim();
        }
    }

    if (textOnly) {
        whitelistVal = lowerVal.replace(/[^a-z'. ]/g, "");
    }
    
	return whitelistVal
}

export function cleanNumbers(inputNumber, decimalsAllowed=true, negativesAllowed=true) {
    let newVal = inputNumber
    if (decimalsAllowed) {
      newVal = newVal.replace(/[^0-9.-]/g, "")
      newVal = newVal.replace(/(?<!\d)\.|(?<=\d)\.(?!\d)/g, "") //remove all periods not between two numbers
    } else {
      newVal = newVal.replace(/[^0-9-]/g, "") //remove all characters that aren't a number or minus sign
    }
    
    if (negativesAllowed) {
      newVal = newVal.replace(/[^0-9.-]/g, "")
      let previousVal = ""
      //loop until no more changes are applied
      while (newVal !== previousVal) {
          previousVal = newVal;
          newVal = newVal.replace(/(?<=\d)-/g, "") 
      }
      previousVal = ""
      //loop until no more changes are applied
      while (newVal !== previousVal) {
          previousVal = newVal;
          newVal = newVal.replace(/--/g, '').trim(); //remove SQL comments 
      }
    } else {
      newVal = newVal.replace(/[^0-9.]/g, "") //remove all characters that aren't a number or decimal point
    }
    
	  return newVal;
}



/*Example tests
txt = "about an anteater a o'brian -- test"
console.log(cleanText(txt, noStopwords=false))  //about an anteater a o'brian  test
txt = "about an anteater a o'brian -- test"
console.log(cleanText(txt, noStopwords=true))  //anteater obrian test
txt = "ALALTERTER"
console.log(cleanText(txt, noStopwords=true))  //alalterter
txt = "ALALTERTER"
console.log(cleanText(txt, noStopwords=false, noSQL=true))  //[nothing]
txt = "' OR 1=1"
console.log(cleanText(txt, noStopwords=true))  //11
txt = "john@mail' OR '1' = '1"
console.log(cleanText(txt, noStopwords=true))  //johnmail 1 1
txt = "john@mail' OR '1' = '1"
console.log(cleanText(txt, noSQL=true))  //johnmail 1 1
console.log(cleanText(txt, noSQL=true, noStopwords=true))  //johnmail  1  1
*/

/*Example Number tests
test = "056834"
console.log(cleanNumbers(test))  //056834
test = "abcd056834abcd"
console.log(cleanNumbers(test))  //056834
test = "56.834"
console.log(cleanNumbers(test))  //56.834
test = "56.834"
console.log(cleanNumbers(test, decimalsAllowed=false))  //56834
test = "56."
console.log(cleanNumbers(test))  //56
test = ".834"
console.log(cleanNumbers(test))  //834
test = "-56834"
console.log(cleanNumbers(test))  //-56834
test = "--56834"
console.log(cleanNumbers(test))  //56834
test = "---56834"
console.log(cleanNumbers(test))  //-56834
test = "5------68--34"
console.log(cleanNumbers(test))  //56834
test = "568---34"
console.log(cleanNumbers(test))  //56834
test = "-568---34"
console.log(cleanNumbers(test))  //-56834
test = "-568--34"
console.log(cleanNumbers(test, decimalsAllowed=true, negativesAllowed=false))  //56834
*/