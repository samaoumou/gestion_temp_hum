import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { AuthService } from './.././shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
signinForm: FormGroup;
  res: any;
  msg!: string;

constructor(
  public fb: FormBuilder,
  public authService: AuthService,
  public router: Router
) {
  this.signinForm = this.fb.group({
    email: [''],
    password: [''],
  });
}

  ngOnInit(): void {
    
    this.signinForm = this.fb.group({
      email: ['',[Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),],],
      password : ['', Validators.required], });
  }

  loginUser() {
    {
      this.authService.signIn(this.signinForm.value).subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.authService.getUserProfile(res._id).subscribe((res) => {
          // this.currentUser = res._id;
          localStorage.setItem("id",res.msg._id)
          console.log(res.msg.password)
          if(res.msg.etat==true){
            if(res.msg.role=="administrateur"){
              this.router.navigateByUrl("pageAdmin");
            }
            if(res.msg.role=="utilisateur_simple"){
              this.router.navigateByUrl("/pageUser");
            }
          }
          else{
            this.msg="compte archivé";
            this.signinForm.reset()

          }
          // this.router.navigate(['cpt2/' + res.msg._id]);
        });
      });
    }
  }

}

/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
} */
