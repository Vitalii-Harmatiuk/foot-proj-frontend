import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id: string;
  name: string;
  country: string;
  founded: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:3500/teams';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  create(team: Omit<Team, 'id'>): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  update(id: string, team: Omit<Team, 'id'>): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team);
  }
}