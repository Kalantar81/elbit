import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  title = "elbit-client";
  color = "#f0c660";
  captionColor = "#505e86";

  changeColor(): void {
    this.color = "green";
    this.captionColor = "red";
  }

  returnColor(): void {
    this.color = "#f0c660";
    this.captionColor = "#505e86";
  }
}
