import axios from 'axios';

const BASE_URL = 'https://api.ambientweather.net/v1';

//Timestamp of last request
//Must be global
let lastRequestTime = 0;
//Enforce rate limit of 1 request per second
const rateLimiter = (func) => {
  return (...args) => {
    const now = Date.now();
    if (now - lastRequestTime < 1000) { // 1000 ms = 1 second
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
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export { fetchWeatherData };