# Project 1-1: CropAlly Maintenance Procedures Manual (MPM)

![Smaller Project Logo](./images/152x152.png "Concept by McKenna, Layout and Colors by Daniel, Actual Art by Analisa Moreno")

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
 - Projected Finish Date: 25 Nov. 2024



## Table of Contents
1. [Introduction](#intro)
   1. [Purpose of Project](#project_purpose)
   1. [Purpose of MPM & Document Conventions](#mpm_purpose)
   1. [Client Overview & Intended Audience](#audience)
1. [Brief System Overview](#brief_overview)
1. [In-Depth System Overview](#indepth_overview)
   1. [Home Page](#indepth_home)
      1. [General Weather Forecast](#weather_forecast)
   1. [Components & Assets](#components_n_assets)
      1. [Rows & Columns](#grid)
1. [Installation & Setup](#setup)
1. [Maintenance Tasks](#maint)
   1. [Adding a New Page](#add_page)
      1. [Adding Dark Mode](#add_dark_mode)
      1. [Expanding the Navbar](#expand_navbar)
1. [Troubleshooting](#trblsht)
1. [Tools & Resources](#tools)
1. [Logs & Records](#logs)
1. [Appendices](#appendices)
   1. [Appendix A: Understanding React Native](#react_native)
      1. [Class Vs. Functional Components](#component_types)
      1. [Inter-Page Routing](#routing)

## Introduction <a name="intro"></a>
### Purpose of Project <a name="project_purpose"></a>
*Author: Daniel, Tyler*

The purpose of CropHero is to provide an accessible, easy-to-use mobile app for small-scale and hobbyist farmers. They should be able to record, track, and visualize crop data including days since planting, height, and other helpful information for growing crops and caring for livestock. The product will also act to aggregate data within the community for better yields and collaboration. 
### Purpose of MPM & Document Conventions  <a name="mpm_purpose"></a>
*Author: Daniel*

The Maintenance Procedures Manual is a formal document that establishes the general structure of the CropAlly application and general procedures to support it in the future. While conciseness is a consideration, rigor and detail is this document’s priority. By doing so, future maintainers and developers can achieve an exhaustive understanding of the CropAlly application. This helps ensure effective support without time wasted as they try to understand their predecessors' efforts. 

It is recommended that developers and maintainers expand the MPM while contributing to the code. This helps to ensure that the MPM is thorough and contains all relevant information. In addition, this can be considered an extension of rubber duck debugging. By explaining the logic behind your code as you write it, you should be able to identify potential problems. 

Each chapter in the document will be marked by a high-level header which will be Level 2. Section headers will be marked by a Level 3 header. Each subsequent header will be marked by a higher level header. Only the top three headers will be included in the table of contents: the chapter, section, and subsection headers.
### Client Overview & Intended Audience <a name="audience"></a>
*Author: Daniel*

The client is Zina Townley, a current product owner and release train engineer at L3Harris Technologies. Also, she is a former Scrum master, application support manager, IT manager, and programmer analyst. She and her husband created the Ashby-Browning Family Scholarship in Engineering at UNT. Importantly for this application, she is a hobbyist farmer who owns 11 acres. This marks her as a Lifestyle user according to our user class definitions. 

This maintenance manual is meant to help the client and any future developers on this project. The MPM will help the developers to understand the project's structure as they are onboarded. In addition, the MPM will provide details regarding any maintenance tasks, troubleshooting tips, and useful resources for those developers.

## Brief System Overview <a name="brief_overview"></a>

## In-Depth System Overview <a name="indepth_overview"></a>
### Home Page <a name="indepth_home"></a>
#### General Weather Forecast <a name="weather_forecast"></a>
*Author: Daniel*

At the top of the Home page is a bar with 7 icons on it and an abbreviated day of the week underneath each icon. Within the page’s functional component is a useEffect hook, the hook that allows for asynchronous requests. First, I call a getGridpoints function which converts a zipcode into gridpoints that can be understood by the National Weather Service’s API. This function checks the passed zipcode against a dictionary that I created. I found the USPS zipcode database and then used a Python script to create a dictionary of lat-long coordinates with the zipcodes functioning as keys. The lat-long coordinates are sent to the NWS API to receive the gridpoints. 

Afterwards, I pass the gridpoints to the NWS API and fetch the weather forecast based on that. If the first forecast date is labelled as This Afternoon, then I store the forecast information for today and the next 6 days in 7 state variables. If the first forecast date is labelled as Tonight, I store the forecast information for 7 days, starting with the next day. Since this is a farming app, this process will always ignore night-time forecasts. 

At render, the forecast information and day name are passed to 7 WeatherIcon components. The forecast information gets passed to a function in WeatherTypes.jsx. The function takes the shortened forecast, gets rid of anything after the “then” as that is in the future, and evaluates the text. Unfortunately, the NWS API has never established a standardized list of potential values, much to the annoyance of a lot of people. As such, substantial research was done by Group 7 to determine the general terms that they use and to condense them down into 10 categories: Clear (0-10% cloud coverage), a Few Clouds (10-30% cloud coverage), Partly Cloudy (30-60% cloud coverage), Mostly Cloudy (60-90% cloud coverage), Overcast (90-100% cloud coverage), Rainy, Stormy, Snowy (includes sleet and hail), Misty (includes drizzling and foggy), and Dusty. The terms are combined into enumerations that are treated as regex to evaluate the forecast. This passes the image’s URI from the Icons constant list. Additional details are added to the evaluated result if the forecast includes the terms Slight Chance (0-30% chance), Chance (30-60% chance), or Likely (60-80%). Slight Chance is given an opacity of 0.4 and Chance is given an opacity of 0.7. If any of the chance indicators are found, a black/white percent sign (based on dark mode setting) is added to the forecast icon, and styling is used to ensure that it overlaps with the forecast icon. 

### Components & Assets <a name="components_n_assets"></a>
#### Rows & Columns <a name="grid"></a>
*Author: Daniel*

The rows and columns defined in the Grid.jsx file are special assets created to improve the dynamic rendering of pages for multiple screen sizes. To use it, you will need to import it using `import { Col, Row } from '../assets/Grid.jsx'`. When you first open the file, you will probably notice that there is a functional component named Column and a constant called Col, the same word that you would import. Since multiple tags were being exported, the default exports technique could not be used, resulting in the multiple names within the Grid.jsx file (Column vs. Col). 

Starting with the Row tag, it can take three props with height being the most important and the only mandatory one. Then, the Row tag wraps all of its contents and children in a special View tag. The View tag has an array of styles with the later styles being able to overwrite the earlier ones. The styles just set up the flexDirection (necessary for it to work), then whatever style was passed as a prop, and finally the height. The height thing works because it will include the value of the prop in the height style value if the height prop contains a value. Look at [this page on conditional rendering](https://legacy.reactjs.org/docs/conditional-rendering.html) for more on that. 

The columns do something similar but use trick favored by this file’s author to dynamically specify a style based on the prop. The special quote character (ASCII 96 or `) ensures that the variables are expanded out before being stored as a string to specify which style should be applied. 

All columns must be placed into a row. All rows must be placed in a grid container which has a style attribute of flex. The value for flex must be the largest sum of all values passed to the `relativeColsCovered` by all of the columns in each row. So long as the sum of all values in a row are less than or equal to the flex value, each column will be given a width based on the percentage of screen that they are given in the `relativeColsCovered` prop. If 3 columns are all given a `relativeColsCovered` value of 1 or all given a 3, each column would take up 33% of the screen’s width. If all but one of the three columns had a value of 1 and the last column had a value of 5, then the earlier columns would take up 14% of the screen, and the last column would take up 71% of the screen. Since Group 7 was most familiar with Bootstrap, most implementations of the Rows and Cols will have a flex value of 12. 

### Search Bar
## Installation & Setup <a name="setup"></a>

## Maintenance Tasks <a name="maint"></a>
### Adding a New Page <a name="add_page"></a>
#### Adding Dark Mode <a name="add_dark_mode"></a>
*Author: Daniel*

Ah, so you wish to add Dark Mode to your new page. To begin, please add the following imports to the top of your file. 

~~~
import { useState, useEffect } from 'react'; 
import { Appearance } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
~~~

I will assume that you are using a functional component. As such, you can use the useState and useEffect hooks to fetch the current Dark Mode setting. 

~~~
const [isDarkMode, setIsDarkMode] = useState(false) 

useEffect(() => { 
  // declare the async data fetching function 
  const fetchDarkModeSetting = async () => { 
    const JSON_VALUE = await AsyncStorage.getItem('dark_mode_setting'); 
    let result = null 
    if (JSON_VALUE) { 
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

~~~
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

~~~
<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor={isDarkMode ? Colors.ALMOST_BLACK: Colors.WHITE_SMOKE}/> 
<NavBar profileSelected darkMode={isDarkMode}/> 
~~~

#### Expanding the NavBar <a name="expand_navbar"></a>
*Author: Daniel*

The NavBar consists of 3 rows with the first row existing solely to create the green circle in the center. The second row contains the icons while the third row contains the label text. You will need to add a new column to all 3 rows, ensuring all of them are the same size. The row and column structure means that each icon is given a percentage of the available space. 

First, create a new prop to indicate whether your page is selected, and set the default value to false. When you add a new portion to the navbar, you will be using the AppButton component. The icon row should have an empty title prop and specify an icon. Use the ternary operator to change the icon and color depending on whether the page is selected, as indicated by your new prop. The selected color should be MALACHITE while the unselected color should be SPANISH GREEN. The text row should have a filled title prop with your page’s label and without any specified icon. Use the ternary operator again to swap between `styles.selectedText` and `styles.unselectedText` based on your new prop. Finally, set the onPress prop for your new buttons, making sure to use the replace function. For example, the onPress value for the profile page would be `onPress={() => router.replace('/profile')}`, taking you to the page defined in profile.jsx. 

## Troubleshooting <a name="trblsht"></a>

## Tools & Resources <a name="tools"></a>

## Logs & Records <a name="logs"></a>

## Appendices <a name="appendices"></a>
### Appendix A: Understanding React Native <a name="react_native"></a>
#### Class Vs. Functional Components <a name="component_types"></a>
*Author: Daniel*

All React Native components fit one of these two categories. Class components extend the React Component class and are considered JavaScript ES2015/ES6 classes. In comparison, functional/stateless/pure components are defined as functions saved as a constant. The official documentation recommends that functional components should be used where possible as they are easier to read, test, and maintain. 

~~~
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

#### Inter-Page Routing <a name="routing"></a>
*Author: Daniel*

The CropAlly app uses the [expo-router library](https://docs.expo.dev/router/navigating-pages/) and the index.js file. The index.js file determines the default page when a user opens up the app for the first time. To specify the page, import the page component and then call the component in the Page function’s return statement. For example, the following code in index.js makes the Home page into the default page. 

~~~
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