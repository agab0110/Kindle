import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import PSPDFKit from 'pspdfkit';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {}

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });

    await loading.dismiss();
  }

  async openPdf(documentUrl: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    PSPDFKit.load({
      document: documentUrl,
      container: ''
    });

    await loading.dismiss();
  }

  async deleteAccount() {
    const loading = await this.loadingController.create();
    await loading.present();

    const deletedUser = this.authService.delete();

    await loading.dismiss();

    if(deletedUser) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      this.authService.showAlert("Successo", "Utente eliminato con successo");
    } else {
      this.authService.showAlert("Errore", "Errore nell'eliminazione");
    }
  }

}
