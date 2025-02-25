import { inject, Injectable } from '@angular/core';
import { environement } from '../../../environements/environement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL : string  = `${environement.apiUrl}/users`
  http=inject(HttpClient) 
  // ***** signales ***** 
  /* LCRUD */

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseURL)
  }
  getList(limit : string , page : string , search : string):Observable<User[]>{
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('page', page);
    if(search){
      params = params.append('search', search)
    };
    return this.http.get<User[]>(this.baseURL,{params})
  }

  addNewOne(user: User):Observable<null>{
  
    const requestBody = {
      user: {
        username: user.username,
        email: user.email,
      }
    };

    return this.http.post<null>(this.baseURL,requestBody)
  }

  readOne(id:any):Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`)
  }

  editOne(user: User):Observable<User>{
    const requestBody = { 
      user: { 
        username: user.username, 
        email: user.email,
      } 
    };
    return this.http.patch<User>(`${this.baseURL}/${user._id}`,requestBody)
  }

  deleteOne(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/${id}`)
  }
  getUsersGrowth():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/growth`)
  }
  fetchUserGrowth(groupBy: string):Observable<any>{
    return this.http.get<any[]>(`${this.baseURL}/growth?groupBy=${groupBy}`)
  }
  

 
}
