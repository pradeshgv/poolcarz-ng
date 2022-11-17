import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit {
  flag: boolean = true;
  pipese = "sar";
  setpipese(x: string) {
    this.restService.getRides().subscribe({ next: (rides) => this.rides = rides });
    this.pipese = x;
  }
  rides: any[] = [];
  onClick() {
    if (this.flag == false)
      this.flag = true;
    else
      this.flag = false;
    this.bo = false;
    this.restService.getRides().subscribe({ next: (rides) => this.rides = rides });
    console.log(this.rides);
  }
  bo: boolean = false;
  boo(a: boolean) {

    this.bo = a;
    this.restService.getRides().subscribe({ next: (rides) => this.rides = rides });
  }

  selectid: any;
  onrideselect(x: any) {
    this.selectid = x;

  }
  constructor(private router: Router, private restService: RestService) {
    this.restService.getRides().subscribe({ next: (rides) => this.rides = rides });

  }

  gotoOfferRide() {
    this.router.navigate(['/offer-ride']);
  }
  ngOnInit(): void {
  }
  onlogout() {
    this.restService.deleteusers();
    this.router.navigate(['']);
  }
  onmyrides() {
    this.router.navigate(['/myrides']);
  }
}
