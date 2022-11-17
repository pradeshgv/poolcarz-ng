import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { Observable } from 'rxjs';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { 
    if(!isDevMode())
      this.backendUrl = ""
  }
  getRides(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl + '/rides');
  }
  updateRides(rides:any): Observable<any[]> {
    return this.http.put<any[]>(this.backendUrl+`/rides/${rides.id}`,rides);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl+'/users');
  }
  addRides(rides:any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/rides', rides, { headers: options });
  }
  deleteusers(): void{
    localStorage.removeItem("user");
  }
  loginUsers(user:any): void {
    localStorage.setItem("user", JSON.stringify(user));
    // return this.http.post<any[]>('http://localhost:3200/loginuser',user);
  }
  addUsers(user:any): Observable<any[]> {
    return this.http.post<any[]>(this.backendUrl+'/users',user);
  }
  addBooking(book:any): Observable<any[]> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.backendUrl + '/booking', book, { headers: options });
  }
  cancelBooking(book:any): Observable<any[]> {
    return this.http.delete<any[]>(this.backendUrl + `/booking/${book}`);
  }
  getBooking(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl + '/booking');
  }
  getcuser(): any {
    return JSON.parse(localStorage.getItem("user") || "");
    // return this.http.get<any[]>('http://localhost:3200/loginuser/1');
  }
}
