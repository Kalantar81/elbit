import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import {
  ServerResponse,
  ServerUserResponse,
} from "../interfaces/server-response";

@Injectable({
  providedIn: "root",
})
export class UserService {
  api_path = "http://localhost:3005/api/user";
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Array<User>> {
    return this.http.get<any>(this.api_path).pipe(
      map((response: ServerResponse) => {
        return response.data;
      })
    );
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<User>(this.api_path, user).pipe(
      map((response) => {
        console.log("Saved sucessfully ", response);
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<ServerUserResponse>(`${this.api_path}/${id}`).pipe(
      map((response: ServerUserResponse) => {
        return response.data;
      })
    );
  }

  updateUser(user: User): Observable<Object> {
    return this.http.put(`${this.api_path}/${user._id}`, user);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(`${this.api_path}/${id}`);
  }
}
