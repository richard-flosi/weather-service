const { OPEN_WEATHER_MAP_API_KEY } = process.env;

export async function handler(request) {
  try {
    const { method, lat, lon, city, state, zip, country } = sanitizeAndValidateInputs(request.queryStringParameters);
    try {
      const data = await getWeather({ method, lat, lon, city, state, zip, country });
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      // console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

function sanitizeAndValidateInputs({ method, lat, lon, city, state, zip, country }) {
  switch (method) {
    case "lat-lon": {
      return {
        method,
        lat,
        lon,
        city,
        state,
        zip,
        country,
        ...sanitizeAndValidateInputsForLatLon({ lat, lon }),
      };
    }
    case "city-state": {
      return {
        method,
        lat,
        lon,
        city,
        state,
        zip,
        country,
        ...sanitizeAndValidateInputsForCityState({ city, state, country }),
      };
    }
    case "zip-country": {
      return {
        method,
        lat,
        lon,
        city,
        state,
        zip,
        country,
        ...sanitizeAndValidateInputsForZipCountry({ zip, country }),
      };
    }
    default: {
      throw new Error(`Invalid method: ${method}`);
    }
  }
}

function sanitizeAndValidateInputsForLatLon({ lat, lon }) {
  const latFloat = parseFloat(lat);
  const lonFloat = parseFloat(lon);

  if (Number.isFinite(latFloat) && Number.isFinite(lonFloat)) {
    if (latFloat < -90 || latFloat > 90) {
      throw new Error("lat must be a number between -90 and 90");
    } else if (lonFloat < -180 || lonFloat > 180) {
      throw new Error("lon must be a number between -180 and 180");
    } else {
      return { lat: latFloat, lon: lonFloat };
    }
  } else {
    throw new Error("lat and lon are required");
  }
}

function sanitizeAndValidateInputsForCityState({ city, state, country }) {
  if (country === "US") {
    if (city && state) {
      return { city, state, country };
    } else {
      throw new Error("city, state, and country are required");
    }
  } else if (city && country) {
    return { city, state, country };
  } else {
    throw new Error("city, state, and/or country are required");
  }
}

function sanitizeAndValidateInputsForZipCountry({ zip, country }) {
  if (zip && country) {
    return { zip, country };
  } else {
    throw new Error("zip and country are required");
  }
}

async function getWeather({ method, lat, lon, city, state, zip, country }) {
  try {
    switch (method) {
      case "lat-lon": {
        return await getWeatherByLatLon({ lat, lon });
      }
      case "city-state": {
        return await getWeatherByCityState({ city, state, country });
      }
      case "zip-country": {
        return await getWeatherByZipCountry({ zip, country });
      }
    }
  } catch (error) {
    throw error;
  }
}

async function getWeatherByCityState({ city, state, country }) {
  try {
    const { lat, lon } = await getLatLonByCityState({ city, state, country });
    const data = await getWeatherByLatLon({ lat, lon });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getWeatherByZipCountry({ zip, country }) {
  try {
    const { lat, lon } = await getLatLonByZipCountry({ zip, country });
    const data = await getWeatherByLatLon({ lat, lon });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getLatLonByCityState({ city, state, country }) {
  try {
    const limit = 1;
    const q = country === "US" ? `${city},${state},${country}` : `${city},${country}`;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length === 1) {
      return data[0];
    } else {
      throw new Error(`Not Found: ${q}`);
    }
  } catch (error) {
    throw error;
  }
}

async function getLatLonByZipCountry({ zip, country }) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length === 1) {
      return data[0];
    } else {
      throw new Error(`Not Found: ${q}`);
    }
  } catch (error) {
    throw error;
  }
}

async function getWeatherByLatLon({ lat, lon }) {
  try {
    const exclude = "minutely,hourly,daily";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
