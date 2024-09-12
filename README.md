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
#### Cannot Open Emulator
 1. Open Android Studio
 2. Go to the SDK manager in the Tools menu
 3. Update your installation of the Android API (cannot be one of the "ext-" APIs)
     * It will be installed & updated if you see a checkmark rather than an empty box or a minus sign
 4. Go to the SDK Tools tab
 5. Make sure that you have installed and updated Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools
     * It will be installed & updated if you see a checkmark rather than an empty box or a minus sign
#### Emulator Says "The system UI isn't responding"
 1. Open Android Studio
 2. Go to the Device Manager
 3. Click the vertical meatball menu (the 3 dots) for your emulator
 4. Select Wipe Data
 5. Click the pencil icon for your emulator
 6. Click the button labeled Show Advanced Settings
 7. Go to Emulated Performance section
     * Set Graphics to Hardware
     * Enable Multi-Core CPU, if you can
     * Set the Multi-Core CPU value to larger than 2, if you can
     * Set Boot Option to Cold Boot
 8. Go to the Memory and Storage section
     * Increase the available RAM
#### Emulator Says "Something went wrong. Can't connect to Internet."
 1. Close the two Expo tabs on the phone
 2. Click the Expo icon on the home screen
 3. Re-enter 'a' in the command line
 4. Keep doing this until it works. Sometimes it can take 3-4 tries
#### Emulator Reloads When I Try to Type 'R' Into an Input Field
 1. Wait for the emulator to reload
 2. Go back to that page
 3. Type in the values more slowly or use the emulator's keyboard. If you type with the keyboard too quickly, the emulator can't register it so the value gets sent to the command line which interprets it as a reload command.
#### Error due to Different Number of Hooks Between Renders
 1. Find all return statements within an if-else block or a loop (called conditional returns)
 2. Find all instances of the useState() and useEffect() functions
 3. Move all instances of the useState() and useEffect() functions before any conditional returns