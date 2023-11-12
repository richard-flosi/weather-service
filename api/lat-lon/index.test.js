import assert from "node:assert";
import { describe, it, before, after, mock } from "node:test";
import { handler } from "./index.js";

describe("GET /api/lat-lon 200 OK", () => {
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
  it("should return error when lat or lon are missing", async () => {
    const response = await handler({ queryStringParameters: { lat: 44, lon: 99 } });
    assert.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, expectedData);
  });
});

describe("GET /api/lat-lon 400 BadRequest", () => {
  it("should return error when lat or lon are missing", async () => {
    const response = await handler({ queryStringParameters: {} });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lat and lon are required" });
  });

  it("should return error when lat is invalid", async () => {
    const response = await handler({ queryStringParameters: { lat: 999, lon: 99 } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lat must be a number between -90 and 90" });
  });

  it("should return error when lon is invalid", async () => {
    const response = await handler({ queryStringParameters: { lat: 45, lon: 999 } });
    assert.equal(response.statusCode, 400);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "lon must be a number between -180 and 180" });
  });
});

describe("GET /api/lat-lon 500 Internal Server Error", () => {
  before(() => {
    mock.method(global, "fetch", () => {
      throw new Error("Unexpected fetch error");
    });
  });
  after(() => {
    mock.reset();
  });
  it("should return error when lat or lon are missing", async () => {
    const response = await handler({ queryStringParameters: { lat: 44, lon: 99 } });
    assert.equal(response.statusCode, 500);
    const data = JSON.parse(response.body);
    assert.deepEqual(data, { error: "Internal Server Error" });
  });
});
