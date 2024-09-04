import icons from "./icons/Icons"

/*
NWS hopes to create proper codes eventually
Possibly based on WMO codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM

Current sources:
    - https://www.weather.gov/forecast-icons/
    - https://api.weather.gov/icons
    - https://graphical.weather.gov/xml/xml_fields_icon_weather_conditions.php
    - https://github.com/weather-gov/api/discussions/453
    - https://github.com/ktrue/NWS-forecast/blob/ccdfc4b0acf2598a1d9c5d500267be6362b6e0d5/advforecast2.php#L1747
*/

enum WeatherTypes {
    //0-10% cloud coverage
    Clear = 'fair|clear|sunny|fair with haze|clear with haze|sunny with haze|fair and breezy|sunny and breezy|clear and breezy|fair and windy|clear and windy',
    //10-30% cloud coverage
    FewClouds = 'a few clouds|a few clouds with haze|a few clouds and breezy|mostly sunny|mostly clear',
    //30-60% cloud coverage
    PartlyCloudy = 'partly cloudy|partly cloudy with haze|partly cloudy and breezy|partly sunny|partly clear',
    //60-90% cloud coverage
    MostlyCloudy = 'mostly cloudy|mostly cloudy with haze|mostly cloudy and breezy',
    //90-100% cloud coverage
    Overcast = 'overcast|overcast with haze|overcast and breezy',
    Snow = 'snow|light snow|heavy snow|snow showers|light snow showers|heavy snow showers|showers snow|light showers snow|heavy showers snow|snow fog|snow mist|light snow fog|heavy snow fog|light snow mist|heavy snow mist|light snow showers fog|heavy snow showers fog|light snow showers mist|heavy snow showers mist|snow fog|light snow fog|heavy snow fog|snow showers fog|light snow showers fog|heavy snow showers fog|showers in vicinity snow|snow showers in vicinity|snow showers in vicinity fog|snow showers in vicinity mist|snow showers in vicinity fog|low drifting snow|blowing snow|snow low drifting snow|snow blowing snow|light snow low drifting snow|light snow blowing snow|light snow blowing snow fog|light snow blowing snow mist|heavy snow low drifting snow|heavy snow blowing snow|thunderstorm snow|light thunderstorm snow|heavy thunderstorm snow|snow grains|light snow grains|heavy snow grains|heavy blowing snow|blowing snow in vicinity',
    RainSnow = 'rain snow|light rain snow|heavy rain snow|snow rain|light snow rain|heavy snow rain|drizzle snow|light drizzle snow|heavy drizzle snow|snow drizzle|light snow drizzle|heavy drizzle snow',
    RainIcePellets = 'rain sleet|rain ice pellets|light rain ice pellets|heavy rain ice pellets|drizzle ice pellets|light drizzle ice pellets|heavy drizzle ice pellets|ice pellets rain|light ice pellets rain|heavy ice pellets rain|ice pellets drizzle|light ice pellets drizzle|heavy ice pellets drizzle',
    FreezingRain = 'wintry mix|freezing rain|freezing drizzle|light freezing rain|light freezing drizzle|heavy freezing rain|heavy freezing drizzle|freezing rain in vicinity|freezing drizzle in vicinity',
    FreezingRainRain = 'flurries|freezing fog|freezing rain rain|light freezing rain rain|heavy freezing rain rain|rain freezing rain|light rain freezing rain|heavy rain freezing rain|freezing drizzle rain|light freezing drizzle rain|heavy freezing drizzle rain|rain freezing drizzle|light rain freezing drizzle|heavy rain freezing drizzle',
    FreezingRainSnow = 'frost|ice fog|freezing rain snow|light freezing rain snow|heavy freezing rain snow|freezing drizzle snow|light freezing drizzle snow|heavy freezing drizzle snow|snow freezing rain|light snow freezing rain|heavy snow freezing rain|snow freezing drizzle|light snow freezing drizzle|heavy snow freezing drizzle',
    IcePellets = 'sleet|ice crystals|ice pellets|light ice pellets|heavy ice pellets|ice pellets in vicinity|showers ice pellets|thunderstorm ice pellets|ice crystals|hail|small hail|small snow pellets|light small hail|light small snow pellets|heavy small hail|heavy small snow pellets|showers hail|hail showers',
    SnowIcePellets = 'snow sleet|snow ice pellets',
    LightRain = 'light rain|drizzle|light drizzle|heavy drizzle|light rain fog|drizzle fog|light drizzle fog|heavy drizzle fog|light rain mist|drizzle mist|light drizzle mist|heavy drizzle mist|light rain fog|drizzle fog|light drizzle fog|heavy drizzle fog',
    Rain = 'rain|heavy rain|rain fog|heavy rain fog|rain mist|heavy rain mist|rain fog|heavy rain hog',
    RainShowers = 'rain showers|showers|light rain showers|light rain and breezy|heavy rain showers|rain showers in vicinity|light showers rain|heavy showers rain|showers rain|showers rain in vicinity|rain showers fog|light rain showers fog|heavy rain showers fog|rain showers in vicinity fog|light showers rain fog|heavy showers rain fog|showers rain fog|showers rain in vicinity fog|rain showers mist|light rain showers mist|heavy rain showers mist|rain showers in vicinity mist|light showers rain mist|heavy showers rain mist|showers rain mist|showers rain in vicinity mist',
    //<60% cloud coverage
    VicinityShowers = 'showers in vicinity|showers in vicinity fog|showers in vicinity mist|showers in vicinity fog|showers in vicinity haze',
    //>75% cloud coverage
    Thunderstorm = 'thunderstorm|showers and thunderstorms|thunderstorm rain|light thunderstorm rain|heavy thunderstorm rain|thunderstorm rain fog|light thunderstorm rain fog|heavy thunderstorm rain fog|thunderstorm rain mist|light thunderstorm rain mist|heavy thunderstorm rain mist|heavy thunderstorm rain fog and windy|thunderstorm showers in vicinity|light thunderstorm rain haze|heavy thunderstorm rain haze|thunderstorm fog|light thunderstorm rain fog|heavy thunderstorm rain fog|thunderstorm light rain|thunderstorm heavy rain|thunderstorm rain fog|thunderstorm light rain fog|thunderstorm heavy rain fog|thunderstorm rain mist|thunderstorm light rain mist|thunderstorm heavy rain mist|thunderstorm in vicinity fog|thunderstorm in vicinity mist|thunderstorm showers in vicinity|thunderstorm in vicinity haze|thunderstorm haze in vicinity|thunderstorm light rain haze|thunderstorm heavy rain haze|thunderstorm fog|thunderstorm light rain fog|thunderstorm heavy rain fog|thunderstorm hail|light thunderstorm rain hail|heavy thunderstorm rain hail|thunderstorm rain hail fog|thunderstorm rain hail mist|light thunderstorm rain hail fog|heavy thunderstorm rain hail fog|light thunderstorm rain hail mist|heavy thunderstorm rain hail hail|thunderstorm showers in vicinity hail|light thunderstorm rain hail haze|heavy thunderstorm rain hail haze|thunderstorm hail fog|light thunderstorm rain hail fog|heavy thunderstorm rain hail fog|thunderstorm light rain hail|thunderstorm heavy rain hail|thunderstorm rain hail fog|thunderstorm rain hail mist|thunderstorm light rain hail fog|thunderstorm heavy rain hail fog|thunderstorm light rain hail mist|thunderstorm heavy rain hail mist|thunderstorm in vicinity hail|thunderstorm in vicinity hail haze|thunderstorm haze in vicinity hail|thunderstorm light rain hail haze|thunderstorm heavy rain hail haze|thunderstorm hail fog|thunderstorm light rain hail fog|thunderstorm heavy rain hail fog|thunderstorm small hail|thunderstorm rain small hail|thunderstorm small snow pellets|thunderstorm rain small snow pellets|light thunderstorm rain small hail|heavy thunderstorm rain small hail|light thunderstorm rain small snow pellets|heavy thunderstorm rain small snow pellets',
    //60-75% cloud coverage
    ThunderstormVicinityMostly = 'thunderstorm in vicinity',
    //<60% cloud coverage
    ThunderstormVicinityPartly = 'thunderstorm in vicinity|thunderstorm in vicinity fog|thunderstorm in vicinity haze',
    Tornado = 'tornado|funnel cloud|funnel cloud in vicinity|tornado|water spout',
    Smoke = 'smoke|ash',
    Dust = 'dust|low drifting dust|drifting dust|blowing dust|sand|blowing sand|low drifting sand|dust whirls|sand whirls|dust storm|heavy dust storm|dust storm in vicinity|sand storm|heavy sand storm|sand storm in vicinity',
    Haze = 'haze',
    Hot = 'hot',
    Cold = 'cold',
    Blizzard = 'blizzard',
    Fog = 'fog|mist|freezing fog|shallow fog|partial fog|patches of fog|patchy fog|dense fog|fog in vicinity|freezing fog in vicinity|shallow fog in vicinity|partial fog in vicinity|patches of fog in vicinity|showers in vicinity fog|light freezing fog|heavy freezing fog',
}

