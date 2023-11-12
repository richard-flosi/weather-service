# /api/weather

This endpoint provides the current weather report for the given query using a `GET` request
with data provided by [Open Weather API](https://openweathermap.org/api/).

# Query Parameters

## method

One of `lat-lon`, `city-state`, or `zip-country`.

### method: lat-lon

When `method` is set to `lat-lon` additional fields are required:

- `lat`: Latitude from -90 to 90
- `lon`: Longitude from -180 to 180

### method: city-state

When `method` is set to `city-state` additional fields are required:

- `city`: The name of a city. e.g `Chicago`
- `state`: The 2 letter state code. e.g. `IL` (only required when country is `US`)
- `country`: The 2 letter country code. e.g. `US`

### method: zip-country

When `method` is set to `zip-country` additional fields are required:

- `zip`: The 5 digit zip code. e.g `32712`
- `country`: The 2 letter country code. e.g. `US`

# Response

Possible responses include 200 OK with a weather object,
400 Bad Request with an `error` message, or
500 Internal Server Error with an `error` message.

## 200 OK

Example `weather` object response:

```
{
  lat: 33,
  lon: -99,
  timezone: "America/Chicago",
  timezone_offset: -21600,
  current: {
    dt: 1699824704,
    sunrise: 1699794225,
    sunset: 1699832199,
    temp: 291.96,
    feels_like: 291.36,
    pressure: 1023,
    humidity: 56,
    dew_point: 283.01,
    uvi: 0.64,
    clouds: 100,
    visibility: 10000,
    wind_speed: 2.69,
    wind_deg: 94,
    wind_gust: 2.3,
    weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
  },
  alerts: [
    {
      sender_name: "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
      event: "Small Craft Advisory",
      start: 1684952747,
      end: 1684988747,
      description: "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
      tags: []
    }
  ],
  summary: { feels: "Cold" }
}
```

## 400 Bad Request

Example Bad Request response:

```
{
  error: "Invalid method: undefined"
}
```

### 500 Internal Server Error

Example Internal Server Error response:

```
{
  error: "Internal Server Error"
}
```
