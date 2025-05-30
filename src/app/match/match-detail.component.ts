import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatchService, Match } from './match.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  imports: [DatePipe, NgIf, RouterModule],
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html'
})
export class MatchDetailComponent implements OnInit {
  match: Match | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchMatch(id);
    } else {
      this.error = 'Match ID not provided.';
    }
  }

  fetchMatch(id: string): void {
    this.loading = true;
    this.matchService.getById(id).subscribe({
      next: (data) => {
        this.match = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load match data.';
        this.loading = false;
      }
    });
  }
}