enum HighLvlWeatherTypes {
    //0-10% cloud coverage
    Clear = "" + WeatherTypes.Clear + "|" + WeatherTypes.Hot,
    //10-30% cloud coverage
    FewClouds = "" + WeatherTypes.FewClouds,
    //30-60% cloud coverage
    PartlyCloudy = "" + WeatherTypes.PartlyCloudy,
    //60-90% cloud coverage
    MostlyCloudy = "" + WeatherTypes.MostlyCloudy,
    //90-100% cloud coverage
    Overcast = "" + WeatherTypes.Overcast,
    //Rain, Showers
    Rainy = "" + WeatherTypes.RainSnow + "|" + WeatherTypes.RainIcePellets + "|" + WeatherTypes.Rain + "|" + WeatherTypes.RainShowers + "|" + WeatherTypes.VicinityShowers,
    //Thunderstorms, Tornado, Blizzard
    Stormy = "" + WeatherTypes.Thunderstorm + "|" + WeatherTypes.ThunderstormVicinityMostly + "|" + WeatherTypes.ThunderstormVicinityPartly + "|" + WeatherTypes.Tornado + "|" + WeatherTypes.Blizzard,
    //Snow, Freezing Rain, Sleet, Haill
    Snowy = "" + WeatherTypes.Snow + "|" + WeatherTypes.FreezingRain + "|" + WeatherTypes.FreezingRainRain + "|" + WeatherTypes.FreezingRainSnow + "|" + WeatherTypes.IcePellets + "|" + WeatherTypes.SnowIcePellets + "|" + WeatherTypes.Cold,
    //Drizzle, Fog
    Misty = "" + WeatherTypes.LightRain + "|" + WeatherTypes.Fog,
    //Dust, Sand, Smoke, Haze
    Dusty = "" + WeatherTypes.Dust + "|" + WeatherTypes.Smoke + "|" + WeatherTypes.Haze,
}

