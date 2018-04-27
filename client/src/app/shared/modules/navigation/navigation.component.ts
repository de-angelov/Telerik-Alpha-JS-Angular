import { Component, OnInit, DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../popups/login/login.component';
import { LoginService } from '../../../core/login/login.service';
import { RegisterService } from '../../../core/register/register.service';
import { RegisterComponent } from '../popups/register/register.component';



import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth/auth.service';
import { resolveDefinition } from '@angular/core/src/view/util';
import { User } from '../../models/user/user';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, DoCheck  {

  loginComponentRef: MatDialogRef<LoginComponent>;
  registerComponentRef: MatDialogRef<RegisterComponent>;
  
  currentUserEmail: string;

  constructor(private dialog: MatDialog,
    private register: RegisterService,
    private authService: AuthService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.currentUserEmail =  this.authService.getCurrentUser();
  }

  ngDoCheck() {
    this.currentUserEmail =  this.authService.getCurrentUser();
  }

  sidebarToggle(sidebar) {
    sidebar.toggle();
  }

  loginModal() {
    // let newUser;
    console.log('login modal');
    this.loginComponentRef = this.dialog.open(LoginComponent);
    this.loginComponentRef
      .afterClosed()
      .subscribe((user) => {
        console.log('login dialog input data ', user);
        this.authService.login(user).subscribe(
          res => {
            localStorage.setItem('access_token', res.token);
            this.toastr.success(`${user.email} logged in!`, 'Success');
            console.log(res);
          }, err => {
            this.toastr.error(`Wrong username or password`, 'Error');
            console.log(err);
          });
      });
    // .map(console.log('outside subscribe ', newUser));
  }

  logoutModal() {
    this.toastr.success('logout navigation');
    localStorage.removeItem('access_token');
    console.log('logout navigation');
  }

  registerModal() {
    console.log('register modal');
    console.log(this.registerComponentRef);
    this.registerComponentRef = this.dialog.open(RegisterComponent);
    this.registerComponentRef
      .afterClosed()
      .subscribe((user) => {
        // console.log('register dialog input data ', user);
        this.authService.register(user).subscribe(
          res => {
            console.log(res);
          }, err => {
            console.log(err);
          }
        );
      });
  }

  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }
}


