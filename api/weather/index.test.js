import assert from "node:assert";
import { describe, it, before, after, mock } from "node:test";
import { handler } from "./index.js";

describe("GET /api/weather?method=lat-lon&lat=44&lon=99 200 OK", () => {
  const expectedData = {
    lat: 44,
    lon: 99,
    timezone: "Asia/Ulaanbaatar",
    timezone_offset: 28800,
    current: {
      dt: 1699755691,
      sunrise: 1699748047,
      sunset: 1699783329,
      temp: 269.18,
      feels_like: 264.75,
      pressure: 1042,
      humidity: 28,
      dew_point: 254.97,
      uvi: 0.26,
      clouds: 100,
      visibility: 10000,
      wind_speed: 3.13,
      wind_deg: 111,
      wind_gust: 4.31,
      weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
    },
  };
  before(() => {
    mock.method(global, "fetch", () => {
      return {
        json: () => {
          return expectedData;
        },
        status: 200,
      };
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return weather for valid method, lat, and lon", async () => {
    const response = await handler({ queryStringParameters: { method: "lat-lon", lat: 44, lon: 99 } });
    assert.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, expectedData);
  });
});

describe("GET /api/weather?method=city-state&city=Chicago&state=IL&country=US 200 OK", () => {
  const expectedLatLon = [
    {
      name: "Chicago",
      local_names: {},
      lat: 41.8755616,
      lon: -87.6244212,
      country: "US",
      state: "Illinois",
    },
  ];
  const expectedWeather = {
    lat: 41.8756,
    lon: -87.6244,
    timezone: "America/Chicago",
    timezone_offset: -21600,
    current: {
      dt: 1699810018,
      sunrise: 1699792573,
      sunset: 1699828391,
      temp: 284.42,
      feels_like: 282.8,
      pressure: 1029,
      humidity: 46,
      dew_point: 273.23,
      uvi: 1.83,
      clouds: 20,
      visibility: 10000,
      wind_speed: 6.17,
      wind_deg: 200,
      wind_gust: 10.29,
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
    },
  };
  before(() => {
    mock.method(global, "fetch", (url) => {
      if (url.startsWith("http://api.openweathermap.org/geo/1.0/direct")) {
        return {
          json: () => {
            return expectedLatLon;
          },
          status: 200,
        };
      } else if (url.startsWith("https://api.openweathermap.org/data/3.0/onecall")) {
        return {
          json: () => {
            return expectedWeather;
          },
          status: 200,
        };
      }
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return weather for valid method, city, state, and country", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state", city: "Chicago", state: "IL", country: "US" } });
    assert.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, expectedWeather);
  });
});

describe("GET /api/weather?method=city-state&city=London&country=GB 200 OK", () => {
  const expectedLatLon = [
    {
      name: "London",
      local_names: {},
      lat: 51.5073219,
      lon: -0.1276474,
      country: "GB",
      state: "England",
    },
  ];
  const expectedWeather = {
    lat: 51.5073,
    lon: -0.1276,
    timezone: "Europe/London",
    timezone_offset: 0,
    current: {
      dt: 1699811469,
      sunrise: 1699773161,
      sunset: 1699805800,
      temp: 282.01,
      feels_like: 280.96,
      pressure: 1002,
      humidity: 90,
      dew_point: 280.46,
      uvi: 0,
      clouds: 20,
      visibility: 10000,
      wind_speed: 2.06,
      wind_deg: 120,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n",
        },
      ],
      rain: {
        "1h": 0.28,
      },
    },
  };
  before(() => {
    mock.method(global, "fetch", (url) => {
      if (url.startsWith("http://api.openweathermap.org/geo/1.0/direct")) {
        return {
          json: () => {
            return expectedLatLon;
          },
          status: 200,
        };
      } else if (url.startsWith("https://api.openweathermap.org/data/3.0/onecall")) {
        return {
          json: () => {
            return expectedWeather;
          },
          status: 200,
        };
      }
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return weather for valid method, city, and country", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state", city: "London", country: "GB" } });
    assert.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, expectedWeather);
  });
});

