import { Component, h, State } from "@stencil/core";

@Component({
  tag: "page-home",
})
export class PageHome {
  @State() method: "lat-lon" | "city-state" | "zip-country" = "lat-lon";
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
    summary: {
      feels: string;
    };
  } = null;

  lat: number = null;
  lon: number = null;
  city: string = null;
  state: string = null;
  zip: number = null;
  country: string = null;

  async checkWeather() {
    const url = `/api/weather?method=${this.method}&lat=${this.lat}&lon=${this.lon}&city=${this.city}&state=${this.state}&zip=${this.zip}&country=${this.country}`;
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
                  // reset form variables when the method changes
                  this.weather = null;
                  this.lat = null;
                  this.lon = null;
                  this.city = null;
                  this.state = null;
                  this.zip = null;
                  this.country = null;
                  this.method = event.detail.value;
                }}
                fill="outline"
                interface="popover"
                label="Check Weather By"
                labelPlacement="stacked"
                placeholder="Select a method for checking the weather"
              >
                <ion-select-option value="lat-lon">Latitude & Longitude</ion-select-option>
                <ion-select-option value="city-state">City, State, & Country</ion-select-option>
                <ion-select-option value="zip-country">Zip Code & Country</ion-select-option>
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
              <ion-col sizeXs="12" sizeLg="4">
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

              <ion-col sizeXs="12" sizeLg="4">
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

              <ion-col sizeXs="12" sizeLg="4">
                <ion-input
                  value={this.country}
                  onIonChange={(event) => {
                    this.country = event.detail.value;
                  }}
                  type="string"
                  fill="outline"
                  labelPlacement="stacked"
                  label="Country"
                  placeholder="US"
                  helperText="Enter the name of a Country"
                  clearInput
                ></ion-input>
              </ion-col>
            </ion-row>
          )}

          {this.method === "zip-country" && (
            <ion-row className="ion-align-items-center ion-justify-content-center">
              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.zip}
                  onIonChange={(event) => {
                    this.zip = event.detail.value;
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

              <ion-col sizeXs="12" sizeLg="6">
                <ion-input
                  value={this.country}
                  onIonChange={(event) => {
                    this.country = event.detail.value;
                  }}
                  type="string"
                  fill="outline"
                  labelPlacement="stacked"
                  label="Country"
                  placeholder="US"
                  helperText="Enter the name of a Country"
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

        {this.weather &&
          this.weather.current.weather.map((weather) => {
            return (
              <ion-grid fixed>
                <ion-row>
                  <ion-col>
                    <ion-card color="secondary">
                      <ion-card-header>
                        <ion-grid>
                          <ion-row class="ion-align-items-center">
                            <ion-col size="auto">
                              <ion-img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} style={{ width: "100px", height: "100px" }} />
                            </ion-col>
                            <ion-col>
                              <ion-card-title>Current Weather Conditions</ion-card-title>
                              <ion-card-subtitle>
                                {weather.main} - {weather.description} - {this.weather.summary.feels} - Tempurature: {this.weather.current.temp}ºK - Feels Like:{" "}
                                {this.weather.current.feels_like}ºK - Visibility: {this.weather.current.visibility} meters
                              </ion-card-subtitle>
                            </ion-col>
                          </ion-row>
                        </ion-grid>
                      </ion-card-header>
                      <ion-card-content>
                        <ion-grid>
                          <ion-row>
                            <ion-col>
                              Latitude / Longitude: {this.weather.lat} / {this.weather.lon}
                            </ion-col>
                            <ion-col>Sunrise: {new Date(this.weather.current.sunrise * 1000).toLocaleString()}</ion-col>
                            <ion-col>Sunset: {new Date(this.weather.current.sunset * 1000).toLocaleString()}</ion-col>
                            <ion-col>Date Time: {new Date(this.weather.current.dt * 1000).toLocaleString()}</ion-col>
                          </ion-row>
                          <ion-row>
                            <ion-col>Clouds: {this.weather.current.clouds}%</ion-col>
                            <ion-col>Wind Speed: {this.weather.current.wind_speed} meter/sec</ion-col>
                            <ion-col>Wind Deg: {this.weather.current.wind_deg}º</ion-col>
                            <ion-col>Wind Gust: {this.weather.current.wind_gust} meter/sec</ion-col>
                          </ion-row>
                          <ion-row>
                            <ion-col>Pressure: {this.weather.current.pressure} hPa</ion-col>
                            <ion-col>Humidity: {this.weather.current.humidity}%</ion-col>
                            <ion-col>Dew Point: {this.weather.current.dew_point}ºK</ion-col>
                            <ion-col>UV Index: {this.weather.current.uvi}</ion-col>
                          </ion-row>
                        </ion-grid>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>
            );
          })}

        <organism-footer></organism-footer>
      </ion-content>
    );
  }
}
