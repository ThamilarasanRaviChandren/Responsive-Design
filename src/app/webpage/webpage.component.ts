import { Component, OnInit } from '@angular/core';
import { WebPageDataService } from './webpage.data.service';
import { from, Observable } from "rxjs";
import { wetherDetails } from "./webpage.model";
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {

  public timer: any;
  public wetherCountryWeather: any;
  public destinationRes: any;

  constructor(public webPageDataService: WebPageDataService) {

  }

  ngOnInit(): void {
    this.callTimer();
    this.getWetherDetails();
    this.getDestinationImages();
  }

  callTimer(): void {
    let countDownDate = new Date("Aug 10, 2021").getTime();
    // Update the count down every 1 second
    var clearTimer = setInterval(() => {
      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timer = days.toString() + 'd ' + hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's';
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(clearTimer);
        //document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  getWetherDetails(): void {
    this.webPageDataService.getWeatherDetailsForCountry().subscribe((response: any) => {
      console.log(response.result);
      this.wetherCountryWeather = response.result;
    }, error => {
      this.webPageDataService.handleOnLoadError(error);
    });
  }

  getDestinationImages(): void {
    this.webPageDataService.getDestinationImg().subscribe((response: any) => {
      console.log(response.result);
      this.destinationRes = response.result;
    }, error => {
      this.webPageDataService.handleOnLoadError(error);
    });
  }

}
