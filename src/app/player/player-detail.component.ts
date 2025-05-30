import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService, Player } from './player.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  imports: [NgIf],
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  player: Player | null = null;
  loading = false;
  error = '';
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchPlayer(this.id);
    }
  }

  fetchPlayer(id: string): void {
    this.loading = true;
    this.playerService.getById(id).subscribe({
      next: (data) => {
        this.player = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load player';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/players']);
  }

  edit(): void {
    if (this.id) {
      this.router.navigate(['/players/edit', this.id]);
    }
  }
}
