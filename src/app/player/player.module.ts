import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayersRoutingModule } from './player-routing.module';

import { PlayerListComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerFormComponent } from './player-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    PlayersRoutingModule,
    RouterModule,
    PlayerListComponent,
    PlayerDetailComponent,
    PlayerFormComponent
  ],
})
export class PlayersModule {}
