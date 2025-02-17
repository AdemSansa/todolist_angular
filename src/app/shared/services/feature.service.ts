import { inject, Injectable } from '@angular/core';
import { environement } from '../../../environements/environement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private baseURL : string  = `${environement.apiUrl}/features`

  http=inject(HttpClient)

  // ***** signales *****
getList(limit : string , page : string , search : string){
  let params = new HttpParams();
  params = params.append('limit', limit);
  params = params.append('page', page);
  if(search){
    params = params.append('search', search)
  };
  return this.http.get<Feature[]>(this.baseURL,{params})

}

addNewOne(feature: Feature){
  const requestBody = {
    feature: {
      code: feature.code,
      title:feature.title,
      type: feature.type,
      subtitle: feature.subtitle,
      icon: feature.icon,
      link: feature.link,
      order: feature.order,
      status: feature.status,
      featuresIdParent: feature.featuresIdParent,
      createdAt: feature.createdAt,
      updatedAt: feature.updatedAt

      

    }
  };
  return this.http.post<null>(this.baseURL,requestBody)
}

readOne(id:any){
  return this.http.get<Feature>(`${this.baseURL}/${id}`)
}
editOne(feature: Feature){
  const requestBody = {
    feature: {
      code: feature.code,
      title:feature.title,
      type: feature.type,
      subtitle: feature.subtitle,
      icon: feature.icon,
      link: feature.link,
      order: feature.order,
      status: feature.status,
      featuresIdParent: feature.featuresIdParent,
      createdAt: feature.createdAt,
      updatedAt: feature.updatedAt
    }

  };
  return this.http.patch<Feature>(`${this.baseURL}/${feature._id}`,requestBody)
}
deleteOne(id:string){
  return this.http.delete<any>(`${this.baseURL}/${id}`)
}




}
