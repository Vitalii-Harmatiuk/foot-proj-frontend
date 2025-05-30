import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from './player.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [NgIf, NgFor],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  loading = false;
  error = '';

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.loading = true;
    this.playerService.getAll().subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load players';
        this.loading = false;
      }
    });
  }

  deletePlayer(id: string): void {
    if (!confirm('Are you sure?')) return;

    this.playerService.delete(id).subscribe({
      next: () => this.fetchPlayers(),
      error: () => this.error = 'Failed to delete player'
    });
  }

  view(id: string): void {
    this.router.navigate(['/players', id]);
  }

  edit(id: string): void {
    this.router.navigate(['/players/edit', id]);
  }

  create(): void {
    this.router.navigate(['/players/new']);
  }
}
