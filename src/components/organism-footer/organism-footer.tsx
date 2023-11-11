import { Component, h } from "@stencil/core";

@Component({
  tag: "organism-footer",
})
export class OrganismFooter {
  render() {
    return (
      <ion-grid fixed class="ion-padding">
        <ion-row class="ion-padding-bottom ion-align-items-center ion-justify-content-center">
          <ion-col class="ion-padding ion-text-center">
            <ion-text>&copy; 2023 Richard Flosi. All Rights Reserved.</ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    );
  }
}
