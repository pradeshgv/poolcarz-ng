import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestService } from '../rest.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {
  submitted = false;
  offerRideForm!: FormGroup;
  loginuser: any;
  rides: any[] = [];
  constructor(private router: Router, private restService: RestService, private formBuilder: FormBuilder) {
    this.loginuser = this.restService.getcuser();
    // this.restService.getcuser().subscribe({ next: (loginuser) => this.loginuser = loginuser });
  }
  ngOnInit() {
    this.offerRideForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        src: ['', Validators.required],
        dstn: ['', Validators.required],
        car: ['', Validators.required],
        seatsavail: ['', Validators.required],
        seatsleft: [0, this.seatvalidate]
      }
    );
  }
  seatvalidate(c: FormControl): any {
    if (c.value <= 0 || c.value >= 8) {
      return { seatsInvalid: { message: "Seats should be greater than 0 and less than 8" } }
    }
  };
  onSubmit() {
    this.submitted = true;
    let id1 = Math.floor(Math.random() * 100),
      id2 = this.offerRideForm.controls['name'].value,
      id3 = this.offerRideForm.controls['car'].value,
      id4 = this.offerRideForm.controls['seatsleft'].value,
      id5 = this.offerRideForm.controls['src'].value,
      id6 = this.offerRideForm.controls['dstn'].value;
    let ride1 = {
      id: id1,
      offerid: "a4",
      name: id2,
      car: id3,
      seatsLeft: id4,
      pickUp: id5,
      destination: id6
    };
    this.restService.addRides(ride1).subscribe({});
    console.log("here");

  }
  onmyrides() {
    this.router.navigate(['/myrides']);
  }
  goback() {
    this.router.navigate(['book-ride']);
  }
  onlogout() {
    this.restService.deleteusers();
    this.router.navigate(['']);
  }
}