enum Probabilities {
    Likely = "likely|probable",
    Chance = "chance|possible",
    SlightChance = "slight chance",
}

export function getWeatherIcon(forecastDesc) {
    //define some variables
    const valuesWeather = Object.values(HighLvlWeatherTypes)
    const keysWeather = Object.keys(HighLvlWeatherTypes)
    const valuesProb = Object.values(Probabilities)
    const keysProb = Object.keys(Probabilities)
    let regexPattern = null
    let matchedKeyWeather = -1
    let matchedKeyProb = -1

    if (!forecastDesc) {
        console.log("forecastDesc was null")
        return [icons.weather_clear_gold, "None"]
    }

    //get just the stuff before 'then', and remove any spaces or capitals
    let currentWeather = "" + forecastDesc.split("then")[0].trim().toLowerCase() + ""

    //see if forecastDesc matches any of the weather types for each category in the enum
    valuesWeather.forEach((value, index) =>{
        regexPattern = new RegExp("(" + value + ")")
        if (regexPattern.test(currentWeather)) {
            matchedKeyWeather = index
        }
    })
    //check probability level for the weather
    valuesProb.forEach((value, index) =>{
        regexPattern = new RegExp("(" + value + ")")
        if (regexPattern.test(currentWeather)) {
            matchedKeyProb = index
        }
    })

    let image_url = ""
    if (matchedKeyWeather < 0) {
        image_url = icons.weather_clear_gold
    }
    else {
        switch(keysWeather[matchedKeyWeather]) { 
            case "Clear": { 
                image_url = icons.weather_clear_gold
                break; 
            } 
            case "FewClouds": { 
                image_url = icons.weather_fewclouds_yellow
                break; 
            } 
            case "PartlyCloudy": { 
                image_url = icons.weather_partlycloudy_yellowgray
                break; 
            } 
            case "MostlyCloudy": { 
                image_url = icons.weather_mostlycloudy_lightgray
                break; 
            }
            case "Overcast": { 
                image_url = icons.weather_overcast_gray
                break; 
            }
            case "Rainy": { 
                image_url = icons.weather_rainy_blue
                break; 
            }
            case "Stormy": { 
                image_url = icons.weather_stormy_bluegray
                break; 
            }
            case "Snowy": { 
                image_url = icons.weather_snowy_gray
                break; 
            }
            case "Misty": { 
                image_url = icons.weather_misty_bluegray
                break; 
            }
            case "Dusty": { 
                image_url = icons.weather_dusty_darkbrown
                break; 
            }
            default: { 
                image_url = icons.weather_clear_gold
                break; 
            } 
        } 
    }    

    let probability_val = ""
    if (matchedKeyProb < 0) {
        probability_val = "None"
    }
    else {
        switch(keysProb[matchedKeyProb]) { 
            case "SlightChance": { 
                probability_val = "Slight"
                break; 
            } 
            case "Chance": { 
                probability_val = "Chance"
                break; 
            } 
            case "Likely": { 
                probability_val = "Likely"
                break; 
            } 
            default: { 
                probability_val = "None"
                break; 
            } 
        } 
    }

    return [image_url, probability_val]
}