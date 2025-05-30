import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'http://localhost:3500/matches';

  constructor(private http: HttpClient) {}

  create(match: Omit<Match, 'id'>): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, match);
  }

  update(id: string, match: Omit<Match, 'id'>): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/${id}`, match);
  }

  getAll(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: string): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${id}`);
  }
}