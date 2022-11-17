import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Login } from './login';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname!:string;
  pass!:string
  logindata: Login[]=[];
  loginForm!:FormGroup;
  message!:string;
  submitted=false;
  constructor(private router: Router,private formBuilder: FormBuilder,private restService: RestService) { 
    this.restService.getUsers().subscribe({next:(users)=>this.logindata=users})
  }

  ngOnInit(){
    this.loginForm=this.formBuilder.group(
      {
        username:['',Validators.required],
        password:['',Validators.required]
      }
    )
  }
  onsignup()
  {
    this.router.navigate(['/signup']);
  }
  onSubmit()
  {
    this.submitted=true;
    console.log(this.logindata.length);
    let i=0;
    for(i=0;i<this.logindata.length;i++)
    {console.log(this.logindata[i]);
      if(this.logindata[i].uname==this.uname && this.logindata[i].pass==this.pass)
      {
        this.message="Login Successfull !"
        alert(this.message)
        this.restService.loginUsers({id:1,uname:this.logindata[i].uname,pass:this.logindata[i].pass})
        this.router.navigate(['/book-ride']);
        break;
      }
    }
    if(i==this.logindata.length)
    {
      this.message="Invalid Credentials!"
    }
  }
}
