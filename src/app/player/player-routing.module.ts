import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerListComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerFormComponent } from './player-form.component';

const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: 'new', component: PlayerFormComponent },
  { path: 'edit/:id', component: PlayerFormComponent },
  { path: ':id', component: PlayerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
