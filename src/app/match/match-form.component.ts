import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatchService, Match } from './match.service';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf, ReactiveFormsModule, RouterModule],
  selector: 'app-match-form',
  templateUrl: './match-form.component.html'
})
export class MatchFormComponent implements OnInit {
  matchForm!: FormGroup;
  isEditMode = false;
  matchId: string | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      date: ['', Validators.required],
      score: ['']
    });

    this.matchId = this.route.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.isEditMode = true;
      this.loadMatch(this.matchId);
    }
  }

  loadMatch(id: string): void {
    this.loading = true;
    this.matchService.getById(id).subscribe({
      next: (match) => {
        this.matchForm.patchValue(match);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load match';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.matchForm.invalid) return;

    const matchData = this.matchForm.value;
    this.loading = true;

    const request$ = this.isEditMode && this.matchId
      ? this.matchService.update(this.matchId, matchData)
      : this.matchService.create(matchData);

    request$.subscribe({
      next: () => this.router.navigate(['/matches']),
      error: () => {
        this.error = 'Failed to save match';
        this.loading = false;
      }
    });
  }
}
