/****
 * @author Daniel Moreno
 * @reviewer
 * @tester 
 ***/

import React from "react";
import {
    render,
    waitFor,
    screen,
    fireEvent,
} from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
import {cleanText, cleanNumbers} from '../assets/sanitizer.jsx'

describe('cleanText', () => {
    test('Anteater', ()=> {
        txt = "about an anteater a o'brian -- test"
        expect(cleanText(txt, noStopwords=false)).toMatch("about an anteater a o'brian  test") 
        expect(cleanText(txt, noStopwords=true)).toMatch("anteater obrian test") 
    })

    test('Alter', ()=> {
        txt = "ALALTERTER"
        expect(cleanText(txt, noStopwords=true)).toMatch("alalterter") 
        expect(cleanText(txt, noStopwords=false, noSQL=true)).toMatch("") 
    })

    test('OR', ()=> {
        txt = "' OR 1=1"
        expect(cleanText(txt, noStopwords=true)).toMatch("11") 
    })

    test('John mail', ()=> {
        txt = "john@mail' OR '1' = '1 --"
        expect(cleanText(txt, noStopwords=true)).toMatch("johnmail 1 1") 
        expect(cleanText(txt, noSQL=true)).toMatch("johnmail 1 1") 
        expect(cleanText(txt, noSQL=true, noStopwords=true)).toMatch("johnmail 1 1") 
    })
})

describe('cleanNumbers', () => {
    test('56834 without params', ()=> {
        test = "056834"
        expect(cleanNumbers(test)).toMatch("056834") 
        test = "abcd056834abcd"
        expect(cleanNumbers(test)).toMatch("056834") 
    }) 
    test('56834 with extra minuses', ()=> {
        test = "-56834"
        expect(cleanNumbers(test)).toMatch("-56834") 
        test = "--56834"
        expect(cleanNumbers(test)).toMatch("56834") 
        test = "---56834"
        expect(cleanNumbers(test)).toMatch("-56834") 
        test = "5------68--34"
        expect(cleanNumbers(test)).toMatch("56834") 
        test = "568---34"
        expect(cleanNumbers(test)).toMatch("56834") 
        test = "-568---34"
        expect(cleanNumbers(test)).toMatch("-56834") 
    }) 
    test('56834 with periods', ()=> {
        test = "56.834"
        expect(cleanNumbers(test)).toMatch("56.834") 
        test = "56."
        expect(cleanNumbers(test)).toMatch("56") 
        test = ".834"
        expect(cleanNumbers(test)).toMatch("834") 
    })
    test('With params', ()=> {
        test = "56.834"
        expect(cleanNumbers(test, decimalsAllowed=false)).toMatch("56834") 
        test = "-5.68--34"
        expect(cleanNumbers(test, decimalsAllowed=true, negativesAllowed=false)).toMatch("5.6834") 
    })
})