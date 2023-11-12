import { Component, h } from "@stencil/core";

@Component({
  tag: "page-about",
})
export class PageAbout {
  render() {
    return (
      <ion-content color="light">
        <organism-header></organism-header>

        <ion-grid fixed>
          <ion-row class="ion-align-items-center ion-justify-content-center">
            <ion-col size="12">
              <h1 class="ion-text-center">Check the weather via Open Weather Map API.</h1>
              <p class="ion-text-center">
                For more information on the Open Weather Map API see the documentation at{" "}
                <a href="https://openweathermap.org/api/" target="_blank">
                  Open Weather API
                </a>
              </p>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-center ion-justify-content-center">
            <ion-col size="auto">
              <ion-img src="/assets/icon/icon.png" alt="Weather Service" />
            </ion-col>
          </ion-row>
        </ion-grid>

        <organism-footer></organism-footer>
      </ion-content>
    );
  }
}
