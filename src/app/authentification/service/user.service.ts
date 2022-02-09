import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../authentification/model/user/user';
import { Observable } from 'rxjs/Observable';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private usersUrl: string;
 
  constructor(private http: HttpClient) {
    
  }
 
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9090/api/v1/authentification/users");
  }
 
  public save(username, password) {
    return this.http.post<{user}>("http://localhost:9090/api/v1/authentification/inscription", {username,password});
  }
}
