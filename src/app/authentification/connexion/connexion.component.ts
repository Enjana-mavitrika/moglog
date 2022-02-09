import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentification/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) {
    
    if (this.loginservice.isUserLoggedIn()) {
      this.router.navigate(['home'])
    }
    
  }

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        console.log("Données erronées")
      }
      )
    );

  }
  
}