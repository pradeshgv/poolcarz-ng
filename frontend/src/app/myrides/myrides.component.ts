import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Login } from './login';
@Component({
  selector: 'app-myrides',
  templateUrl: './myrides.component.html',
  styleUrls: ['./myrides.component.css']
})
export class MyridesComponent implements OnInit {
  booking:any[]=[];
  rides:any[]=[];
  fbook:any[]=[];
  cuser!:any;
  book:any;
  show=false;
  selectid:any;
  onlogout() {
    this.restService.deleteusers();
    this.router.navigate(['/login']);
    console.log(this.booking);
    console.log(this.rides);
    console.log(this.fbook);
  }
  onrideselect(x: any) {
    this.selectid = x;
    console.log(this.selectid);
  }
  onclick()
  {
    if(this.show==true)
      this.show=false;
    else
    this.show=true;
    this.onstart();
  }
  onstart()
  {
    this.fbook.length=0;
    for(let i=0;i<this.booking.length;i++)
    {
      if(this.booking[i].uname===this.cuser.uname)
      {
        for(let j=0;j<this.rides.length;j++)
        {
          if(this.booking[i].rideid===this.rides[j].id) 
          {
            this.book={id:this.booking[i].id,
              rideid:this.rides[j].id,
              name:this.rides[j].name,
              car:this.rides[j].car,
              pickUp:this.rides[j].pickUp,
              destination:this.rides[j].destination};
            this.fbook.push(this.book);
            break;
          } 
        }
      }
    }
    console.log(this.fbook)
  }
  oncancel()
  {
    this.restService.cancelBooking(this.selectid).subscribe({});
    for(let i=0;i<this.rides.length;i++)
    {
      if(this.selectid.rideid==this.rides[i].id)
      {
        this.rides[i].seatsLeft++;
        this.restService.updateRides(this.rides[i]).subscribe({});
        break;
      }
    }
    alert("Cancellation Successful !")
    this.router.navigate(['/book-ride']);
   this.show=false;
  }
  onhome() {
    this.router.navigate(['/book-ride']);
  }
  constructor(private router: Router, private restService: RestService) {
    this.restService.getRides().subscribe({ next: (rides) => this.rides = rides });
    this.restService.getBooking().subscribe({ next: (booking) => this.booking = booking});
    this.cuser = this.restService.getcuser();
    // this.restService.getcuser().subscribe({next: (user)=>this.cuser=user});
    
   }

  ngOnInit(): void {
    
  }

}
