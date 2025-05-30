import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'players',
    loadChildren: () =>
      import('./player/player.module').then((m) => m.PlayersModule),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./team/team.module').then((m) => m.TeamsModule),
  },
  {
    path: 'matches',
    loadChildren: () =>
      import('./match/match.module').then((m) => m.MatchesModule),
  },
  { path: '**', redirectTo: '' },
];
export class AppRoutingModule {}