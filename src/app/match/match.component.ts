import { Component, OnInit } from '@angular/core';
import { MatchService, Match } from './match.service';
import { RouterModule } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  imports: [NgIf, NgFor, DatePipe, RouterModule],
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchListComponent implements OnInit {
  matches: Match[] = [];
  loading = false;
  error = '';

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  fetchMatches(): void {
    this.loading = true;
    this.matchService.getAll().subscribe({
      next: (data) => {
        this.matches = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load matches';
        this.loading = false;
      }
    });
  }

  deleteMatch(id: string): void {
    if (confirm('Are you sure you want to delete this match?')) {
      this.matchService.delete(id).subscribe(() => {
        this.matches = this.matches.filter(m => m.id !== id);
      });
    }
  }
}