import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AnimationController } from '@ionic/angular';
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
    private animationCtrl: AnimationController,
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
}
