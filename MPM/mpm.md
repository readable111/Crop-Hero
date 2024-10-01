# Project 1-1: CropAlly Maintenance Procedures Manual (MPM)

![Smaller Project Logo](./images/152x152.png "Concept by McKenna & Daniel, Layout and Colors by Daniel, Actual Art by Analisa Moreno")

#### Group 7
#### Authors
 - McKenna Beard
 - Isaac Boodt
 - Tyler Bowen
 - Matthew Bustamente
 - Chandler Garrett
 - Daniel Moreno 

#### Class Details
 - Class Sections
    - CSCE 4901/4905.501: Combined Software Development & IT Capstone I 
    - CSCE 4902/4925.501: Combined Software Development & IT Capstone II
 - Professor: Diana Rabah
 - Start Date: 22 Jan. 2024
 - Projected Finish Date: 13 Dec. 2024



## Table of Contents
1. [Introduction](#intro)
    1. [Purpose of Project](#project_purpose)
    1. [Purpose of MPM & Document Conventions](#mpm_purpose)
    1. [Client Overview & Intended Audience](#audience)
1. [In-Depth System Overview](#indepth_overview)
    1. [Home Page](#indepth_home)
        1. [General Weather Forecast](#weather_forecast)
    1. [Notebook Page](#notebook_page)
        1. [Background](#notebook_background)
    1. [To-Do Page](#todo_page)
        1. [Background](#todo_background)
    1. [Components & Assets](#components_n_assets)
        1. [Rows & Columns](#grid)
        1. [AppButton Component](#appbutton)
    1. [Search Bar](#search_bar)
        1. [Background](#search_bar_bkgd)
        1. [Search Bar Component](#search_bar_component)
        1. [Search Function](#search_func)
        1. [Initial String Comparison](#str_comparison)
        1. [Testing the Search Function With Mock Data](#init_search_testing)
        1. [A New String Comparison Function](#new_str_comparison)
        1. [Initial Optimizations](#init_optimizations)
        1. [Sørensen-Dice Coefficient (SDC)](#sdc)
        1. [Damerau-Levenshtein Edit Distance (DLED)](#dled)
        1. [Jaro-Winkler Similarity (JWS)](#jws)
        1. [Transliteration Library](#transliteration)
        1. [Lemmatizer](#lemmatizer)
        1. [Double Metaphone](#double_metaphone)
        1. [Exact String Matching](#exact_str)
        1. [First and Last Letter Section](#1st_last_letter)
        1. [Syllable Counting](#syllables)
        1. [Common Prefix and Suffix](#common_prefix_suffix)
    1. [Backend Services](#backend_overview) 
        1. [Database](#database_overview)
        1. [Backend Server](#backend_overview)
        1. [Writing Endpoints](#writing_endpoints)
        1. [Pushing to the GitHub](#push_to_github_backend)
1. [Installation & Setup](#setup)
    1. [Package Management](#pkg_mgmt)
        1. [Importing Libraries](#import_libs)
    1. [Running The Program](#run_program)
        1. [Starting Expo Go](#start_expo)
        1. [Starting The Test Suite](#start_tests)
1. [Maintenance Tasks](#maint)
    1. [Adding a New Page](#add_page)
        1. [Adding Dark Mode](#add_dark_mode)
        1. [Expanding the Navbar](#expand_navbar)
        1. [Importing the Search Bar](#import_search)
1. [Troubleshooting](#trblsht)
    1. [Emulator Errors](#emulator_errors)
        1. [Cannot Open Emulator](#cant_open_em)
        1. [Emulator Says "The system UI isn't responding"](#ui_not_responding)
        1. [Emulator Says "Something went wrong. Can't connect to Internet."](#no_internet)
        1. [Emulator Reloads When I Try to Type 'R' Into an Input Field](#reloads_on_r)
    1. [Expo Errors](#expo_errors)
        1. [Expo-CLI is Deprecated / Legacy Expo-CLI](#cli_deprecated)
    1. [Common React Native Compilation Errors](#rn_compilation_err)
        1. [Error due to Different Number of Hooks Between Renders](#different_number_hooks)
    1. [Jest Errors](#jest_errors)
        1. [General Troubleshooting Advice For Jest](#general_ts_advice)
        1. [No Tests Found](#no_tests)
        1. [Cannot Use Import Statement Outside a Module ](#cant_use_import)
        1. [Unexpected Token](#unexpected_token)
        1. [Unable to Find an Element](#unable_find_element)
        1. [Snap File is Mostly Empty](#empty_snap_file)
        1. [Expected String or Class/Function But Got Undefined](#undefined_not_string_class)
        1. [Error About Act Wrapping](#act_wrapping)
1. [Tools & Resources](#tools)
1. [Appendices](#appendices)
    1. [Appendix A: Understanding React Native](#react_native)
        1. [File Types](#file_types)
        1. [Class Vs. Functional Components](#component_types)
        1. [Import Types](#import_types)
        1. [Inter-Page Routing](#routing)
    1. [Appendix B: Glossary](#b_glossary)

## Introduction <a name="intro"></a>
### Purpose of Project <a name="project_purpose"></a>
*Author: Daniel, Tyler*

The purpose of CropHero is to provide an accessible, easy-to-use mobile app for small-scale and hobbyist farmers. They should be able to record, track, and visualize crop data including days since planting, height, and other helpful information for growing crops and caring for livestock. The product will also act to aggregate data within the community for better yields and collaboration. 
### Purpose of MPM & Document Conventions  <a name="mpm_purpose"></a>
*Author: Daniel*

The Maintenance Procedures Manual is a formal document that establishes the general structure of the CropAlly application and general procedures to support it in the future. While conciseness is a consideration, rigor and detail is this document’s priority. By doing so, future maintainers and developers can achieve an exhaustive understanding of the CropAlly application. This helps ensure effective support without time wasted as they try to understand their predecessors' efforts. 

It is recommended that developers and maintainers expand the MPM while contributing to the code. This helps to ensure that the MPM is thorough and contains all relevant information. In addition, this can be considered an extension of rubber duck debugging. By explaining the logic behind your code as you write it, you should be able to identify potential problems. 

Each chapter in the document will be marked by a high-level header which will be Level 2. Section headers will be marked by a Level 3 header. Each subsequent header will be marked by a higher level header. Only the top three headers will be included in the table of contents: the chapter, section, and subsection headers. Authorship notes will be put in italics and placed immediately after the header.
### Client Overview & Intended Audience <a name="audience"></a>
*Author: Daniel*

The client is Zina Townley, a current product owner and release train engineer at L3Harris Technologies. Also, she is a former Scrum master, application support manager, IT manager, and programmer analyst. She and her husband created the Ashby-Browning Family Scholarship in Engineering at UNT. Importantly for this application, she is a hobbyist farmer who owns 11 acres. This marks her as a Lifestyle user according to our user class definitions. 

This maintenance manual is meant to help the client and any future developers on this project. The MPM will help the developers to understand the project's structure as they are onboarded. In addition, the MPM will provide details regarding any maintenance tasks, troubleshooting tips, and useful resources for those developers.

## In-Depth System Overview <a name="indepth_overview"></a>
### Home Page <a name="indepth_home"></a>
#### General Weather Forecast <a name="weather_forecast"></a>
*Author: Daniel*

At the top of the Home page is a bar with 7 icons on it and an abbreviated day of the week underneath each icon. Within the page’s functional component is a useEffect hook, the hook that allows for asynchronous requests. First, I call a getGridpoints function which converts a zipcode into gridpoints that can be understood by the National Weather Service’s API. This function checks the passed zipcode against a dictionary that I created. I found the USPS zipcode database and then used a Python script to create a dictionary of lat-long coordinates with the zipcodes functioning as keys. The lat-long coordinates are sent to the NWS API to receive the gridpoints. 

Afterwards, I pass the gridpoints to the NWS API and fetch the weather forecast based on that. If the first forecast date is labelled as This Afternoon, then I store the forecast information for today and the next 6 days in 7 state variables. If the first forecast date is labelled as Tonight, I store the forecast information for 7 days, starting with the next day. Since this is a farming app, this process will always ignore night-time forecasts. 

At render, the forecast information and day name are passed to 7 WeatherIcon components. The forecast information gets passed to a function in WeatherTypes.jsx. The function takes the shortened forecast, gets rid of anything after the “then” as that is in the future, and evaluates the text. Unfortunately, the NWS API has never established a standardized list of potential values, much to the annoyance of a lot of people. As such, substantial research was done by Group 7 to determine the general terms that they use and to condense them down into 10 categories: Clear (0-10% cloud coverage), a Few Clouds (10-30% cloud coverage), Partly Cloudy (30-60% cloud coverage), Mostly Cloudy (60-90% cloud coverage), Overcast (90-100% cloud coverage), Rainy, Stormy, Snowy (includes sleet and hail), Misty (includes drizzling and foggy), and Dusty. The terms are combined into enumerations that are treated as regex to evaluate the forecast. This passes the image’s URI from the Icons constant list. Additional details are added to the evaluated result if the forecast includes the terms Slight Chance (0-30% chance), Chance (30-60% chance), or Likely (60-80%). Slight Chance is given an opacity of 0.4 and Chance is given an opacity of 0.7. If any of the chance indicators are found, a black/white percent sign (based on dark mode setting) is added to the forecast icon, and styling is used to ensure that it overlaps with the forecast icon. 

### Notebook Page <a name="notebook_page"></a>
#### Background <a name="notebook_background"></a>
*Author: McKenna*

The intended purpose of the notebook page is for the user to be able to document daily proceedings as to what has been happening that day on the farm. The user will add in entries via a pop-up modal and will be able to sort entries by month and year. 

### To-Do Page <a name="todo_page"></a>
#### Background <a name="todo_background"></a>
*Author: McKenna* 

### Components & Assets <a name="components_n_assets"></a>
#### Rows & Columns <a name="grid"></a>
*Author: Daniel*

The rows and columns defined in the Grid.jsx file are special assets created to improve the dynamic rendering of pages for multiple screen sizes. To use it, you will need to import it using `import { Col, Row } from '../assets/Grid.jsx'`. When you first open the file, you will probably notice that there is a functional component named Column and a constant called Col, the same word that you would import. Since multiple tags were being exported, the default exports technique could not be used, resulting in the multiple names within the Grid.jsx file (Column vs. Col). 

Starting with the Row tag, it can take three props with height being the most important and the only mandatory one. Then, the Row tag wraps all of its contents and children in a special View tag. The View tag has an array of styles with the later styles being able to overwrite the earlier ones. The styles just set up the flexDirection (necessary for it to work), then whatever style was passed as a prop, and finally the height. The height thing works because it will include the value of the prop in the height style value if the height prop contains a value. Look at [this page on conditional rendering](https://legacy.reactjs.org/docs/conditional-rendering.html) for more on that. 

The columns do something similar but use trick favored by this file’s author to dynamically specify a style based on the prop. The special quote character (ASCII 96 or `) ensures that the variables are expanded out before being stored as a string to specify which style should be applied. 

All columns must be placed into a row. All rows must be placed in a grid container which has a style attribute of flex. The value for flex must be the largest sum of all values passed to the `relativeColsCovered` by all of the columns in each row. So long as the sum of all values in a row are less than or equal to the flex value, each column will be given a width based on the percentage of screen that they are given in the `relativeColsCovered` prop. If 3 columns are all given a `relativeColsCovered` value of 1 or all given a 3, each column would take up 33% of the screen’s width. If all but one of the three columns had a value of 1 and the last column had a value of 5, then the earlier columns would take up 14% of the screen, and the last column would take up 71% of the screen. Since Group 7 was most familiar with Bootstrap, most implementations of the Rows and Cols will have a flex value of 12. 

#### AppButton Component <a name="appbutton"></a>
*Author: Daniel*

The AppButton component was created to provide a standardized button component for multiple pages that incorporated both text and icons from several possible libraries. An onPress event can be passed to the button as a prop, along with an opacity prop which affects the button's opacity when selected. The specifiedStyle and backgroundColor props affect the button's appearance with the backgroundColor prop creating a colored container around everything else rather than stylizing the text's style.

Use the icon prop if you want to specify an image in the Icons folder. Use the mci prop if you want to specify an icon from MaterialCommunityIcons. Use the ad prop if you want to specify an icon from AntDesign. You can use [this website](https://icons.expo.fyi/Index) to find the icon strings for MaterialCommunityIcons and AntDesign. Use the associated size and color props to specify the pixel size and color code of the icon.

### Search Bar <a name="search_bar"></a>
#### Background <a name="search_bar_bkgd"></a>
*Author: Daniel*

In several places throughout the app, a search bar is necessary. A user should be able to search for a specific crop by its name or HRFNum. The user will be typing on a mobile keyboard, possibly while wearing gloves. As such, the search bar needs to provide error correction or possible matches for the user's input. This is where fuzzy searching comes into the equation. Fuzzy searching is the usage of one or more algorithms to find strings in the database and suggest it to the user, boosting the relevance of search options. For most cases, substring matches are sufficient which just checks whether the input is present within any database strings. However, this does not allow for error correction, a necessity for this use case. Many companies prefer machine learning approaches because pre-existing solutions can be quickly bought and used. Since this is school assignment, a custom algorithm is necessary, and machine learning is too complex for this situation. Another approach to fuzzy searching is synonym, grammar, and dictionary-based approaches, but those do not work well when searching numbers and names. As such, this left partial word matching, edit distances, similarity coefficients or indices, and n-gram matching. 

The idea of placing the Search Bar section under the Components and Assets section was considered. However, it was decided to make the Search Bar portion into a separate section due to its length and complexity. 

#### Search Bar Component <a name="search_bar_component"></a>
*Author: Daniel*

Before I can discuss how I wrote the search code, I need to briefly cover how React Native works and how I created the search bar component. Technically, React Native is an open-source, client-side UI framework for TypeScript that can be translated into code which works on most mobile devices. Basically, React Native allows you to combine HTML-like tags or components, CSS-like styling, and JavaScript-like functionality. If you want, you can create custom components with either arrow functions or classes that extend React.Component. Each component has props or properties which can be edited like an HTML attribute. 

In accordance with object-oriented principles, I wanted to create a separate component for the search bar that other group members could import. Depending on their page, they either needed the search results to display in a dropdown below the search bar or on a separate page. I chose to implement the separate page option as a modal that opens and covers the view. However, I will leave that discussion here as it is not the primary focus of this post. Also, some pages use ScrollView which prevented me from using the premade solutions for display, like FlatList. I ended up using the .slice() function instead. Also, I initially planned to use the onPress prop but that overrode a pre-existing prop, causing a variety of annoying bugs. A custom handlePress prop was much easier.

To use the search bar component, simply enter `<SearchInput resultDisplayMode={"dropdown"}/>` in your code. If you want to use the modal option, pass "modal" to the resultDisplayMode prop. By default, the search bar will reroute the user to the View Crop page for the selected crop. If that is not the desired result, please pass a handlePress prop like `<SearchInput resultDisplayMode={"dropdown"} handlePress={(crop)=>{console.log(crop); setSelectedCrop(crop)}}/>`. In this example, it will log to  console the full crop JSON object and set a state variable called selectedCrop equal to that crop object.

#### Search Function <a name="search_func"></a>
*Author: Daniel*

This was my first version of the searchFunction and is the reason why I needed to use a class component.  

~~~jsx
searchFunction = (text) => {  
  //clean up the text based on whether or not it is a number 
  var cleanedTxt = "" 
  if (isNumeric(text)) { 
    cleanedTxt = text.cleanNumForSearch(); 
  } else { 
    cleanedTxt = text.cleanTextForSearch(); 
  } 
 
  //sort array in ascending order to place the lowest value at the top 
  const updatedData = this.arrayholder.sort(function(a,b){  
    //if number, check against HRFNumber, otherwise look at name 
    if (isNumeric(text)) { 
      //sort the array in ascending order based on the crop's HRFNumber 
      return compareStrings(a.hrfNum,cleanedTxt) - compareStrings(b.hrfNum,cleanedTxt);  
    } else { 
      //sort the array in ascending order based on the crop's name 
      return compareStrings(a.name,cleanedTxt) - compareStrings(b.name,cleanedTxt);  
    } 
  }); 
  this.setState({ data: updatedData, searchValue: text });  
};  
~~~

Looking back, I can see a lot of issues with this function. However, I want to show the progress along the way rather than simply the final product as that will be too confusing and leave out the reason why I arrived at the final version. In this version, the function checks if the text is primarily numeric before cleaning it and determining whether the user wants to look at the HRFNumber or the crop's name. Then, searchFunction uses a custom comparator to sort the array of crops, placing the crop with the lowest value at the top. 

#### Initial String Comparison <a name="str_comparison"></a>
*Author: Daniel*

Let's take a look at the initial version of the compareStrings function.  

~~~jsx
function compareStrings(s, t) { 
  //get the Sørensen-Dice Coefficient value 
  sdc = sorensenDiceCoefficient(s.toUpperCase(),t.toUpperCase()) 
  //if the SDC is high enough, just return that and skip DLED 
  if (sdc >= 0.45) { 
    return 1 
  } 
  //get the Damerau-Levenshtein Edit Distance value 
  dled = damerauLevenshteinDistance(s.toUpperCase(),t.toUpperCase(), 10) + 0.1 //add 0.1 to ensure that it is always going to be bigger than the SDC 
  return dled 
} 
~~~

At these early stages, the Sørensen-Dice Coefficient was being calculated, providing a mathematical value that reflects the string's similarity on an inclusive range between 0 and 1. If the coefficient is high enough indicating a good match, compareStrings just returns a 1. Otherwise, the function will calculate the Damerau-Levenshtein Edit Distance and returns that. My research had led me to [Aaron Hammond's article for August Schools](https://www.augustschools.com/blog/needles-in-a-haystack-dice-and-levenshtein/) which is what inspired this implementation, though as you'll see, I later realized that I had misunderstood the article. My final implementation with weighted fuzzy searching is closer to what he was talking about. 

#### Testing the Search Function With Mock Data <a name="init_search_testing"></a>
*Author: Daniel*

Initially, I was using a JSON file with 8 entries. My first version of compareStrings managed 100% accuracy for this small sample, but I decided that it was insufficiently representative of the final product. Earlier in the semester, a different professor mentioned that he used Go or Python to quickly generate test cases. 

Based on that, I decided to create my own test cases. First, I found a list of crops grown in Texas on the Department of Agriculture's website. Then, I created a basic Python program to generate JSON entries for each crop and export them to a usable file. Afterwards, I set up some code to randomly assign plausible values for the other fields. Also, I used a function that creates the plural form of a word as the database could have "Blackberry" and "Blackberries". I would like to credit it, but I found the function years ago and have been using it for some time. The pluralizer may not be perfect, but it has always met my needs. 

Since this semester kept me very busy and the program didn't need to be perfect, I just threw it together in about 30 minutes. As an example it has been included here. 

~~~python
import json 
import random 
from datetime import datetime, timedelta 
from re import search, sub 
from types import SimpleNamespace 
 
# Read input file of crop names 
with open('croplist.txt', 'r') as f: 
    lines = f.readlines() 
 
# Initialize crops list 
CROPS = [] 
 
# Function to generate random date between 2015 and 2025 
def random_date(): 
    start_date = datetime(2015, 1, 1) 
    end_date = datetime(2025, 12, 31) 
    days = (end_date - start_date).days 
    random_days = random.randint(0, days) 
    #properly format it into 08/22/2024 or MM/DD/YYYY 
    return (start_date + timedelta(days=random_days)).strftime('%m/%d/%Y') 
 
# Function to pluralize a word 
def pluralize(word): 
    # store some common words that don't change or change in a unique way 
    IRREGULARS = { 
        "child": "children", 
        "foot": "feet", 
        "goose": "geese", 
        "man": "men", 
        "louse": "lice", 
        "mouse": "mice", 
        "die": "dice", 
        "ox": "oxen", 
        "person": "people", 
        "tooth": "teeth", 
        "woman": "women", 
    } 
    SAME_FORM = [ 
        "bison", 
        "buffalo", 
        "deer", 
        "fish", 
        "moose", 
        "pike", 
        "plankton", 
        "salmon", 
        "shrimp", 
        "sheep", 
        "swine", 
        "trout", 
        "tuna", 
    ] 
    # store the common endings for plural worlds 
    ENDINGS = SimpleNamespace( 
        **{ 
            "DEFAULT": "s", 
            "SPECIAL": "es", 
            "SUPERSPECIAL": "i", 
        } 
    ) 
    #store example words for: 
    #words that end in 'o' and must be pluralized to 'oes' 
    ES_OS = ["potato", "tomato", "hero", "echo", "torpedo", "veto"] 
    #words that end in 'f' and must be pluralized to 'ves' 
    F_V_WORDS = ["wolf", "elf", "loaf", "thief", "leaf", "knife", "life", "wife", "calf"] 
    #words that end in 'z' and must be pluralized to 'zes' 
    L_REPEATERS = ["buzz", "fizz", "fuzz", "jazz", "quiz"] 
 
    #make the word lowercase to prevent issues 
    word = word.lower() 
 
    #check for special case words defined above 
    if word in IRREGULARS: 
        return IRREGULARS[word] 
 
    if word in SAME_FORM: 
        return word 
 
    # Some words repeat the last letter in their plural form 
    if word in L_REPEATERS: 
        word += word[-1] 
 
    # Words ending in us -> change us to i 
    if search(r"us$", word): 
        return word[:-2] + ENDINGS.SUPERSPECIAL 
 
    # Words ending in is -> change is to es 
    if search(r"is$", word): 
        return word[:-2] + ENDINGS.SPECIAL 
 
    # Words ending in x, s, z, ch, sh -> add es 
    if search(r"[xsxz]$", word) or search(r"[cs]h$", word): 
        return word + ENDINGS.SPECIAL 
 
    # Words ending in y with a consonant before it -> change y to i and add es 
    if search(r"[^aeiou]y$", word): 
        return word[:-1] + "i" + ENDINGS.SPECIAL 
 
    # Words ending in y with a vowel before it -> add s 
    if search(r"[aeiou]y$", word): 
        return word + ENDINGS.DEFAULT 
 
    # Words ending in o -> add s generally, but add es for ES_OS words 
    if search(r"o$", word): 
        if word in ES_OS: 
            return word + ENDINGS.SPECIAL 
        return word + ENDINGS.DEFAULT 
 
    # Words ending in fe -> change fe to v and add es 
    if search(r"fe$", word): 
        return word[:-2] + "v" + ENDINGS.SPECIAL 
 
    # Words ending in f or ff -> add S, but change f to v for F_V_WORDS 
    if search(r"ff?$", word): 
        if word in F_V_WORDS: 
            return word[:-1] + "v" + ENDINGS.SPECIAL 
        return word + ENDINGS.DEFAULT 
 
    # If all else fails, just add s 
    return word + ENDINGS.DEFAULT 
 
# Generate random media from list of values on the client's farm 
def random_media(): 
    return random.choice(["in ground", "hugel mound", "raised bed", "container", "aquaponic"]) 
 
# Generate random location from list of values on the client's farm 
def random_location(): 
    hugel_mounds = ['Hugel Mound #1', 'Hugel Mound #2'] 
    greenhouses = ['Greenhouse #1', 'Greenhouse #2', 'Greenhouse #3', 'Greenhouse #4'] 
    fields = ['Field #1', 'Field #2', 'Field #3', 'Field #4', 'Field #5'] 
    orchards = ['Orchard #1', 'Orchard #2', 'Orchard #3'] 
    return random.choice(hugel_mounds + greenhouses + fields + orchards + ['Garden patch', 'Yard', 'Cold frame', 'Indoor']) 
 
# Generate random variety from list of plausible values 
def random_variety(): 
    return random.choice(["standard", "beefsteak", "little finger", "green", "black", "tall", "heirloom"]) 
 
# Generate random source from list of plausible values 
def random_source(): 
    return random.choice(["personal cutting", "cutting from friend", "burpee", "johnny's selected seeds", "ferry-morse", "walmart", "home depot"]) 
 
# Generate random yield number between 0 and 5 (2 decimal places) 
def random_yield(): 
    return round(random.uniform(0, 5), 2) 
     
# Function to generate random comments from an array of sentences 
def generate_comments(): 

    #A few of the many examples I created 
    sentences = [ 
        "None.", 
        "Nothing for now.", 
        "This crop is doing exceptionally well." 
    ] 
     
    #Randomly join 1 to 3 of the above sentences together for the comment. 
    num_sentences = random.randint(1, 3) 
    return ' '.join(random.sample(sentences, num_sentences)) 
 
# Iterate through each line in the input file 
for line in lines: 
    # Strip whitespace and split by spaces 
    words = line.strip().split() 
 
    # Generate random values 
    label = ' '.join(words) 
    name = label 
    hrfNum = str(random.randint(1, 999)).zfill(3) #generate 3 digit number with prepended 0s 
    media = random_media() 
    location = random_location() 
    variety = random_variety() 
    source = random_source() 
    yield_amount = f"{random_yield()} kg/ha" #appends the units of kilograms per hectares 
    crop_type = random.choice(['annual', 'perennial', 'biennial']) 
    active = random.choice(['Y', 'N']) 
    indoors = random.choice(['Yes', 'No']) 
    date = random_date() 
    comment = generate_comments() 
 
    # Create crop dictionary for singular form 
    crop_singular = { 
        'label': label, 
        'name': name, 
        'hrfNum': hrfNum, 
        'active': active, 
        'location': location, 
        'variety': variety, 
        'source': source, 
        'date': date, 
        'comments': comment, 
        'indoors': indoors, 
        'type': crop_type, 
        'media': media, 
        'yield': yield_amount 
    } 
 
    # Append singular crop to CROPS list 
    CROPS.append(crop_singular) 
 
    # Generate plural label 
    plural_label = ' '.join(words[:-1]) 
    plural_label = plural_label + ' ' + pluralize(words[-1]).capitalize() 
    plural_label = plural_label.strip() 
 
    # Create crop dictionary for plural form 
    crop_plural = { 
        'label': plural_label, 
        'name': plural_label, 
        'hrfNum': hrfNum, 
        'active': active, 
        'location': location, 
        'variety': variety, 
        'source': source, 
        'date': date, 
        'comments': comment, 
        'indoors': indoors, 
        'type': crop_type, 
        'media': media, 
        'yield': yield_amount 
    } 
 
    # Append plural crop to CROPS list 
    CROPS.append(crop_plural) 
 
# Write output JSON to file 
with open('testCropData.json', 'w') as f: 
    json.dump(CROPS, f, indent=4) 
~~~

When I ran this program, I got 584 JSON entries in the following format; more than enough for my needs.

~~~json
[ 
    { 
        "label": "Abaca", 
        "name": "Abaca", 
        "hrfNum": "935", 
        "active": "Y", 
        "location": "Greenhouse #4", 
        "variety": "heirloom", 
        "source": "home depot", 
        "date": "08/22/2024", 
        "comments": "This crop is doing exceptionally well.", 
        "indoors": "Yes", 
        "type": "perennial", 
        "media": "in ground", 
        "yield": "3.74 kg/ha" 
    } 
] 
~~~

With this done, I could finally test my search bar properly. While decently fast, I discovered that the search bar was only achieving about 60% accuracy. The most common issue was with plurals where a user input of "carrots" would always return "carrot" above "carrots". Another issue that I remember is "abaca" being considered a better match than "cabbage" for a user input of "cabba". As such, I began more extensively researching fuzzy searching and approximate string matching. 

#### A New String Comparison Function <a name="new_str_comparison"></a>
*Author: Daniel*

At this point, I discovered an [article on ForrestTheWoods' blog](https://www.forrestthewoods.com/blog/reverse_engineering_sublime_texts_fuzzy_match/) about Sublime Text's fuzzy search algorithm. Sublime Text uses their algorithm to suggest keywords to programmers as they type. According to him, Sublime Text tries to match each character in the user's input and assigns a bonus to the match score for specific characters that are worth more points. Then, the algorithm returns the match with the highest final score. Based on some other blogs I found, I decided that it was still a good idea to combine multiple algorithms but as part of a weighted fuzzy search. Also, I found that multiple algorithms would decrease the likelihood of encountering the [birthday paradox](https://pudding.cool/2018/04/birthday-paradox/), though my use case helped to further reduce this potential problem. All of this led to another version of compareStrings and a change to searchFunction to place the strings with the highest score at the top of the list. 

As denoted by the PROFILING comments, the function can now by broken up into general sections. Preprocessing removes Unicode characters with a transliteration library, changes all letters to uppercase, checks for an exact match which permits an early return, and stores each string's length. The Sørensen-Dice Coefficient (SDC) section calculates the coefficient, multiplies it by 100, rounds it to the nearest integer, and makes that the initial match score. The First and Last Letter section gives a bonus score if the first letter, last letter, or the letters after each space matches. The Length & Syllable section gives a bonus if the two strings are the same number of syllables and a penalty if a different length. The Prefix Match section provides a bonus if the second string starts with the first string. The Damerau-Levenshtein Edit Distance (DLED) section compares the two strings, though I also use it earlier in the First and Last Letter section. The Jaro-Winkler Similarity (JWS) section provides a bonus based on the strings' similarity with an extra bonus for matching prefixes. The final two sections lemmatize the two words, retrieve approximate phonetic encodings for the new words, and then provide a bonus if the encodings match. In a later section, I will explain what all of these terms mean. 

#### Initial Optimizations <a name="init_optimizations"></a>
*Author: Daniel*

If you know anything about these algorithms, you will be unsurprised to hear that this code generally took 5 or 6 seconds every time that the user's input changed and that time only grew as the user's input became longer. As such, I began making various optimizations throughout the code. 

Firstly, I initiated an early return if both strings are identical. Next, I took all of the conditionals out of the `.sort()` function in `searchFunction`. While this means that the code is less clean, it significantly decreases the number of operations and function calls. Then, I removed `isNumeric` and changed the conditional to check whether the first character is a number. Also, I added a variety of early returns from each algorithm if the match score is ever too low. 

Somewhere online, I read that TypeScript offers a more efficient version of function declarations. Despite my best efforts, I have been unable to find the article, but I decided to change all of my function declarations in case they were right. For example, the `compareStrings` function declaration now looks like `this["compareStrings"] = function(s, t)`. Similarly, I created custom versions of any functions that I used from the Math library. From what I saw online, the compiler does a better job of optimizing local code rather than library functions. In addition, this offers the option of bitwise and ternary operators. 

#### Sørensen-Dice Coefficient (SDC) <a name="sdc"></a>
*Author: Daniel*

Let's hop straight into this with the Sørensen-Dice Coefficient. The technical definition is the quotient of similarity over sets or twice the intersection of two discrete sets (the intersection of two) divided by the sum of the number of elements in each set. A result of 1 indicates a perfect match while a 0 indicates a failed match. Also, it is a distance semimetric as it does not satisfy a triangle inequality, rendering 1 minus the coefficient mostly meaningless.

```math
SDC = \frac{2\left|X\bigcap Y \right|}{\left| X\right| + \left|Y \right|}
```

For our purposes, I prefer to define it as the percentage of identical n-grams between two strings, displayed as a floating point number between 0 and 1. The n-grams are overlapping substrings or character blocks into which the strings are divided. Basically, n-gram algorithms, like SDC, break strings down into tokens of a specific length, allowing it to index several characters in a larger string. With regard to the above equation, the array of n-grams for string s is set X, and the array of n-grams for string t is set Y. A smaller n-gram length will focus on the two strings having the same letters while a larger n-gram length shifts the focus to the order of the characters. I found that an n-gram length of 2 (or a bigram) is ideal for my purposes. As an example, the string of "MMRV" has 3 bigrams which are "MM", "MR", and "RV". 

I ended up using an implementation called [Fast Dice Coefficient by Ka-weihe](https://github.com/ka-weihe/fast-dice-coefficient). Unlike most implementations, this one has a time complexity of O(N) or specifically O(len(s) + len(t)) with s and t being the strings passed to the function. When I added it to my file, I made some minor changes to handle specific edge cases that I encountered and to add some comments. 

First, the algorithm goes through some conditional early returns which help to handle edge cases and speed up execution. According to the formula, the function should return 1 if it cannot evaluate the strings. For my use case, I decided to instead return a 0 or 0.11. Then, I store each string's length which also helps to decrease the execution time as the length does not need to be repeatedly retrieved from the string variables. Next, I define a map to store various key-value pairs of 2-character n-grams or bigrams. Then, a second for loop counts the number of bigrams in common between the two strings, relying on basic set theory principles. Finally, it calculates two times the number of matches divided by the sum of the lengths minus two. Without multiplying by 2, the function would divide the number of elements in common by the average size of the sets resulting in half of the value that it should return. An example of needing the multiplication factor would be when the two sets were identical as this would otherwise return a 0.5. Subtracting 2 is unique to this implementation to account for n-gram length and the fact that it slightly overcounts. 

#### Damerau-Levenshtein Edit Distance (DLED) <a name="dled"></a>
*Author: Daniel*

Damerau-Levenshtein Edit Distance is a string metric that conveys the minimum number of operations necessary to transform string s into string t. Standard Levenshtein Edit Distance considers the number of deletions, insertions, and substitutions necessary. The Damerau component adds the potential for transpositions, allowing it to consider the possibility of two neighboring characters being entered in the wrong order. Due to the performance savings, I am using the restricted version where there is a maximum edit distance after which the algorithm should stop. This decreases the time complexity from O(len(s)²) to O(len(s)*maxDistance) where s is the first passed string. The math for all of this is fascinating so let's explore it a bit.

```math
lev(a,b)=\left\{\begin{matrix}
\left| a\right| & \textrm{if} \left| b\right| = 0  \\
\left| b\right| &  \textrm{if} \left| a\right| = 0 \\
lev(tail(a),tail(b)) &  \textrm{if head(}a\textrm{)=head(}b\textrm{)}  \\
1+min\left\{\begin{matrix}
lev(tail(a),b) \\
lev(a,tail(b)) \\
lev(tail(a),tail(b))
\end{matrix}\right. & \textrm{otherwise} \\
\end{matrix}\right.
```

This is the math for a recursive version of Levenshtein Edit Distance. Basically, if either of the strings has a length of 0, the function returns the length of the other string. Tail(x) returns all but the first character of x while head(x) returns only the first character of x. As such, the third line means that if the first character of each string matches, the function should be recursively called on the rest of the strings. The fourth line is a piecewise function that returns a value of 1 plus the minimum of the next three recursive functions which handle deletion, insertion, and substitution in that order. However, recursive functions are terribly inefficient so I used the matrix-based version. 

```math
lev(a,b)=\left\{\begin{matrix}
\left| a\right| & \textrm{if} \left| b\right| = 0  \\
\left| b\right| &  \textrm{if} \left| a\right| = 0 \\
min\left\{\begin{matrix}
lev_{a,b}(tail(a),b)+1 \\
lev_{a,b}(a,tail(b))+1 \\
lev_{a,b}(tail(a),tail(b))+1_{a_{i}\neq b_{j}}
\end{matrix}\right. & \textrm{otherwise} \\
\end{matrix}\right.
```

You can still recognize the length checks. However, the function definition for lev has changed a bit. The values 'a' and 'b' still represent the two strings while 'i' represents the terminal character position of a and 'j' represents the terminal character position of b. Since we are dealing with lengths, the position variables of i and j are 1-indexed rather than 0-indexed. There is a conditional on that final +1 which means that the edit number is only incremented if the character at position i in string a is not equal to the character at position j in string b. However, the math is a bit abstract so let's look at an example. Here's the completed example matrix if a="sitting" and b="kitten" 

!["i=1, j=1"](./images/matrix.png)

*Example variable values: a=sitting; b=kitten; i=1; j=1;*

```math
lev(i,j)=\left\{\begin{matrix}
{\color{Red}\left| a\right|} & {\color{Red}\textrm{if} \left| b\right| = 0}  \\
{\color{Red}\left| b\right|} &  {\color{Red}\textrm{if} \left| a\right| = 0} \\
min\left\{\begin{matrix}
lev_{a,b}(0,1)+1=1+1=2 \\
lev_{a,b}(1,0)+1=1+1=2 \\
lev_{a,b}(0,0)+1_{a_{i}\neq b_{j}}=0+1=1
\end{matrix}\right. & =1 \\
\end{matrix}\right.
```

This is the piecewise function to calculate the red '1' in the green circle. I have substituted in i and j and marked the invalid conditions as red. The function calls lev(0,1) or lev(1,0) will return 1. When plugged into the equations and then sent through the min function, a result of 1 is returned and placed in the matrix. 

*Example variable values: a=sitting; b=kitten; i=1; j=2;*

```math
lev(i,j)=\left\{\begin{matrix}
{\color{Red}\left| a\right|} & {\color{Red}\textrm{if} \left| b\right| = 0}  \\
{\color{Red}\left| b\right|} &  {\color{Red}\textrm{if} \left| a\right| = 0} \\
min\left\{\begin{matrix}
{\color{CornflowerBlue} lev_{a,b}(0,2)}+1=2+1=3 \\
{\color{Green} lev_{a,b}(1,1)}+1=1+1=2 \\
{\color{Magenta} lev_{a,b}(0,1)}+1_{a_{i}\neq b_{j}}=1+1=2
\end{matrix}\right. & =2 \\
\end{matrix}\right.
```

This is the piecewise function to calculate the red '2' in the yellow circle. I have substituted in i and j and marked the invalid conditions as red. The function calls are color-coded with the circles in the matrix. The blue lev(0,2) returns the value in the blue circle which is 2. The green lev(1,1) returns the value in the green circle which is 1. The pink lev(0,1) returns the value in the pink circle which is 1. All of that is plugged into the values so that the minimum can be returned and stored in the matrix. 

*Example variable values: a=sitting; b=kitten; i=7; j=6;*

```math
lev(i,j)=\left\{\begin{matrix}
{\color{Red}\left| a\right|} & {\color{Red}\textrm{if} \left| b\right| = 0}  \\
{\color{Red}\left| b\right|} &  {\color{Red}\textrm{if} \left| a\right| = 0} \\
min\left\{\begin{matrix}
lev_{a,b}(6,6)+1=2+1=3 \\
lev_{a,b}(7,5)+1=4+1=5 \\
lev_{a,b}(6,5)+1_{a_{i}\neq b_{j}}=3+1=4
\end{matrix}\right. & =3 \\
\end{matrix}\right.
```

This is the piecewise function to calculate the green '3' in the bottom right corner. I have substituted in i and j and marked the invalid conditions as red. Like the other functions, each function call returns the value at the specified location in the matrix so 2 for lev(6,6), 4 for lev(7,5), and 3 for lev(6,5). These retrieved values are incremented and sent through the min function to arrive at a final value of 3 which is stored in the bottom-right-most cell. This is the cell that will be returned as the final edit distance. 

Now, my optimizations have changed the original math a bit. Normally, the edit distance cannot be less than the absolute value of the difference between the length of the two strings, but my optimizations take it a bit further by establishing a maxDistance. Firstly, I can return the length of string a early if i = j and the cell at [i][j] is greater than 4. Secondly, I can ignore all cells in the matrix where |i-j| > maxDistance. This also saves me some space as I only need a matrix of len(a) by 2*maxDistance. Thirdly, I return early if the smallest value in the column ever exceeds the maxDistance. Also, I want to note that the +1's would be replaced with my variable costs. Now that I've covered Levenshtein Edit Distance, let's add Damerau's portion. 

```math
dled_{a,b}(i,j)=\left\{\begin{matrix}
\left| a\right| & \textrm{if} \left| b\right| = 0  \\
\left| b\right| &  \textrm{if} \left| a\right| = 0 \\
dled_{a,b}(i-1,j)+1 & \textrm{if } i > 0 \\
dled_{a,b}(i,j-1)+1 & \textrm{if } j > 0 \\
dled_{a,b}(i-1,j-1)+1_{a_{i}\neq b_{j}} & \textrm{if } i,j > 0 \\
dled_{a,b}(i-2,j-2)+1_{a_{i}\neq b_{j}} & \textrm{if } i,j > 1 \textrm{and} a_{i}=b_{j-1} \textrm{and} a_{i-1}=b_{j}
\end{matrix}\right.
```

This looks the same as the LED piecewise with the length conditionals being followed by deletion, insertion, and substitution in that order. The new line with i-2 and j-2 describes the transposition of 2 neighboring characters. 

Importantly, I am using the optimal string alignment version of the DLED algorithm which means that the triangle inequality does not hold. I prefer this version as it does not permit multiple operations on the same substring. For example, it will return an edit distance of 3 for "CA" and "ABC" as a transposition of "CA" → "AC" would not permit a second operation of "AC" → "ABC". Instead, the shortest string of operations for equivalent operation costs of 1 would be "CA" → "A" → "AB" → "ABC". Restricted edit distance is the alternative to optimal string alignment distance and does not have this restriction, but I felt that it was less useful for my purposes. 

Normally, subCost, insertCost, and deleteCost would all equal 1. In some implementations, this is tuned to favor deletions with a cost of 1, then substitutions and transpositions with costs of 1.5, and finally insertions with a cost of 2. I decided to modify this approach. Insertions, deletions, and transpositions are unconnected to any other characters. However, the substitution costs are dependent on the distance between the two keys where one character is replaced with another. As such, I defined a dictionary where I assigned coordinates to each key based on a 2d Cartesian coordinate system. Then, I calculated the Euclidean Distance between those two coordinates for the two passed characters. Since the Euclidean Distance will inclusively range between 0 and 9, I divide it by 3 which ensures that the substitution cost is never too big. In addition, it minimizes the difference between the distance between 'Q' and 'E' versus 'Q' and 'Z' while retaining the difference as one is horizontal while the other is diagonal. 

There are some optimizations that I made to the DLED algorithm. If one string is a prefix to the other, then I can just return the difference between their lengths. Similarly, I’ll return 0 if the strings are identical. If the first string is longer than the second string, I swap them as the first string has a bigger impact on the number of operations. If the two current characters are the same, I use the jagged distance rather than recalculating it. I pass two modified strings to the DLED algorithm where I have removed any shared prefix or suffix. Since the shared prefix and suffix won’t impact the distance, I can simply ignore them. 

Despite all of that math, you just need to know that the DLED algorithm calculates the number of changes necessary to transform one string into another. Since it does not depend on the presence of specific pairs like bigram SDC, DLED is more resilient to typos and overlapping patterns. As such, SDC tends to be more accurate with more substantial errors and for longer text while DLED is more accurate when there are fewer errors in shorter strings. 

#### Jaro-Winkler Similarity (JWS) <a name="jws"></a>
*Author: Daniel*

Jaro-Winkler Similarity is a string metric that uses a normalized value between 0 and 1 to measure the edit distance between two strings. Jaro-Winkler Similarity does not obey the triangle inequality which invalidates it as a mathematical metric. Despite the name, Jaro-Winkler Distance (1 - JWS) is also not a metric since it does not obey the triangle inequality and does not satisfy the identity axiom d(x,y) = 0 ↔ x = y. 

```math
\textrm{Jaro}=\left\{\begin{matrix}
0 & \textrm{if } m=0  \\
\frac{1}{3}(\frac{m}{\left| a\right|}+\frac{m}{\left| b\right|}+\frac{m-t}{m}) & \textrm{otherwise} \\
\end{matrix}\right.
```

The variables 'a' and 'b' represent the strings being compared while 'm' represents the number of matches and 't' represents the number of transpositions. 

The number of transpositions is the number of matching characters that are in the wrong order, divided by two. Two characters are considered matching only if they are the same and not farther than a certain number of characters apart. This maximum distance is calculated using the following equation. 

```math
\textrm{distance}=\left \lfloor \frac{max(\left| a\right|,\left| b\right|)}{2}\right \rfloor - 1
```

This is the length of the two strings sent through the max function before being divided by 2 and sent through a floor function. Finally, 1 is subtracted from it. 

Examples make everything clearer so let's calculate the Jaro Similarity for "FAREMVIEL" and "FARMVILLE". The maximum distance for the matches would be max(9,9)=9 as both are 9 characters long before being divided by 2 for 4.5. The floor of 4.5 is 4, and the final result for the maximum matching distance is 3 after 1 is subtracted from it. Three characters ('F', 'A', 'R') are in the same position in both strings and 5 characters ('M','V','I','E','L') are within 3 characters of each other. The 'E' and 'L' in "FAREMVIEL" are matching characters that are in the wrong order so the number of transpositions is 1. 

```math
\textrm{Jaro}=\left\{\begin{matrix}
0 & \textrm{if } m=0  \\
\frac{1}{3}(\frac{8}{9}+\frac{8}{9}+\frac{8-1}{8})=0.88 & \textrm{otherwise} \\
\end{matrix}\right.
```

The Winkler portion uses a prefix scale (p) to provide more favorable ratings to strings that match from the beginning for a common prefix length up to a maximum of 4 characters. The maximum will be 'L' and the actual length of the common prefix will be 'l'. To prevent the normalized similarity from exceeding 1, the prefix scale should not exceed 0.25 or 1 divided by the maximum allowed prefix length (L) which is generally 4. The standard p-value is 0.1, but I found that 0.16 is the best scaling factor for my purposes. The JWS score can be calculated with the following equation. 

```math
\textrm{JWS} = \textrm{Jaro} + min(L,l) * p * (1 - \textrm{Jaro})
```

Let's continue our example from before. I'll be using 0.16 for my p value and 3 for my l value since both strings start with the same 3 characters. 

```math
\textrm{JWS} = 0.88 + min(4,3) * 0.16 * (1 - 0.88)
```

Now that I've explained how it works, let's discuss the actual code. I heavily optimized the function based on [Miguel Serrano's C-based implementation](https://github.com/miguelvps/c) and [Lars Garshol's Java-based implementation](https://github.com/larsga/Duke) which was based on William E. Yancey's paper called "Evaluating String Comparator Performance for Record Linkage". Also, I added a min_score parameter where the function will return prematurely if that score is impossible to achieve for these string lengths. The final time complexity is O(len(s)*len(a)) where s and a are the strings passed to the function. 

#### Transliteration Library <a name="transliteration"></a>
*Author: Daniel*

Before using any of the other techniques, I ran the text through a transliteration library called Unidecode which transforms Unicode into ASCII. For example, 'á' will become 'a', and '間' will become 'Jian'. Like most transliteration libraries, Unidecode conducts context-free character-by-character mapping which makes it very effective at simply stripping diacritics like accents or transliterating Latin-based languages like Cyrillic characters. While it can translate languages not derived from Latin, it does struggle with some of the details. For example, the common Japanese name of "洋子" can be pronounced as "Yoko" or "Hiroko", and the name of "الرشید عبد" can be accurately transliterated as "Abdal-Rachid" or "Ar-Rashid". Unidecode specifically does not detect the difference between Japanese and Chinese characters as the languages use the same characters to mean different things. Also, Unidecode simply strips the umlauts rather than translating 'ü' into 'ue' because that is only the proper transliteration for German, not Finnish or Turkish. 

Now that I've explained what a transliteration library and Unidecode are, I want to explain why I used them. Firstly, it can be considered an extension of cleaning the text before it is sent through any other algorithm, especially Double Metaphone which removes all non-ASCII characters. However, this affects all of the distance measurements which would treat a Unicode character as a different character from the ASCII equivalent. Secondly, such a library eliminates problems where the user accidentally changes their keyboard while wearing gloves or autocorrect causes an issue, a possibility if they frequently write in multiple languages. Thirdly, I wanted to future-proof as I do not know all of the client's future plans for this app. 

#### Lemmatizer <a name="lemmatizer"></a>
*Author: Daniel*

Lemmatization is the process of grouping together the inflected forms of a word based on a word's lemma, allowing the forms to be analyzed as a single item. A lemma is the base form of a word like "walk" but is always a valid word in and of itself. As such, a lemmatizer will return "walk" regardless of whether it is passed "walk", "walked", "walks", and "walking". Generally, lemmatizers are good at handling unusual forms like "corpora" → "corpus" and "had" → "have" which cause problems for alternate solutions. A lemmatizer will also consider the context of neighboring words and synonyms. As such, "better" will become "good" as "good" is the root synonym. In addition, a lemmatizer can detect whether a word is being used as a noun or verb, allowing it to return the correct lemma. Due to all of this, a lemmatizer improves the accuracy of the next stage of text analysis and reduces the size of text. 

Lemmatizers generally take one of three approaches: rule-based, dictionary-based, and machine learning-based. The rule-based approach uses a set of predefined linguistic rules and patterns to derive the lemmas. While it does not cover every possible nuance, this approach is faster and more space-efficient which led me to choose it for my purposes. Specifically, I chose WinkJS' implementation as it was fast, well-tested, and easy to implement. The dictionary-based approach uses a massive series of dictionaries or lookup tables to map words to their lemmas. The machine learning-based approach relies on computational models and machine learning mechanisms to learn, generalize, and apply the rules. 

An alternative to lemmatization is stemming, a naive approach that algorithmically replaces affixes which reduces the derived word into the word stem. The stem does not need to be the morphological root or a real word so long as the algorithm returns the same stem for all related words. Most stemmers are based on recursive affix-stripping and lookup tables, where an affix refers to either a prefix or suffix. This approach leaves stemmers extremely fast but creates various issues. Words like "had" and "corpora" may not be transformed. Too many words will be transformed into the same stem like "operate", "operating", "operates", "operation", "operative", "operatives", and "operational" all becoming "oper" when the Porter stemming algorithm is applied, losing a large degree of precision. For my purposes, the biggest flaw with stemming is that it can return a made-up word like "beauti" from "beautiful" or "oper" from "operational". 

#### Double Metaphone <a name="double_metaphone"></a>
*Author: Daniel*

Developed by Lawrence Philips in 2000, Double Metaphone reduces a word to a combination of 12 sounds and uses that to generate 2 phonetic encodings which represent possible pronunciations of the word in several languages. The algorithm removes all non-alphabetic characters and then all vowels not at the start of the word. Afterwards, Double Metaphone uses a set of rules to process the consonants and the ways that they could combine. Soundex began the concept back in 1918 and is still used by some applications. However, I believe that it is too generalized and I dislike the fixed-length encodings. The original Metaphone fixed both of those problems by expanding the set of pronunciation rules and permitting variable-length keys. Double Metaphone improved on that with 2 possible encodings and the ability to handle foreign pronunciations, allowing it to detect similarities which Soundex overstates and Metaphone misses. 

Double Metaphone is very good at handling nouns. For example, "smythe" and "smote" both have an edit distance of 2 from "smith". However, "smythe" and "smith" have the same Double Metaphone code. People are more likely to get the pronunciation correct and the spelling wrong which makes Double Metaphone codes rather useful for words that have strange spellings, foreign pronunciations, or multiple acceptable spellings. All of that makes Double Metaphone perfect for my use case of searching crop names. 

I will note that various articles recommend using a stemmer with Double Metaphone. A stemmer does provide some benefits as it removes the impact of plural forms, past tense, and other various and sundry affixes. However, this creates one key issue that I mentioned in the section on lemmatizers. Namely, Double Metaphone only reliably works if it is fed real English words, preferably ones that do not end in vowels unless those vowels are silent. As such, I used a lemmatizer to prepare the words for Double Metaphone. 

#### Exact String Matching <a name="exact_str"></a>
*Author: Daniel*

If either string is undefined or their lengths differ, I automatically return a false. Using some regex, I look for the string s in the string t. If "test" is passed as s, the regex would find a match for "This is a test" or "This is a TEST if regex is working" but not "This is a -test+". The array of matches would be stored in the match variable. Then, the function returns true if the match variable contains anything and if the entire string t equals the first match that was found by the regex. This function is used in a variety of sections to ensure that two strings are identical regardless of React Native’s strange handling of strings and types. 

#### First and Last Letter Section <a name="1st_last_letter"></a>
*Author: Daniel*

After calculating the initial match score, I check specific letters to see if I should give a bonus score. Namely, I check the first and last letters in the string since they are the least likely to be incorrect. I use the charAt function as it is faster than bracket notation. 

More interestingly, I use a simple algorithm to construct the acronym of each string by concatenating a new string from the first letter of each word separated by a space. Then, I compare the two acronyms with the SDC algorithm. As part of my optimizations, this only occurs if there is a space present in the string. 

In this bit of code, I split the string into an array of tokens on the space character. The reduce function takes a function and an initial value, though I set the initial value to an empty string. The function within reduce will define two variables: response which is supposed to be the total and word which is initialized to the current value of the array. These values are then passed to an equation where the first character of the word variable is retrieved and concatenated to the end of the response variable. 

Afterwards, I calculate the SDC value between the acronyms. I multiply 15 by that distance to determine the score bonus, meaning that the bonus approaches 0 as the distance increases and is large when the distance is small. 

#### Syllable Counting <a name="syllables"></a>
*Author: Daniel*

When providing bonuses to the match score, I consider both the length and the number of syllables in the two strings. Since the length checking is relatively simple, I want to focus on the syllable counting function. 

Like my other algorithms, this function quickly ensures that the passed variable is defined and has a length. Then, I use several regex-based functions to remove specific characters at the end of the word. First, I remove the last character of a string if it is not a vowel or 'L'. Alternatively, I remove the last two characters in the case of "ed" or any word that ends in 'E'. For example, "lore" becomes "lo" while "lorem" becomes "lore". The words "testy", "able", and "anvil" will not be changed. Secondly, I remove the first instance of the letter 'Y' from any word which starts with it. For example, "yay" will become "ay" while this line will not affect most other words, including "hay". Thirdly, I remove any instances of a 'U' that is following a 'Q' or a vowel pair. Without it, the words "acquaintance" and "beautiful" count as 4 syllables because the code incorrectly believes "UA" and "AU" are a syllable's vowel pair, leading to a miscount. 

With the words cleaned up, I can finally count the number of syllables using a regex-based match. Due to the global or 'g' flag, the variable "syl" will store an array of every match found by the regex, allowing me to return the number of matches as the number of syllables. The regex statement is looking for vowels on their own or vowel pairs with two neighboring vowels. 

Unfortunately, the algorithm struggles with silent E's in the center of a word. Based on my initial testing, this problem was only noticeable for compound words containing "some" such as "somewhere" or "someone". Even this only came up once since I am using these algorithms to assess crop names. If you are handling general English words, you may need to tweak the algorithm beyond my stopgap method of counting it as one syllable and then removing the word "some". 

#### Common Prefix and Suffix <a name="common_prefix_suffix"></a>
*Author: Daniel*

As part of my scoring, I remove any common prefix and suffix between the two strings. Then, I increase the match score by the difference in length multiplied by 4. This means that a larger bonus is applied the more that the two strings have in common. For example, if 3 characters are removed from both strings, this will increase the match score by 24. 

First, I will discuss how I determined the length of the common prefix. A for loop iterates through a number of characters equal to the length of the shortest string. Then, the for loop increments a counter until the two strings no longer match at the current index. 

Second, I will discuss how I determined the length of the common suffix. This function uses a while loop to assess the strings. The while loop has two conditions. The first condition ensures that the found suffix length is less than the length of the shortest string. The second condition compares two characters, one from each string. The character’s index is equal to the string’s length minus 1 and minus the found suffix length, meaning that the while loop starts at the end when the found suffix length is 0 and moves forward. I multiply the final found suffix length by –1 as I need a negative length to properly slice up the strings. 

### Backend Services <a name="backend_overview"></a>
#### Database <a name="database_overview"></a>
*Author: Tyler*

The database is deployed on Azure MySQL flexible server. Connecting to the database can be done either through MySQL's command line tools, or it can be done through the Azure portal. Once we have set up the database connected to the client's account, you can handle maintenance tasks using the Azure Portal. These tasks include log and read-write monitoring, as well as viewing the database in PowerBI.

The database is connected to the app using a Node.JS Express server backend which will also be deployed on the Azure Portal through the App Services. The database consists of 11 tables, each having their own primary keys. If you wish to see more on the Database structure, please see the Project Plan Document or Design Document. If you wish to alter these tables, please run `ALTER TABLE SQL` query. If you wish to insert custom values or fields into the database, run the `CREATE TABLE` query, and be sure to add the `fld_s_<tableletter>_subscriberID_pk` to the table if it needs another primary key to ensure unique values. 

If you wish to add your own custom endpoints to the backend, we have our backend deployed using Azure App services CI/CD pipeline. It is set up to track a GitHub repo for pushes to the master branch, and then build and deploy the app to Azure App Services. If you wish to write a custom endpoint, please clone the repository using git, and then add your new endpoint. Please remember to pass the `<user>` object to the backend when you call the endpoint, as we use the user object to structure the SQL queries needed to fetch data. 

#### Backend Server <a name="backend_overview"></a>
*Author: Tyler*

Our backend interacts with 2 key services: the database and our user authentication service, Auth0. 

Auth0 is a third-party user authentication service that is built on the Oauth architecture. Oauth simply allows apps and services to host user management and authentication on their platform. Users can sign in through many providers, including Google, Microsoft, Facebook, and other similar social media sites. This simplifies the user authentication process.

To get the backend code, contact me (Tyler Bowen) to be added as a contributor, and then clone the repo using git clone `tjb0264@<repository address>`. This will clone the repository that contains the backend code.

This is also a node.js project, so please run the `npm install` command to download the dependencies described in package.json. 

Once the `npm install` command is finished running, we can start a local instance of the server using either `npm start` or `npm run dev`. It is important to note that this instance is local, and changes to your local files do not affect the actual server.

#### Writing Endpoints <a name="writing_endpoints"></a>
*Author: Tyler*

If you want to write your own custom API endpoints to handle user data, to add new queries to the database, or handle some data/function on the server side, you will need to use the following syntax and add it to the server.js file.

~~~node
app.(get/post)('/path_for_callback', (req, res) =>{
    //do some dta function here
})
~~~

We are declaring the method of the endpoint, whether that is a GET method from the client requesting data, or it is a POST methid from the user pushing data to an entity. We then declare the second parameter as a callback function with two parameters: request, containing the request information, and the response, which is what we will eventually send to the client with the desired data.
#### Pushing to the GitHub <a name="push_to_github_backend"></a>
*Author: Tyler*

To push your changes to the server, use either the git cli, or the git GUI that can be downloaded. Add your modified files to be commited, run the `git commit` command, and then push to the remote branch desired using `git push origin <branch>`

## Installation & Setup <a name="setup"></a>
### Package Management <a name="pkg_mgmt"></a>
#### Importing Libraries <a name="import_libs"></a>
*Author: Daniel*

When you need to import/install a new library, please use either `npm install --save <YourLibrary>` or `npm install --save-dev <YourLibrary>`. The former will add it to the dependencies list in package.json while the latter adds it to the devDependencies list.

There are two other commands which can import libraries but which should not be used. Namely, they are `npx expo install <YourLibrary>` and `yarn add <YourLibrary>`. These commands do not properly save the libraries in package.json and use a different package manager. While expo can handle having both the npm and yarn package managers, it can create some conflicts with jest and requires that you import every library twice.

### Running The Program <a name="run_program"></a>
#### Starting Expo Go <a name="start_expo"></a>
*Author: Daniel*

Start Expo Go by executing `npx expo start` from a command line at the root directory of the repo.
#### Starting The Test Suite <a name="start_tests"></a>
*Author: Daniel*

Start the full test suite by executing `npm test` from a command line at the root directory of the repo.

To run only a specific test fil, execute `npm test -- BillingDetails.test.jsx` from a command line at the root directory of the repo. Since this file is in \_\_tests\_\_ which is in the root directory, a directory is not necessary in the command.

If you want to update the snapshots, you can execute either `npm run updateTestSnapshots` or `npm test -- -u BillingDetails.test.jsx` from a command line at the root directory of the repo.

## Maintenance Tasks <a name="maint"></a>
### Adding a New Page <a name="add_page"></a>
Maintenance Type: Perfective Maintenance Task
#### Adding Dark Mode <a name="add_dark_mode"></a>
*Author: Daniel*

Ah, so you wish to add Dark Mode to your new page. To begin, please add the following imports to the top of your file. 

~~~jsx
import { useState, useEffect } from 'react'; 
import { Appearance } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
~~~

I will assume that you are using a functional component. As such, you can use the useState and useEffect hooks to fetch the current Dark Mode setting. 

~~~jsx
const [isDarkMode, setIsDarkMode] = useState(false) 

useEffect(() => { 
  // declare the async data fetching function 
  const fetchDarkModeSetting = async () => { 
    const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting'); 
    let result = null 
    if (JSON_VALUE && JSON_VALUE !== "") { 
      result = JSON.parse(JSON_VALUE) 
      console.log("Async: " + result) 
    } else { 
      colorScheme = Appearance.getColorScheme() 
      if (colorScheme == 'dark') { 
        result = true 
      } else { 
        result = false 
      } 
      console.log("colorScheme: " + result) 
    } 
    setIsDarkMode(result) 
  } 

  // call the function 
  fetchDarkModeSetting() 
  // make sure to catch any error 
    .catch(console.error); 
}, []) 
~~~

This block of code fetches the current Dark Mode setting from AsyncStorage and then stores it in the isDarkMode state variable. If the setting has not yet been defined in AsyncStorage, the program uses the system’s light/dark mode setting. 

AsyncStorage is a [community-made version](https://react-native-async-storage.github.io/async-storage/docs/install/) of a storage system that used to exist in [React Native](https://reactnative.dev/docs/asyncstorage) before being removed. AsyncStorage offers an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. On Android devices, this is achieved with a SQLite database while iOS devices utilize a combination of a single large json file for small values (<1024 characters) and distinct files for large values. The distinct files are named with the MD5 hash of its contents. AsyncStorage has a maximum size of 6MB for the entire app and a maximum size of 2MB for the I/O buffer. If you need to save or read more than 2MB at a time, I would recommend implementing a chunking solution or to use multiGet/multiSet. 

After the previous useEffect hook, you can use the `isDarkMode` state variable and the traditional conditional rendering techniques to change your page’s styling based on whether the user has enabled Dark Mode. For example, `style={[styles.container, isDarkMode && styles.containerDark]}` will always apply `styles.container` and will only apply `styles.containerDark` if `isDarkMode` is true. In this situation, you would want to define most of your styling in `styles.container`, including the color scheme for light mode. Then, use `styles.containerDark` to only define the color scheme. The order in the list ensures that `styles.containerDark` overrides whatever colors are defined in `styles.container`. This works because the style will only be applied if it is true. The style on its own is always true, which is why `styles.container` will be applied. However, `styles.containerDark` will only be applied when both it and `isDarkMode` are true, which is done with the AND operator. If you want one value for light mode and a separate value for dark mode without any overlap, you should use the ternary operator like in `icon={isDarkMode ? Icons.arrow_tail_left_white : Icons.arrow_tail_left_black}`. The ternary operator is especially useful when you are using a library component that already has light and dark mode themes but requires you to pass a string rather than a boolean like with `theme={isDarkMode ? 'DARK' : 'LIGHT'}`. Of course, you can combine these two techniques, especially if you have a second boolean state variable that needs to be considered too. In the following example, a ternary operator is used to assign the base light mode style for this text block based on whether `hasNotificationsEnabled` is true. Then, this example code overwrites the text color when `isDarkMode` is true. 

~~~jsx
<Text style={[(hasNotificationsEnabled) ? { 
  fontFamily: 'WorkSans-Regular', 
  fontSize: 14, 
  marginTop: 10, 
  paddingTop: 0, 
  color: Colors.IRISH_GREEN, 
} : { 
  fontFamily: 'WorkSans-Regular', 
  fontSize: 14, 
  fontStyle: 'italic', 
  marginTop: 0, 
  paddingTop: 0, 
  color: 'black', 
}, isDarkMode && (hasNotificationsEnabled ? {color: Colors.HOT_GREEN} : {color: Colors.ALMOST_BLACK})]}> 
~~~

To provide some extra help, here is the code for adding dark mode to the status bar and navbar as they are two components frequently reused throughout the program. The navbar is especially easy since it takes a boolean, just keep in mind that this navbar example is meant for the profile page. Don't forget to the change the selected page to your page.

~~~jsx
<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/> 
<NavBar profileSelected darkMode={isDarkMode}/> 
~~~

#### Expanding the NavBar <a name="expand_navbar"></a>
*Author: Daniel*

The NavBar consists of 3 rows with the first row existing solely to create the green circle in the center. The second row contains the icons while the third row contains the label text. You will need to add a new column to all 3 rows, ensuring all of them are the same size. The row and column structure means that each icon is given a percentage of the available space. 

First, create a new prop to indicate whether your page is selected, and set the default value to false. When you add a new portion to the navbar, you will be using the AppButton component. The icon row should have an empty title prop and specify an icon. Use the ternary operator to change the icon and color depending on whether the page is selected, as indicated by your new prop. The selected color should be MALACHITE while the unselected color should be SPANISH GREEN. The text row should have a filled title prop with your page’s label and without any specified icon. Use the ternary operator again to swap between `styles.selectedText` and `styles.unselectedText` based on your new prop. Finally, set the onPress prop for your new buttons, making sure to use the replace function. For example, the onPress value for the profile page would be `onPress={() => router.replace('/profile')}`, taking you to the page defined in profile.jsx. 

#### Importing the Search Bar <a name="import_search"></a>
*Author: Daniel*

This section will help you if you want to use the search bar. First, you will need to import the component at the top of your file. You can achieve this with `import SearchInput from '../assets/SearchFeature.jsx'`. Now, you can use my search bar like any other component. 

If you call the `<SearchInput />` tag, this will default to the dropdown mode. The same is true if you pass "dropdown" to the resultDisplayMode prop like `<SearchInput resultDisplayMode={"dropdown"}/>`. Alternatively, you could set it to modal mode with `<SearchInput resultDisplayMode={"modal"}/>`. I should note that the dropdown shows the 3 best matches while modal shows the 10 best matches.

![Search Bar in Dropdown Mode](./images/Screenshot%202024-08-30%20090816.png "Dropdown Mode")
![Search Bar in Modal Mode](./images/Screenshot%202024-08-30%20091416.png "Modal Mode")

## Troubleshooting <a name="trblsht"></a>
Assumes that you are using a Windows OS

### Emulator Errors <a name="emulator_errors"></a>

#### Cannot Open Emulator <a name="cant_open_em"></a>
*Author: Daniel*

1. Open Android Studio
1. Go to the SDK manager in the Tools menu
1. Update your installation of the Android API (cannot be one of the "ext-" APIs)
    - It will be installed & updated if you see a checkmark. An empty box means that it hasn't been installed while a minus sign means that it is outdated
1. Go to the SDK Tools tab
1. Make sure that you have installed and updated the Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools
    - It will be installed & updated if you see a checkmark rather than an empty box or a minus sign

#### Emulator Says "The system UI isn't responding" <a name="ui_not_responding"></a>
*Author: Daniel*

1. Open Android Studio
1. Go to the Device Manager
1. Click the vertical meatball menu (the 3 dots) for your emulator
1. Select Wipe Data
1. Click the pencil icon for your emulator
1. Click the button labeled Show Advanced Settings
1. Go to Emulated Performance section
    - Set Graphics to Hardware
    - Enable Multi-Core CPU, if you can
    - Set the Multi-Core CPU value to larger than 2, if you can
    - Set Boot Option to Cold Boot
1. Go to the Memory and Storage section
    - Increase the available RAM

#### Emulator Says "Something went wrong. Can't connect to Internet." <a name="no_internet"></a>
*Author: Daniel*

1. Close the two Expo tabs on the phone
1. Click the Expo icon on the home screen
1. Re-enter 'a' in the command line
1. Keep doing this until it works. Sometimes it can take 3-6 tries

#### Emulator Reloads When I Try to Type 'R' Into an Input Field <a name="reloads_on_r"></a>
*Author: Daniel*

1. Wait for the emulator to reload
1. Go back to that page
1. Type in the values more slowly or use the emulator's keyboard.
    - If you type with the keyboard too quickly, the emulator can't register it as an input so the value gets sent to the command line which interprets it as a reload command

### Expo Errors <a name="expo_errors"></a>

#### Expo-CLI is Deprecated / Legacy Expo-CLI <a name="cli_deprecated"></a>
*Author: Daniel*

1. Use `npx expo ...` rather than `expo ...` or `npm expo ...`

An alternate solution involves installing yarn and then executing `yarn add expo`. However, the addition of yarn will cause other issues with libraries like jest and with our other package manager, npm.

### Common React Native Compilation Errors <a name="rn_compilation_err"></a>

#### Error due to Different Number of Hooks Between Renders <a name="different_number_hooks"></a>
*Author: Daniel*

1. Find all return/render statements within an if-else block or a loop (called conditional returns)
1. Find all instances of the useState() and useEffect() functions
1. Move all instances of the useState() and useEffect() functions before any conditional returns. You may need to move other hooks too, but these are the most common sources of issues.

### Jest Errors <a name="jest_errors"></a>

#### General Troubleshooting Advice For Jest <a name="general_ts_advice"></a>
*Author: Daniel*

1. Create a component with the same name in the same file as the old component that is triggering errors
    - Make sure to rename your old component
1. In the new component, return a single Text component and a console.log like in the example code
~~~jsx
const YourComponent = () => {
    console.log("Component Imported Successfully!")
    return (
        <Text>Hello World!</Text>
    )
}
~~~
If that `console.log` isn't triggered, then you know that your issue lies with your import statements in that file, with your export of this component, with your import of this component in the test, or with the jest configuration. If the Text component isn't being rendered in the .snap file, it probably means the same thing.

Once the `console.log` is triggered and the Text component is properly rendered, add an instance of each component type in the original component to this temporary component. Keep doing this one at a time until it breaks. Don't worry about formatting or styling; just try to nail down what component or hook is causing your issue.

When the issue is resolved, rename your test component and give your original component back its name. If the original component works, great! Now you can delete the test component and move on. If not, I would recommend returning to the test component and continuing to mess with things.

#### No Tests Found <a name="no_tests"></a>
*Author: Daniel*

Your error code will probably look something like this, though the same principles apply if you are trying to determine why your new test file isn't being detected.
~~~bash
No tests found, exiting with code 1
Run with `--passWithNoTests` to exit with code 0
In <Your Repo's File Path Here>
  33 files checked.
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches
  testPathIgnorePatterns: \\node_modules\\ - 33 matches
  testRegex:  - 0 matches
Pattern:  - 0 matches
~~~

There are 2 general causes for this issue.

1. Your file type may not be specified in the jest.config.js file.
    1. Go to the root directory of the repo
    1. Open the jest.config.js file
    1. Find the line which specifies the `moduleFileExtensions` key
    1. Add your file extension to the list in quotes
        - If your file was YourComponent.test.jsx, the `moduleFileExtensions` list should contain 'jsx'. Note the fact that the period is not included.
1. Your test files are incorrectly named
    1. Go to the root directory of the repo
    1. Find a folder called "\_\_tests\_\_" or create it if it isn't there
    1. Place all test files into that folder
    1. Verify the names of all test files as they must follow a certain pattern
        - The file's name should follow a pattern of `<Your Component's Name>.test.(js|jsx|ts|tsx)`

#### Cannot Use Import Statement Outside a Module <a name="cant_use_import"></a>
*Author: Daniel*

This is an error with either your babel or jest configuration so here are some things to try.
- Create the babel.config.js and jest.config.js files
- Set up the babel.config.js and jest.config.js files
    - Your jest file will probably need the preset, transform, and moduleFileExtensions keys
    - Your babel file will probably need the presets key and a preset of 'babel-preset-expo'
- Ensure that package.json doesn't contain anything saying `type: module`
- Ensure that you don't have a .babelrc file

#### Unexpected Token <a name="unexpected_token"></a>
*Author: Daniel*

This error is generally caused by one of a few things
- You are missing a necessary preset/plugin in babel.config.js
- You are missing a necessary transform/transformIgnorePatterns regex pattern in jest.config.js
- You are missing a mock in the \_\_mocks\_\_ folder, in the jest_setup.js file, or in your individual test file
    - Determining which is dependent on what you are mocking and whether it is needed by multiple test files. I recommend checking the library's recommendations for jest testing when deciding.

#### Unable to Find an Element <a name="unable_find_element"></a>
*Author: Daniel*

This error often comes with a message like "placeholder: <>" or is associated with functions like getByText, getById, or toBeInTheDocument. This can be caused by a massive number of things such as the exact text pattern or id not existing in the original component. You may also be having an import issue. Due to the many possible causes, I recommend checking the .snap file as your first step in troubleshooting. If the .snap file only contains `exports[<YourComponent/> renders correctly 1] = <YourComponent />;` or simply does not contain the desired text/placeholder/id, then you know your issue lies with the rendering process. I would recommend looking at some of the other sections which focus on rendering issues.

#### Snap File is Mostly Empty <a name="empty_snap_file"></a>
*Author: Daniel*

If you ended up in this section, you likely encountered the following text in the .snap file.
~~~jsx
exports[`<YourComponent/> renders correctly 1`] = `<YourComponent />`;
~~~

While this error is generally caused by the same thing, start by adding a console.log() function to the component that you are trying to test. In all likelihood, the console.log won't be triggered, and you won't see the message because of an import issue. Your IDE may also mark your import statement as unused or the component in the render function as not associated with a specific import.

If you see any of that, you are having an import issue. Check the import statement, import path, and the capitalization of the component. Making the first letter of each word uppercase in accordance with a CamelCase pattern is shockingly effective at fixing issues. "viewCrops" often won't work, but "ViewCrops" will work without any other changes.

#### Expected String or Class/Function But Got Undefined <a name="undefined_not_string_class"></a>
*Author: Daniel*

This is a long error message which makes it difficult to parse. Here is the important part:
~~~bash
Expected a string (for built-in components) or a class/function (for composite components) but got: undefined. 
You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports
~~~

This is going to come down to one of two issues: circular imports or named/default import confusion. There is a separate section covering the distinction between named and default imports. Using the wrong one will often cause this error. Alternatively, circular imports can cause this issue. Let us say that you are testing File A which depends on File B. File B imports something from File C while File C also imports something from File B. This is a circular import.

#### Error About Act Wrapping <a name="act_wrapping"></a>
*Author: Daniel*

You are probably getting an error or warning along the following lines:
~~~jsx
When testing, code that causes React state updates should be wrapped into act(...):
     
     act(() => {
       /* fire events that update state */
     });
     /* assert on the output */
     
This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
~~~

In general, the React Native testing library has already bundled act into its APIs, like the render function. This is done because act is necessary for the test environment to operate like the user environment. Basically, the act function makes sure that the code to render and update React components is properly handled in the call stack. Despite the fact that the library already bundles in act, act still may need to be added manually.

##### Case 1: Asynchronous Updates
If the page being tested is asynchronously updated, then it will trigger the act wrapping error. When the asynchronous update comes back, the setter hook will be triggered, but at this moment, the update will happen outside of React’s call stack. To fix it, before any assertions, wait for the component update to fully complete by using `waitFor`. `waitFor` is an API provided by React testing library to wait for the wrapped assertions to pass within a certain timeout window.

##### Case 2: Jest Fake Timers
You can encounter this issue if the component being tested uses setTimeout or setInterval and you are using Jest’s fake timers to manipulate time. In this case, the unit test has no idea that advancing timers will cause component updates which triggers the error. To fix this, just wrap Jest’s timer manipulations in an act block, so that the test will know advancing time will cause the component to update.

##### Case 3: Premature Exit
In this case, the error can occur when the test prematurely exits before the components finish rendering or updating. This generally occurs when there is a Loading state or a REST fetch. Basically, the test exits before the loading state finishes and data is retrieved. To fix it, just wait for the rendering and updates to be done with `waitFor` or `waitForElementToBeRemoved`.
~~~jsx
expect(getByText("Loading ...")).toBeInTheDocument();
await waitFor(() => {
    expect(queryByText("Loading ...")).not.toBeInTheDocument();
});

await waitForElementToBeRemoved(() => queryByText("Loading ..."));
~~~

##### Case 4: Formik Updates
Like Case 3, Case 4 is a variant of Case 1. In this case, the test simulates events to change values in form inputs like changing the value in a text input. If the form input is managed by Formik, your test will have a chance to run into this error. Just like Case 1, you can solve it by just waiting for it to complete.

## Tools & Resources <a name="tools"></a>

## Logs & Records <a name="logs"></a>

## Appendices <a name="appendices"></a>
### Appendix A: Understanding React Native <a name="react_native"></a>
#### File Types <a name="file_types"></a>
*Author: Daniel*

In React Native, there are 4 possible file types or extensions: js, jsx, ts, and tsx. Technically, the jsx and tsx extensions are completely optional and unnecessary as the Babel transpiler doesn't care. However, they help the IDE to understand what you are doing to better highlight stuff and makes it easier for later developers to understand whether you are using pure JavaScript or are mixing in some of the extended features like XML-style component tags (like `<Component />`).

The distinction between js and ts is far more significant. The js(x) files represent JavaScript while the ts(x) files contain TypeScript. JavaScript does not care about variable data types at all. In comparison, the TypeScript files will not compile if there is a type issue. TypeScript also implements some restrictions on how variables are referenced, declared, and passed. Interestingly, at compilation, the TypeScript is transformed into JavaScript before Babel transpiles it into native code.
#### Class Vs. Functional Components <a name="component_types"></a>
*Author: Daniel*

All React Native components fit one of these two categories. Class components extend the React Component class and are considered JavaScript ES2015/ES6 classes. In comparison, functional/stateless/pure components are defined as functions saved as a constant. The official documentation recommends that functional components should be used where possible as they are easier to read, test, and maintain. 

~~~jsx
class ClassComp extends Component { 
    render () { 
        return ( 
            <Text>Hello World!</Text> 
        ) 
    } 
} 

const FuncComp = () => { 
    return ( 
       <Text>Hello World!</Text> 
    ); 
} 
~~~

Class components can access React lifecycle methods like render, along with state/prop functionality from the parent Component class. As such, they often serve as container components to handle state management and wrap child components. Since they can lifecycle methods on their own, hooks will not work in a class component ever, even when indirectly called by a class component. Since they predate functional components and are good for handling complex logic, class components possess far more extensive and useful documentation. 

Functional components do not manage their own state nor have access to the lifecycle methods provided by React Native. If you want to define props, they are specified in the parentheses like parameters. Functional components are just JavaScript functions that return JSX, which is HTML-like rendering commands. To handle state updates and user interactions, they must use hooks or call a class component. Due to their lightweight nature and minimal overhead, functional components are faster than class components. 

If you want to use that component as a tag in other files, make sure that the final line in the file reads `export default Home`, or whatever name you assigned to the component. 

#### Import Types <a name="import_types"></a>
*Author: Daniel*

In React Native, there are 2 kinds of imports: named and default. Multiple named exports can be made in the same file, but only one default export can occur in each file. Named exports must be imported with curly braces while importing a default export with curly braces would trigger an error. Here is what named exports and imports would look like:
~~~jsx
export const Component2 = () => {
    return (<></>)
}
export const Component1 = () => {
    return (<></>)
}
//Import Here
import { Component1, Component2 } from "./MyModule"
~~~

In contrast, a default export and import would look like this:
~~~jsx
const Component = () => {
    return <></>
}
export default Component;
//Import Here
import Component from "./MyModule"
~~~

#### Inter-Page Routing <a name="routing"></a>
*Author: Daniel*

The CropAlly app uses the [expo-router library](https://docs.expo.dev/router/navigating-pages/) and the index.js file. The index.js file determines the default page when a user opens up the app for the first time. To specify the page, import the page component and then call the component in the Page function’s return statement. For example, the following code in index.js makes the Home page into the default page. 

~~~jsx
import Home from './home.jsx' 

export default function Page() { 
  return ( 
    <Home/> 
  ); 
} 
~~~

Besides being versatile, this library is bundled with Expo which is also the library that we use to access our emulator. The Link tag exists to navigate between the app’s pages. However, this tag has limited options and can only be implemented in specific situations. As such, I recommend utilizing the router function instead. 

The router object has 6 available functions: navigate, push, replace, back, canGoBack, and setParams. Before describing the functions, I want to quickly mention that Expo Router uses a stack to track all pages that have been loaded or displayed. The navigate function only pushes a new page if the new route is different, ignoring the search parameters and the hash. Otherwise, the current screen rerenders with the new parameters. If you navigate to a route that is in the history, the stack will pop any pages to that route. The push function always pushes the new page on to the top of the stack and displays it. You can push the current route multiple times or with new parameters. The replace function pops the current page before pushing the new page, making it useful for redirects. The back function pops the current page and displays the page below the current one in the stack. The canGoBack function returns true only if a valid page history stack exists and if the current page can be popped. The setParams function can update the query parameters for the currently selected page. 

The Expo Router library will automatically generate statically typed routes for any new files in the app/ folder. As such, you can use a route immediately after creating the page’s file. The route is always the file’s full name, except for the file extension. 

### Appendix B: Glossary <a name="b_glossary"></a>
- Adaptive Maintenance: maintenance tasks after a change in the operating environment such as the OS, language, hardware, or compliance requirements; in most cases, this kind of maintenance cannot be scheduled and will not occur on a regular basis
- Corrective Maintenance: maintenance tasks to identify, isolate, and repair/mitigate bugs and risks after they have been discovered; this kind of maintenance is generally performed when a bug is discovered though the patches may be released on a set schedule rather than the moment that it is done
- Integration Test: while a unit test focuses on a single function or class, an integration test ensures that a limited number of components, functions, and classes are able to work together in a certain context
- Perfective Maintenance: maintenance tasks to improve the user's experience and the software's performance by adding new features, removing unnecessary features, and optimizing algorithms in accordance with market needs and forces; perfective maintenance is always performed on a schedule, albeit infrequently <a name="perfective_maintenance"></a>
- Preventative Maintenance: maintenance tasks to proactively prevent future failures; preventative maintenance is always performed on a regular schedule
- Reflective Maintenance: see [Perfective Maintenance](#perfective_maintenance)
- Routine Maintenance: maintenance tasks that are planned and regularly performed in accordance with a set schedule
- System Test: this test focuses on testing something specific across every aspect of the system; for example, a system test might test input sanitization for every input field across the entire app
- Unit Test: this test focuses on testing the functionality of a single function, class, or component; ensures that each individual part works before trying to combine them which allows issues to be isolated
- Usability Test: this test focuses on asking the user to perform certain tasks and assessing whether they are capable of achieving this task in a reasonable amount of time
- User Acceptance Test (UAT): this test focuses on the user's experience and whether the client is content with the product rather than how usable the product is
