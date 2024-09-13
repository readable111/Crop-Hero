# CropAlly Maintenance Procedures Manual (MPM)
## Project 1-1

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
   1. [Understanding React Native](#react_native)
      1. [Class Vs. Functional Components](#component_types)
      1. [Inter-Page Routing](#routing)
1. [Installation & Setup](#setup)
1. [Maintenance Tasks](#maint)
1. [Troubleshooting](#trblsht)
1. [Tools & Resources](#tools)
1. [Logs & Records](#logs)
1. [Appendices](#appendices)

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
### Understanding React Native <a name="react_native"></a>
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

## Installation & Setup <a name="setup"></a>

## Maintenance Tasks <a name="maint"></a>

## Troubleshooting <a name="trblsht"></a>

## Tools & Resources <a name="tools"></a>

## Logs & Records <a name="logs"></a>

## Appendices <a name="appendices"></a>