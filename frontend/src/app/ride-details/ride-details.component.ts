import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {
  ride:any;
  id2:any;
  loginuser:any;
  usname:any;
  rideid1:any;
  ridedet:any;
  bid:any;
  @Input() set rideDetails(id1:any){
    this.ride=id1;
    this.id2=id1;
  }
  booked:boolean=false;
  @Output() onbook=new EventEmitter<boolean>();
  onbooking()
  {
    this.bid++;
    this.booked=true;
    this.onbook.emit(this.booked);
    this.id2.seatsLeft--;
    this.usname=this.loginuser.uname;
    this.rideid1=this.id2.id;
    console.log(this.usname);
    console.log(this.rideid1);
    this.restService.updateRides(this.id2).subscribe({});
    this.bid=Math.floor(Math.random() * 100);
    this.restService.addBooking({id:this.bid,rideid:this.rideid1,uname:this.usname}).subscribe({});
  }

  onCancel()
  {
    this.booked=false;
    this.onbook.emit(this.booked);
    this.id2.seatsLeft++;
    this.restService.cancelBooking(this.bid).subscribe({});
    this.restService.updateRides(this.id2).subscribe({});
  }
  constructor( private restService: RestService) { 
    this.loginuser= this.restService.getcuser();
    // this.restService.getcuser().subscribe({next:(loginuser)=>this.loginuser=loginuser});
    
  }

  ngOnInit(): void {
  }

}
