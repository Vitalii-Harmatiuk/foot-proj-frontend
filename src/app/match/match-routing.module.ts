import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchListComponent } from './match.component';
import { MatchDetailComponent } from './match-detail.component';
import { MatchFormComponent } from './match-form.component';
const routes: Routes = [
  { path: '', component: MatchListComponent },
  { path: 'new', component: MatchFormComponent },
  { path: 'edit/:id', component: MatchFormComponent },
  { path: ':id', component: MatchDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
