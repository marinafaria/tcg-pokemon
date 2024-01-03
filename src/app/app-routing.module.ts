import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./pages/home/home.module')).HomeModule,
  },
  {
    path: 'new',
    loadChildren: async () =>
      (await import('./pages/create-deck/create-deck.module')).CreateDeckModule,
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
