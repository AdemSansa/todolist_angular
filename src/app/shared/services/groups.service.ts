import { inject, Injectable, signal } from '@angular/core';
import { environement } from '../../../environements/environement';  // Make sure the path is correct
import { HttpClient, HttpParams } from '@angular/common/http';
import { Group } from '../models/groups.model';  // Path for the Group model
import { GroupFeature } from '../models/group_feature.model';
import { request } from 'express';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseURL: string = `${environement.apiUrl}/groups`;  // API URL for groups

  http = inject(HttpClient);

  // ***** signals *****
  groups$ = signal<Group[]>([]);

  // Get list of groups with pagination and search
  getList(limit: string, page: string, search: string) {
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('page', page);
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<Group[]>(this.baseURL, { params });
  }

  // Add a new group
  addNewOne(group: Group) {
    const requestBody = {
      group: {
        code: group.code,
        label: group.label,
        description: group.description,
        status: group.status,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt
      }
    };
    return this.http.post<null>(this.baseURL, requestBody);
  }

  // Get details of a single group
  readOne(id: any) {
    return this.http.get<Group>(`${this.baseURL}/${id}`);
  }

  // Edit an existing group
  editOne(group: Group) {
    const requestBody = {
      group: {
        code: group.code,
        label: group.label,
        description: group.description,
        status: group.status,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt
      }
    };
    return this.http.patch<Group>(`${this.baseURL}/${group._id}`, requestBody);
  }

  // Delete a group
  deleteOne(id: string) {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }




  AddFeatureToGroup(groupId: string, featureId: string) {
    const requestBody = 
    {
    groupFeature :{
      feature:featureId,
      group:groupId,  
    }
  };
    return this.http.post<GroupFeature>(`${this.baseURL}/feature`, requestBody);
  }

  getGroupFeatures(groupId: string) {

    return this.http.get<GroupFeature[]>(`${this.baseURL}/${groupId}/features`);
  }

  updateGroupFeature(groupFeature: GroupFeature) {
    const requestBody = {
      groupFeature: {
        feature: groupFeature.feature,
        group: groupFeature.group,
        read: groupFeature.read,
        create: groupFeature.create,
        update: groupFeature.update,
        delete: groupFeature.delete,
        list: groupFeature.list,
        status: groupFeature.status,
        updatedAt: Date.now(),
      }
    };
    return this.http.put<GroupFeature>(`${this.baseURL}/feature/${groupFeature._id}`, requestBody);
  }


  deleteGroupFeature(id: any) {
    console.log('id', id);
    
  
    return this.http.delete<GroupFeature>(`${this.baseURL}/feature/${id}`);
  }


  

}
