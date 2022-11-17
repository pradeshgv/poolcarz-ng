import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Login } from './login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  uname!:string;
  pass!:string
  signupdata: Login[]=[];
  signupForm!:FormGroup;
  message!:string;
  submitted=false;
  constructor(private router: Router,private formBuilder: FormBuilder,private restService: RestService) { 
    this.restService.getUsers().subscribe({next:(users)=>this.signupdata=users})
  }

  ngOnInit(){
    this.signupForm=this.formBuilder.group(
      {
        username:['',Validators.required],
        password:['',Validators.required]
      }
    )
  }
  onlogin()
  {
    this.router.navigate(['']);
  }
  onSubmit()
  {
    this.submitted=true;
    console.log(this.signupdata.length);
    let i=0;
    for(i=0;i<this.signupdata.length;i++)
    {console.log(this.signupdata[i]);
      if(this.signupdata[i].uname==this.uname && this.signupdata[i].pass==this.pass)
      {
        this.message="User Already Exists !";
        alert(this.message)
        this.router.navigate(['/login']);
        break;
      }
    }
    if(i==this.signupdata.length)
    {
      this.message="SignUp Successfull !"
      this.restService.addUsers({uname:this.uname,pass:this.pass}).subscribe({})
      alert(this.message)
      this.router.navigate(['/login']);
    }
  }

}
