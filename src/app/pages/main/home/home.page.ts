import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateShipmentComponent } from 'src/app/shared/components/add-update-shipment/add-update-shipment.component';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  
  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  getProfits() {
    return this.products.reduce((index, product) => index + 3500 * product.weight, 0);
  }

  //OBTENER PRODUCTOS
  getProducts() {
    let path = `users/${this.user().uid}/products`;

    this.loading = true;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        this.loading = false;
        sub.unsubscribe();
      }
    })
  }

  //AGREGAR O ACTUALIZAR ENVIO
  async addUpdateShipment(product?: Product) {
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateShipmentComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })

    if (success) this.getProducts();
  }

  //CONFIRMAR ELIMINACION PRODUCTO
  async confirmDeleteProduct(product: Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Envio',
      message: '¿Quieres cancelar tu envio?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });
  }

  // =====ELIMINAR=====
  async deleteProduct(product: Product) {
    let path = `users/${this.user().uid}/products/${product.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(product.image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products = this.products.filter(p => p.id !== product.id);

      this.utilsSvc.presentToast({
        message: 'Envio cancelado exitosamente',
        duration: 1500,
        color: 'success', position: 'middle',
        icon: 'checkmark-circle-outline'
      });

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Envío eliminado',
            body: 'Su envío ha sido eliminado correctamente. Pronto será contactado para la devolución del paquete.',
          },
        ],
      });

    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary', position: 'middle',
        icon: 'alert-circle-outline'
      })
    }).finally(() => {
      loading.dismiss();
    })
  }

}
