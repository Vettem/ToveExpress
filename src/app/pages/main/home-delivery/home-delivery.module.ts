import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDeliveryPageRoutingModule } from './home-delivery-routing.module';

import { HomeDeliveryPage } from './home-delivery.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDeliveryPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeDeliveryPage]
})
export class HomeDeliveryPageModule {}
