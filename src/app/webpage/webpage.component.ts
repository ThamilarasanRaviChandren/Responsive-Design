import { Component, OnInit } from '@angular/core';
import { WebPageDataService } from './webpage.data.service';
import { from, Observable } from "rxjs";
import { wetherDetails } from "./webpage.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {

  public timer: any;
  public wetherCountryWeather: any;
  public destinationRes: any;
  registerForm: FormGroup;
  submitted = false;
  public nameRequire: boolean = false;
  public contactRequire: boolean = false;
  public emailRequire: boolean = false;
  public succesMsg: boolean = false;


  constructor(public webPageDataService: WebPageDataService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contacttNo: ['', [Validators.required, Validators.minLength(10)]]
    });

  }

  ngOnInit(): void {
    this.callTimer();
    this.getWetherDetails();
    this.getDestinationImages();
  }

  callTimer(): void {
    let countDownDate = new Date("Aug 10, 2021").getTime();
    // Update the count down every 1 second
    let clearTimer = setInterval(() => {
      // Get todays date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

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


  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.value.firstName) {
      this.nameRequire = false;
    }
    else {
      this.nameRequire = true;
    }
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.registerForm.value.email.match(pattern)) {
      this.emailRequire = false;
    }
    else {
      this.emailRequire = true;
    }

    if (this.registerForm.value.contacttNo.toString().length === 10) {
      this.contactRequire = false;
    }
    else {
      this.contactRequire = true;
    }

    if (!this.emailRequire && !this.contactRequire && !this.emailRequire) {
      this.succesMsg = true;
    }

  }

}