describe("GET /api/weather?method=zip-country&zip=32712&country=US 200 OK", () => {
  const expectedLatLon = [
    {
      zip: "32712",
      name: "Orange County",
      lat: 28.712,
      lon: -81.5136,
      country: "US",
    },
  ];
  const expectedWeather = {
    lat: 28.712,
    lon: -81.5136,
    timezone: "America/New_York",
    timezone_offset: -18000,
    current: {
      dt: 1699810204,
      sunrise: 1699789585,
      sunset: 1699828445,
      temp: 296.16,
      feels_like: 296.94,
      pressure: 1021,
      humidity: 93,
      dew_point: 294.97,
      uvi: 4.98,
      clouds: 100,
      visibility: 10000,
      wind_speed: 0.45,
      wind_deg: 346,
      wind_gust: 2.24,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
    },
  };
  before(() => {
    mock.method(global, "fetch", (url) => {
      if (url.startsWith("http://api.openweathermap.org/geo/1.0/zip")) {
        return {
          json: () => {
            return expectedLatLon;
          },
          status: 200,
        };
      } else if (url.startsWith("https://api.openweathermap.org/data/3.0/onecall")) {
        return {
          json: () => {
            return expectedWeather;
          },
          status: 200,
        };
      }
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return weather for valid method, zip, and country", async () => {
    const response = await handler({ queryStringParameters: { method: "zip-country", zip: "32712", country: "US" } });
    assert.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, expectedWeather);
  });
});

describe("GET /api/weather 400 BadRequest", () => {
  it("should return error when method is invalid", async () => {
    const response = await handler({ queryStringParameters: {} });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Invalid method: undefined" });
  });
});

describe("GET /api/weather?method=lat-lon 400 BadRequest", () => {
  it("should return error when lat or lon are missing", async () => {
    const response = await handler({ queryStringParameters: { method: "lat-lon" } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lat and lon are required" });
  });

  it("should return error when lat is invalid", async () => {
    const response = await handler({ queryStringParameters: { method: "lat-lon", lat: 999, lon: 99 } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lat must be a number between -90 and 90" });
  });

  it("should return error when lon is invalid", async () => {
    const response = await handler({ queryStringParameters: { method: "lat-lon", lat: 45, lon: 999 } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lon must be a number between -180 and 180" });
  });
});

describe("GET /api/weather?method=city-state 400 BadRequest", () => {
  it("should return error when city, state, and/or country are missing", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state" } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "city, state, and/or country are required" });
  });

  it("should return error when city, state, and/or country are missing", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state", country: "US" } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "city, state, and country are required" });
  });
});

describe("GET /api/weather?method=zip-country 400 BadRequest", () => {
  it("should return error when zip or country are missing", async () => {
    const response = await handler({ queryStringParameters: { method: "zip-country" } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "zip and country are required" });
  });
});

describe("GET /api/weather 500 Internal Server Error", () => {
  before(() => {
    mock.method(global, "fetch", () => {
      throw new Error("Unexpected fetch error");
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return error when fetch fails for lat-lon", async () => {
    const response = await handler({ queryStringParameters: { method: "lat-lon", lat: 44, lon: 99 } });
    assert.equal(response.statusCode, 500);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Internal Server Error" });
  });

  it("should return error when fetch fails for city-state", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state", city: "Chicago", state: "IL", country: "US" } });
    assert.equal(response.statusCode, 500);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Internal Server Error" });
  });

  it("should return error when fetch fails for zip-country", async () => {
    const response = await handler({ queryStringParameters: { method: "zip-country", zip: "32712", country: "US" } });
    assert.equal(response.statusCode, 500);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Internal Server Error" });
  });
});

describe("GET /api/weather?method=city-state&city=Chicago&state=IL&country=US 500 Internal Server Error", () => {
  const expectedLatLon = [];
  before(() => {
    mock.method(global, "fetch", () => {
      return {
        json: () => {
          return expectedLatLon;
        },
        status: 200,
      };
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return error when lat, lon not found", async () => {
    const response = await handler({ queryStringParameters: { method: "city-state", city: "Chicago", state: "IL", country: "US" } });
    assert.equal(response.statusCode, 500);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Internal Server Error" });
  });
});
