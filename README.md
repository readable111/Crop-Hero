# Crop-Hero
CSCE 4901/4905 Capstone course Group 7's Github
<<<<<<< HEAD

## Group Members 
=======
Members: 
>>>>>>> e71000cf20ddfeaa3d7aeafac2763158211a52d3
  * McKenna Beard
  * Daniel Moreno
  * Tyler Bowen
  * Matthew Bustamente
  * Isaac Boodt
  * Chandler Garrett

<<<<<<< HEAD
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
#### Expo-CLI is deprecated
 1. Open a terminal with admin privileges
 2. Enter `npm install -g yarn`
 3. Change the working directory to the base Crop-Hero directory (use `cd` or `pushd`)
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
=======
IMPORTANT: After pulling from the main branch forthe first time, run npm install in order to install dependencies
**************BEFORE ADDING A NEW FEATURE/EDITING CODE FROM MAIN BRANCH************
Please check out a new branch in order to develop your feature, and the push to that branch rather than master. When your feature is complete you can open a pull request to merge your code into the main branch
>>>>>>> e71000cf20ddfeaa3d7aeafac2763158211a52d3
