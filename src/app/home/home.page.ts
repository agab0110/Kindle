import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit { 
  books: Observable<any>;
  title: string;

  constructor(
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.books = this.booksService.getBooks();
  }

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });

    await loading.dismiss();
  }

  async deleteAccount() {
    const loading = await this.loadingController.create();
    await loading.present();

    const deletedUser = this.authService.delete();

    await loading.dismiss();

    if(deletedUser) {
      this.authService.showAlert("Successo", "Utente eliminato con successo");
      this.router.navigateByUrl('/', { replaceUrl: true });
    } else {
      this.authService.showAlert("Errore", "Errore nell'eliminazione");
    }
  }
  
}
