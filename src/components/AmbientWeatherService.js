import axios from 'axios';

//Use the following URL to get a list of all devices:
//https://private-anon-f9255d0157-ambientweather.apiary-proxy.com/v1/devices?apiKey=1&applicationKey=2

//List of fields that MAY be returned depending on the device
//https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs

//List of used URLs
const BASE_URL = 'https://api.ambientweather.net/v1';
//Hex code for mock server may change over time as it is a free service provided by Apiary for Ambient Weather subscribers
//To Update: visit https://ambientweather.docs.apiary.io/, Switch to Console, select Query Device Data, provide necessary params, set to Mock Server, Call Resource, copy the base URL in the listed call
const BASE_MOCK_URL = 'https://private-anon-f9255d0157-ambientweather.apiary-mock.com/v1' 

//Timestamp of last request
//Must be global
let lastRequestTime = 0;
//Enforce rate limit of 1 request per second with slight gap to avoid AW's rate limiter
const rateLimiter = (func) => {
  return (...args) => {
    const now = Date.now();
    if (now - lastRequestTime < 1050) { // 1000 ms = 1 second
      console.warn("Rate limit exceeded, skipping request.");
      return Promise.resolve(null); // Ignore request and resolve with null
    }
    lastRequestTime = now;
    return func(...args);
  };
};

// Fetch data for a specific device or location with rate limiter function wrapping it to enforce limiting per Ambient Weather API rules
const fetchWeatherData = rateLimiter(async (apiKey, appKey, deviceMacAddress) => {
  try {
    //Use axios to make a REST request to the API for the data of a specific device
    const response = await axios.get(
      `${BASE_URL}/devices/${deviceMacAddress}`,
      {
        params: {
          apiKey: apiKey,
          applicationKey: appKey,
        },
        timeout: 1000
      }
    );

    //this if is only true if the GET succeeded (so app/api keys are valid & so is MAC) but no data was returned by the device
    if (!Array.isArray(response.data) || !response.data.length) {
      console.log("Mock called because device not reporting")
      const mockResponse = await axios.get(
        `${BASE_URL}/devices`,
        {
          params: {
            apiKey: apiKey,
            applicationKey: appKey,
          },
          timeout: 1000
        }
      );
      console.log("response retrieved")
      
      return mockResponse.data
    } else{ 
      return response.data;
    }
    
  } catch (error) {
    console.warn(error.data)
    if (!error.data) {
      throw "request failed";
    } else if (error._response) { //status code not in 2xx range
      throw error._response;
    } else if (error._request) { //no response received for request
      throw error._request;
    }else { //error when setting up request
      throw error._message;
    }
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { fetchWeatherData, sleep };