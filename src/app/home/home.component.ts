import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentification/service/authentication.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	isConnected  = false;

	constructor(private loginservice: AuthenticationService) { 
		
		if (this.loginservice.isUserLoggedIn()) {
			this.isConnected  = true
		}
		else{
			this.isConnected  = false
		}
		
	}

	ngOnInit() {
	}

}