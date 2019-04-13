import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { User } from './../models/user';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})

export class ConnectComponent implements OnInit {
   form :FormGroup;
   notfound=true
  constructor(fb:FormBuilder, private _userService: UserService, private router: Router) {
   this.form=fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),

    })
    
   }


  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  login(){ let userDetail = this.form.value;
    let user = new User();
    user.email = userDetail.email;
    user.password=userDetail.password;
   
    this._userService.loginUser(user).subscribe(
        res => {
          console.log(res);
          this.notfound=true;
          this.router.navigate(['/home']);
         localStorage.setItem('userc',JSON.stringify(res))
        },
        err => {this.notfound=false;
          console.log(err);
        }
    )
   
  }

  ngOnInit() {
  }


}
