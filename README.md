# Crop-Hero
### Version 0.0.0
CSCE 4902/4925 Capstone course Group 7's Github
## Group Members 
Members: 
  * McKenna Beard
  * Daniel Moreno
  * Tyler Bowen
  * Matthew Bustamente
  * Isaac Boodt
  * Chandler Garrett

## Tracking the App Version
When a new version of the app is released, please update the value stored in package.json and the value stored in this README file. The program will retrieve the value from package.json using the following code.
 * **React Native:** `var pkg = require('../package.json')` followed by `const softwareVersion = pkg.version`

## IMPORTANT: Branch Management
IMPORTANT: After pulling from the main branch for the first time, run npm install in order to install dependencies
**************BEFORE ADDING A NEW FEATURE/EDITING CODE FROM MAIN BRANCH************
Please check out a new branch in order to develop your feature, and the push to that branch rather than master. When your feature is complete you can open a pull request to merge your code into the main branch

## Running the Emulator
 1. Open a command line in the base Crop-Hero directory
 2. Enter `npx expo start`
 3. After the menu options have been printed, enter `a` to open the Android emulator

## Troubleshooting
Assumes that you are using a Windows operating system
#### Expo-CLI is Deprecated
 1. Open a terminal with admin privileges
 2. Enter `npm install -g yarn`
 3. Change the working directory to the base Crop-Hero directory (use `cd`, not `pushd` as that can cause issues)
 4. Enter `yarn add expo`
#### Error due to Different Number of Hooks Between Renders
 1. Find all return statements within an if-else block or a loop (called conditional returns)
 2. Find all instances of the useState() and useEffect() functions
 3. Move all instances of the useState() and useEffect() functions before any conditional returns