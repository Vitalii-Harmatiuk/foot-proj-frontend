import { Component, OnInit } from '@angular/core';
import { TeamService, Team } from './team.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [NgIf, NgFor, RouterModule],
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  loading = false;
  error = '';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.loading = true;
    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load teams';
        this.loading = false;
      }
    });
  }

  deleteTeam(id: string): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.delete(id).subscribe(() => {
        this.teams = this.teams.filter(team => team.id !== id);
      });
    }
  }
}
