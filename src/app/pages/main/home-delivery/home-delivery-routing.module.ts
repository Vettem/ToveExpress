import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDeliveryPage } from './home-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDeliveryPageRoutingModule {}
