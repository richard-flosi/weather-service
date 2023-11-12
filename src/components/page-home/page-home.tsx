import { Component, Fragment, h, State } from "@stencil/core";

@Component({
  tag: "page-home",
})
export class PageHome {
  @State() method: "lat-lon" | "city-state" | "zip-code" = "lat-lon";
  @State() weather: {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: {
      dt: number;
      sunrise: number;
      sunset: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [{ id: number; main: string; description: string; icon: string }];
    };
  } = null;

  lat: number = null;
  lon: number = null;

  city: string = null;
  state: string = null;

  zipCode: number = null;

  async checkWeather() {
    const url = `/api/lat-lon?lat=${this.lat}&lon=${this.lon}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      this.weather = data;
    } else {
      alert(`Error: ${data.error}`);
    }
  }

  render() {
    return (
      <ion-content color="light">
        <organism-header></organism-header>

        <ion-grid fixed>
          <ion-row className="ion-align-items-center ion-justify-content-center">
            <ion-col size="auto">
              <ion-img src="/assets/icon/icon.png" alt="Weather Service" />
            </ion-col>
          </ion-row>

          <ion-row className="ion-align-items-center ion-justify-content-center">
            <ion-col size="12">
              <ion-select
                value={this.method}
                onIonChange={(event) => {
                  this.method = event.detail.value;
                }}
                fill="outline"
                interface="popover"
                label="Check Weather By"
                labelPlacement="stacked"
                placeholder="Select a method for checking the weather"
              >
                <ion-select-option value="lat-lon">Latitude & Longitude</ion-select-option>
                <ion-select-option value="city-state">City, State</ion-select-option>
                <ion-select-option value="zip-code">Zip Code</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>

          {this.method === "lat-lon" && (
            <ion-row className="ion-align-items-center ion-justify-content-center">
              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.lat}
                  onIonChange={(event) => {
                    this.lat = event.detail.value;
                  }}
                  type="number"
                  fill="outline"
                  labelPlacement="stacked"
                  label="Latitude"
                  placeholder="33.44"
                  helperText="Latitude, decimal (-90; 90)."
                  min={-90}
                  max={90}
                  clearInput
                ></ion-input>
              </ion-col>

              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.lon}
                  onIonChange={(event) => {
                    this.lon = event.detail.value;
                  }}
                  type="number"
                  fill="outline"
                  labelPlacement="stacked"
                  label="Longitude"
                  placeholder="-94.04"
                  helperText="Longitude, decimal (-180; 180)."
                  min={-180}
                  max={180}
                  clearInput
                ></ion-input>
              </ion-col>
            </ion-row>
          )}

          {this.method === "city-state" && (
            <ion-row className="ion-align-items-center ion-justify-content-center">
              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.city}
                  onIonChange={(event) => {
                    this.city = event.detail.value;
                  }}
                  type="string"
                  fill="outline"
                  labelPlacement="stacked"
                  label="City"
                  placeholder="Chicago"
                  helperText="Enter the name of a City"
                  clearInput
                ></ion-input>
              </ion-col>

              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.state}
                  onIonChange={(event) => {
                    this.state = event.detail.value;
                  }}
                  type="string"
                  fill="outline"
                  labelPlacement="stacked"
                  label="State"
                  placeholder="IL"
                  helperText="Enter the name of a State"
                  clearInput
                ></ion-input>
              </ion-col>
            </ion-row>
          )}

          {this.method === "zip-code" && (
            <ion-row className="ion-align-items-center ion-justify-content-center">
              <ion-col size="12">
                <ion-input
                  value={this.zipCode}
                  onIonChange={(event) => {
                    this.zipCode = event.detail.value;
                  }}
                  type="string"
                  fill="outline"
                  labelPlacement="stacked"
                  label="Zip Code"
                  placeholder="60606"
                  helperText="Enter a Zip Code"
                  clearInput
                ></ion-input>
              </ion-col>
            </ion-row>
          )}
          <ion-row className="ion-align-items-center ion-justify-content-center">
            <ion-col>
              <ion-button
                expand="full"
                onClick={() => {
                  this.checkWeather();
                }}
              >
                Check Weather
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

        {this.weather && (
          <ion-grid fixed>
            <ion-row className="ion-align-items-center ion-justify-content-center">
              <ion-col>
                <h2>Weather Report</h2>
                <p>Latitude: {this.weather.lat}</p>
                <p>Longitude: {this.weather.lon}</p>
                <p>Timezone: {this.weather.timezone}</p>
                <p>Timezone Offset: {this.weather.timezone_offset}</p>
                <p>Current DT: {this.weather.current.dt}</p>
                <p>Current Sunrise: {this.weather.current.sunrise}</p>
                <p>Current Sunset: {this.weather.current.sunset}</p>
                <p>Current Temp: {this.weather.current.temp}</p>
                <p>Current Feels Like: {this.weather.current.feels_like}</p>
                <p>Current Pressure: {this.weather.current.pressure}</p>
                <p>Current Humidity: {this.weather.current.humidity}</p>
                <p>Current Dew Point: {this.weather.current.dew_point}</p>
                <p>Current UVI: {this.weather.current.uvi}</p>
                <p>Current Clouds: {this.weather.current.clouds}</p>
                <p>Current Visibility: {this.weather.current.visibility}</p>
                <p>Current Wind Speed: {this.weather.current.wind_speed}</p>
                <p>Current Wind Deg: {this.weather.current.wind_deg}</p>
                <p>Current Wind Gust: {this.weather.current.wind_gust}</p>
                {this.weather.current.weather.map((weather) => {
                  return (
                    <Fragment>
                      <p>Current Weather Id: {weather.id}</p>
                      <p>Current Weather Main: {weather.main}</p>
                      <p>Current Weather Description: {weather.description}</p>
                      <p>Current Weather Icon: {weather.icon}</p>
                    </Fragment>
                  );
                })}
              </ion-col>
            </ion-row>
          </ion-grid>
        )}

        <organism-footer></organism-footer>
      </ion-content>
    );
  }
}
