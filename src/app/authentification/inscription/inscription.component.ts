import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../authentification/service/user.service';
import { User } from '../../authentification/model/user/user';
import { AuthenticationService } from '../../authentification/service/authentication.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent{
  
  user: User;
  username = ''
  password = ''


  ngOnInit() { 
  }

  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private loginservice: AuthenticationService) {
    this.user = new User();
    
    if (this.loginservice.isUserLoggedIn()) {
      this.router.navigate(['home'])
    }
  }
  
  onSubmit() {
    this.userService.save(this.username, this.password).subscribe(result => this.gotoUserList());
  }
  
  gotoUserList() {
    this.router.navigate(['/home']);
  }
}