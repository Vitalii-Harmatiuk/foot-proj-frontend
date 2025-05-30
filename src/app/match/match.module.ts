import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatchRoutingModule } from './match-routing.module';

import { MatchListComponent } from './match.component';
import { MatchDetailComponent } from './match-detail.component';
import { MatchFormComponent } from './match-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatchRoutingModule,
    RouterModule,
    MatchListComponent,
    MatchDetailComponent,
    MatchFormComponent
  ],
})
export class MatchesModule {}
