import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './player.service';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf, ReactiveFormsModule],
  selector: 'app-player-form',
  templateUrl: './player-form.component.html'
})
export class PlayerFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  playerId: string | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.playerId;

    this.form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      number: [1, [Validators.required, Validators.min(1)]],
      teamId: ['', Validators.required]
    });

    if (this.isEditMode && this.playerId) {
      this.loading = true;
      this.playerService.getById(this.playerId).subscribe({
        next: (player) => {
          this.form.patchValue(player);
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load player data';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const playerData = this.form.value;

    if (this.isEditMode && this.playerId) {
      this.playerService.update(this.playerId, playerData).subscribe({
        next: () => this.router.navigate(['/players']),
        error: () => this.error = 'Failed to update player'
      });
    } else {
      this.playerService.create(playerData).subscribe({
        next: () => this.router.navigate(['/players']),
        error: () => this.error = 'Failed to create player'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/players']);
  }
}
