import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from './team.service';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf, ReactiveFormsModule, RouterModule],
  selector: 'app-team-form',
  templateUrl: './team-form.component.html'
})
export class TeamFormComponent implements OnInit {
  teamForm!: FormGroup;
  isEditMode = false;
  teamId: string | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      founded: [null, [Validators.required, Validators.min(1800)]]
    });

    this.teamId = this.route.snapshot.paramMap.get('id');
    if (this.teamId) {
      this.isEditMode = true;
      this.loadTeam(this.teamId);
    }
  }

  loadTeam(id: string): void {
    this.loading = true;
    this.teamService.getById(id).subscribe({
      next: (team) => {
        this.teamForm.patchValue(team);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load team';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.teamForm.invalid) return;

    const teamData = this.teamForm.value;

    this.loading = true;

    const request$ = this.isEditMode && this.teamId
      ? this.teamService.update(this.teamId, teamData)
      : this.teamService.create(teamData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/teams']);
      },
      error: () => {
        this.error = 'Failed to save team';
        this.loading = false;
      }
    });
  }
}
