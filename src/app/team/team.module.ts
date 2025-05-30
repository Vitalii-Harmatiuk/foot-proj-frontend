import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TeamsRoutingModule } from './team-routing.module';

import { TeamListComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamFormComponent } from './team-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TeamsRoutingModule,
    RouterModule,
    TeamListComponent,
    TeamDetailComponent,
    TeamFormComponent,
  ],
})
export class TeamsModule {}
