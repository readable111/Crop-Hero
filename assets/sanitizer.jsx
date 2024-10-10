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
        whitelistVal = whitelistVal.replace(/[^a-z1-9 ]/g, "");
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