import { inject, Injectable, signal } from '@angular/core';
import { environement } from '../../../environements/environement';  // Make sure the path is correct
import { HttpClient, HttpParams } from '@angular/common/http';
import { Group } from '../models/groups.model';  // Path for the Group model

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
        features: group.features,
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
        features: group.features,
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
}
