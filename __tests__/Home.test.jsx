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
import Home from "../app/home"
import {WeatherIcon, getGridpoints} from "../assets/HomeWeatherFunctions"
import Colors from "../assets/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import * as Font from 'expo-font';
jest.useFakeTimers();

jest.mock('expo-font', ()=>({
    useFonts: jest.fn(),
    loadAsync: jest.fn().mockResolvedValue(true),
    isLoaded: jest.fn(()=>true)
}))

describe('Light Mode <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "false");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Dark Mode <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "true");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('No Async <Home/>', () =>{
    beforeEach(async () => {
        await AsyncStorage.setItem("dark_mode_setting", "");
        Font.useFonts.mockReturnValue([true, false])
        const [fontsLoaded, fontError] = Font.useFonts()
        expect(fontsLoaded).toBe(true)
        expect(fontError).toBe(false)
    });

    test('renders correctly', () =>{
        const tree = render(<Home/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Weather Unit Tests <Home/>', () =>{
    test('WeatherIcon renders correctly with no chance', () =>{
        const tree = render(<WeatherIcon />).toJSON();
        expect(tree).toMatchSnapshot();
        const tree2 = render(<WeatherIcon forecastVal={"a few clouds"} isDarkMode={true}/>).toJSON();
        expect(tree2).toMatchSnapshot();
        const tree3 = render(<WeatherIcon forecastVal={"partly cloudy"}/>).toJSON();
        expect(tree3).toMatchSnapshot();
        const tree4 = render(<WeatherIcon forecastVal={"mostly cloudy"}/>).toJSON();
        expect(tree4).toMatchSnapshot();
        const tree5 = render(<WeatherIcon forecastVal={"overcast"}/>).toJSON();
        expect(tree5).toMatchSnapshot();
        const tree6 = render(<WeatherIcon forecastVal={"drizzle"}/>).toJSON();
        expect(tree6).toMatchSnapshot();
        const tree7 = render(<WeatherIcon forecastVal={"dust storm"}/>).toJSON();
        expect(tree7).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with slight chance', () =>{
        const tree = render(<WeatherIcon forecastVal={"slight chance rain"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with chance', () =>{
        const tree = render(<WeatherIcon forecastVal={"chance snow"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('WeatherIcon renders correctly with likely', () =>{
        const tree = render(<WeatherIcon forecastVal={"likely thunderstorm"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('valid gridpoints for provided zipcode', async () => {
        data = await getGridpoints("76131");
        expectedData = {"gridpoint": "FWD/69,108", "status": 200}
        expect(data).toStrictEqual(expectedData);

        data = await getGridpoints("1");
        expectedData = {"gridpoint": "", "status": 406}
        expect(data).toStrictEqual(expectedData);
    });
})


describe('Test weather forecast fetching', () => {
    beforeEach(() => {
        fetchMock.doMock()
        fetchMock.resetMocks()
    })
  
    const fakeWeatherResultsDay = {
        "@context": [
            "https://geojson.org/geojson-ld/geojson-context.jsonld",
            {
                "@version": "1.1",
                "wx": "https://api.weather.gov/ontology#",
                "geo": "http://www.opengis.net/ont/geosparql#",
                "unit": "http://codes.wmo.int/common/unit/",
                "@vocab": "https://api.weather.gov/ontology#"
            }
        ],
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -97.356942000000004,
                        32.874359900000002
                    ],
                    [
                        -97.356473800000003,
                        32.851741700000005
                    ],
                    [
                        -97.329549,
                        32.852132600000004
                    ],
                    [
                        -97.330011799999994,
                        32.874750900000002
                    ],
                    [
                        -97.356942000000004,
                        32.874359900000002
                    ]
                ]
            ]
        },
        "properties": {
            "units": "us",
            "forecastGenerator": "BaselineForecastGenerator",
            "generatedAt": "2024-10-12T21:01:01+00:00",
            "updateTime": "2024-10-12T19:53:16+00:00",
            "validTimes": "2024-10-12T13:00:00+00:00/P8DT6H",
            "elevation": {
                "unitCode": "wmoUnit:m",
                "value": 213.05520000000001
            },
            "periods": [
                {
                    "number": 1,
                    "name": "This Afternoon",
                    "startTime": "2024-10-12T16:00:00-05:00",
                    "endTime": "2024-10-12T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 97,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "15 mph",
                    "windDirection": "SSW",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 97, with temperatures falling to around 94 in the afternoon. South southwest wind around 15 mph, with gusts as high as 25 mph."
                },
                {
                    "number": 2,
                    "name": "Tonight",
                    "startTime": "2024-10-12T18:00:00-05:00",
                    "endTime": "2024-10-13T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 67,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear. Low around 67, with temperatures rising to around 69 overnight. South wind around 10 mph."
                },
                {
                    "number": 3,
                    "name": "Sunday",
                    "startTime": "2024-10-13T06:00:00-05:00",
                    "endTime": "2024-10-13T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 98,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "WSW",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 98, with temperatures falling to around 96 in the afternoon. West southwest wind around 10 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 4,
                    "name": "Sunday Night",
                    "startTime": "2024-10-13T18:00:00-05:00",
                    "endTime": "2024-10-14T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 63,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "N",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear. Low around 63, with temperatures rising to around 65 overnight. North wind 5 to 10 mph."
                },
                {
                    "number": 5,
                    "name": "Columbus Day",
                    "startTime": "2024-10-14T06:00:00-05:00",
                    "endTime": "2024-10-14T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 83,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 15 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 83, with temperatures falling to around 81 in the afternoon. Northeast wind 5 to 15 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 6,
                    "name": "Monday Night",
                    "startTime": "2024-10-14T18:00:00-05:00",
                    "endTime": "2024-10-15T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 58,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear, with a low around 58. Northeast wind around 5 mph."
                },
                {
                    "number": 7,
                    "name": "Tuesday",
                    "startTime": "2024-10-15T06:00:00-05:00",
                    "endTime": "2024-10-15T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 86,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 86. Northeast wind 5 to 10 mph."
                },
                {
                    "number": 8,
                    "name": "Tuesday Night",
                    "startTime": "2024-10-15T18:00:00-05:00",
                    "endTime": "2024-10-16T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 54,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "ENE",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear, with a low around 54. East northeast wind around 10 mph."
                },
                {
                    "number": 9,
                    "name": "Wednesday",
                    "startTime": "2024-10-16T06:00:00-05:00",
                    "endTime": "2024-10-16T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 74,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "E",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 74. East wind 10 to 15 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 10,
                    "name": "Wednesday Night",
                    "startTime": "2024-10-16T18:00:00-05:00",
                    "endTime": "2024-10-17T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 54,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "ESE",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear, with a low around 54."
                },
                {
                    "number": 11,
                    "name": "Thursday",
                    "startTime": "2024-10-17T06:00:00-05:00",
                    "endTime": "2024-10-17T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 80,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 80."
                },
                {
                    "number": 12,
                    "name": "Thursday Night",
                    "startTime": "2024-10-17T18:00:00-05:00",
                    "endTime": "2024-10-18T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 58,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear, with a low around 58."
                },
                {
                    "number": 13,
                    "name": "Friday",
                    "startTime": "2024-10-18T06:00:00-05:00",
                    "endTime": "2024-10-18T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 82,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": "Mostly sunny, with a high near 82."
                },
                {
                    "number": 14,
                    "name": "Friday Night",
                    "startTime": "2024-10-18T18:00:00-05:00",
                    "endTime": "2024-10-19T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 63,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 20
                    },
                    "windSpeed": "15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/night/sct/tsra_hi,20?size=medium",
                    "shortForecast": "Partly Cloudy then Slight Chance Showers And Thunderstorms",
                    "detailedForecast": "Chance of precipitation is 20%."
                }
            ]
        }
    }

    const fakeWeatherResultsNight = {
        "@context": [
            "https://geojson.org/geojson-ld/geojson-context.jsonld",
            {
                "@version": "1.1",
                "wx": "https://api.weather.gov/ontology#",
                "geo": "http://www.opengis.net/ont/geosparql#",
                "unit": "http://codes.wmo.int/common/unit/",
                "@vocab": "https://api.weather.gov/ontology#"
            }
        ],
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -97.356942000000004,
                        32.874359900000002
                    ],
                    [
                        -97.356473800000003,
                        32.851741700000005
                    ],
                    [
                        -97.329549,
                        32.852132600000004
                    ],
                    [
                        -97.330011799999994,
                        32.874750900000002
                    ],
                    [
                        -97.356942000000004,
                        32.874359900000002
                    ]
                ]
            ]
        },
        "properties": {
            "units": "us",
            "forecastGenerator": "BaselineForecastGenerator",
            "generatedAt": "2024-10-12T21:01:01+00:00",
            "updateTime": "2024-10-12T19:53:16+00:00",
            "validTimes": "2024-10-12T13:00:00+00:00/P8DT6H",
            "elevation": {
                "unitCode": "wmoUnit:m",
                "value": 213.05520000000001
            },
            "periods": [
                {
                    "number": 1,
                    "name": "Tonight",
                    "startTime": "2024-10-12T18:00:00-05:00",
                    "endTime": "2024-10-13T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 67,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear. Low around 67, with temperatures rising to around 69 overnight. South wind around 10 mph."
                },
                {
                    "number": 2,
                    "name": "Sunday",
                    "startTime": "2024-10-13T06:00:00-05:00",
                    "endTime": "2024-10-13T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 98,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "WSW",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 98, with temperatures falling to around 96 in the afternoon. West southwest wind around 10 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 3,
                    "name": "Sunday Night",
                    "startTime": "2024-10-13T18:00:00-05:00",
                    "endTime": "2024-10-14T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 63,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "N",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear. Low around 63, with temperatures rising to around 65 overnight. North wind 5 to 10 mph."
                },
                {
                    "number": 4,
                    "name": "Columbus Day",
                    "startTime": "2024-10-14T06:00:00-05:00",
                    "endTime": "2024-10-14T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 83,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 15 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 83, with temperatures falling to around 81 in the afternoon. Northeast wind 5 to 15 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 5,
                    "name": "Monday Night",
                    "startTime": "2024-10-14T18:00:00-05:00",
                    "endTime": "2024-10-15T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 58,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear, with a low around 58. Northeast wind around 5 mph."
                },
                {
                    "number": 6,
                    "name": "Tuesday",
                    "startTime": "2024-10-15T06:00:00-05:00",
                    "endTime": "2024-10-15T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 86,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 86. Northeast wind 5 to 10 mph."
                },
                {
                    "number": 7,
                    "name": "Tuesday Night",
                    "startTime": "2024-10-15T18:00:00-05:00",
                    "endTime": "2024-10-16T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 54,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "ENE",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear, with a low around 54. East northeast wind around 10 mph."
                },
                {
                    "number": 8,
                    "name": "Wednesday",
                    "startTime": "2024-10-16T06:00:00-05:00",
                    "endTime": "2024-10-16T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 74,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "E",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 74. East wind 10 to 15 mph, with gusts as high as 20 mph."
                },
                {
                    "number": 9,
                    "name": "Wednesday Night",
                    "startTime": "2024-10-16T18:00:00-05:00",
                    "endTime": "2024-10-17T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 54,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 mph",
                    "windDirection": "ESE",
                    "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                    "shortForecast": "Clear",
                    "detailedForecast": "Clear, with a low around 54."
                },
                {
                    "number": 10,
                    "name": "Thursday",
                    "startTime": "2024-10-17T06:00:00-05:00",
                    "endTime": "2024-10-17T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 80,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 80."
                },
                {
                    "number": 11,
                    "name": "Thursday Night",
                    "startTime": "2024-10-17T18:00:00-05:00",
                    "endTime": "2024-10-18T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 58,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
                    "shortForecast": "Mostly Clear",
                    "detailedForecast": "Mostly clear, with a low around 58."
                },
                {
                    "number": 12,
                    "name": "Friday",
                    "startTime": "2024-10-18T06:00:00-05:00",
                    "endTime": "2024-10-18T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 82,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": "Mostly sunny, with a high near 82."
                },
                {
                    "number": 13,
                    "name": "Friday Night",
                    "startTime": "2024-10-18T18:00:00-05:00",
                    "endTime": "2024-10-19T06:00:00-05:00",
                    "isDaytime": false,
                    "temperature": 63,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 20
                    },
                    "windSpeed": "15 mph",
                    "windDirection": "SSE",
                    "icon": "https://api.weather.gov/icons/land/night/sct/tsra_hi,20?size=medium",
                    "shortForecast": "Partly Cloudy then Slight Chance Showers And Thunderstorms",
                    "detailedForecast": "A slight chance of showers and thunderstorms after 1am. Partly cloudy, with a low around 63. Chance of precipitation is 20%."
                },
                {
                    "number": 14,
                    "name": "Saturday",
                    "startTime": "2024-10-19T16:00:00-05:00",
                    "endTime": "2024-10-20T18:00:00-05:00",
                    "isDaytime": true,
                    "temperature": 97,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "windSpeed": "15 mph",
                    "windDirection": "SSW",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny. High near 97, with temperatures falling to around 94 in the afternoon. South southwest wind around 15 mph, with gusts as high as 25 mph."
                },
            ]
        }
    }

    test('renders with daytime weather', async () => {
        fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeWeatherResultsDay) })

        const tree = render(<Home />).toJSON();
        await expect(tree).toMatchSnapshot();
    })
  
    test('renders with nighttime weather', async () => {
        fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeWeatherResultsNight) })


    })
})