import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.httpClient
      .get<ApiResponse>('https://reqres.in/api/users')
      ?.pipe(
        map((apiReponse) => apiReponse.data.map(this.mapApiUsertoDomainUser))
      );
  }

  private mapApiUsertoDomainUser(data: ApiUser): User {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      avatarUrl: data.avatar,
    };
  }
}

export interface ApiUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  data: ApiUser[];
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}
