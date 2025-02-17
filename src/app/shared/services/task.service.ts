import { inject, Injectable } from '@angular/core';
import Task from '../models/task.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environement } from '../../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL : string  = `${environement.apiUrl}/todos`
  http=inject(HttpClient)
  // ***** signales ***** 
  /* LCRUD */
  getList(limit : string , page : string , search : string):Observable<Task[]>{
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('page', page);
    if(search){
      params = params.append('search', search)
    };
    return this.http.get<Task[]>(this.baseURL,{params})
  }

  addNewOne(task: Task):Observable<null>{
    
const requestBody = { 
  todo: { 
    title: task.title, 
    description: task.description,
  } 
};
    
    return this.http.post<null>(this.baseURL,requestBody)
  }

  readOne(id:any):Observable<Task>{
    return this.http.get<Task>(`${this.baseURL}/${id}`)
  }

  editOne(task: Task):Observable<Task>{
    
    const requestBody = { 
      todo: { 
        title: task.title, 
        description: task.description,
      } 
    };
    return this.http.patch<Task>(`${this.baseURL}/${task._id}`,requestBody)
  }

  deleteOne(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/${id}`)
  }

 
  

  complited(id:string):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/${id}/complited`,{})
  }
}
