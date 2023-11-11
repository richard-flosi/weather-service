import { Component, h } from "@stencil/core";
import { menuController } from "@ionic/core";

const dismissMenu = () => {
  if (menuController.isOpen()) {
    menuController.close();
  }
};

@Component({
  tag: "organism-menu",
})
export class OrganismMenu {
  render() {
    return (
      <ion-menu side="end" contentId="ion-nav" type="overlay">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="end">
              <ion-button onClick={dismissMenu}>
                <ion-icon color="light" size="large" name="close-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content color="primary">
          <ion-list color="primary" class="ion-no-padding">
            <ion-item color="primary" href="/">
              Home
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
    );
  }
}
