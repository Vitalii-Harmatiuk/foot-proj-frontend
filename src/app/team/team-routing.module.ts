import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamFormComponent } from './team-form.component';

const routes: Routes = [
  { path: '', component: TeamListComponent },
  { path: 'new', component: TeamFormComponent },
  { path: 'edit/:id', component: TeamFormComponent },
  { path: ':id', component: TeamDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
