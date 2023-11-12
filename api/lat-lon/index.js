const { OPEN_WEATHER_MAP_API_KEY } = process.env;

export async function handler(request) {
  const lat = parseFloat(request.queryStringParameters.lat);
  const lon = parseFloat(request.queryStringParameters.lon);

  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    if (lat < -90 || lat > 90) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "lat must be a number between -90 and 90" }),
      };
    } else if (lon < -180 || lon > 180) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "lon must be a number between -180 and 180" }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "lat and lon are required" }),
    };
  }

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
}
