import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./pages/home/home.module')).HomeModule,
  },
  {
    path: 'deck-maker',
    loadChildren: async () =>
      (await import('./pages/deck-maker/deck-maker.module')).DeckMakerModule,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
