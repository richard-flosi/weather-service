const { OPEN_WEATHER_MAP_API_KEY } = process.env;

function validateQueryStringParameters(queryStringParameters) {
  const lat = parseFloat(queryStringParameters.lat);
  const lon = parseFloat(queryStringParameters.lon);

  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    if (lat < -90 || lat > 90) {
      throw new Error("lat must be a number between -90 and 90");
    } else if (lon < -180 || lon > 180) {
      throw new Error("lon must be a number between -180 and 180");
    } else {
      return { lat, lon };
    }
  } else {
    throw new Error("lat and lon are required");
  }
}

export async function handler(request) {
  try {
    const validated = validateQueryStringParameters(request.queryStringParameters);
    const { lat, lon } = validated;
    try {
      const exclude = "minutely,hourly,daily";
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
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
    // console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
