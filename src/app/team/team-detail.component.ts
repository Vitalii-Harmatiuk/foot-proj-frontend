import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeamService, Team } from './team.service';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf, RouterModule],
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {
  team: Team | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTeam(id);
    } else {
      this.error = 'No team ID provided.';
    }
  }

  fetchTeam(id: string): void {
    this.loading = true;
    this.teamService.getAll().subscribe({
      next: (teams) => {
        this.team = teams.find(t => t.id === id) || null;
        this.loading = false;
        if (!this.team) {
          this.error = 'Team not found.';
        }
      },
      error: () => {
        this.error = 'Error fetching team data.';
        this.loading = false;
      }
    });
  }
}
