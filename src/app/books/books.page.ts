import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: Observable<any>;
  saga: string;

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.saga = this.activatedRoute.snapshot.paramMap.get('saga');
    this.books = this.booksService.getBooks(this.saga);
  }

}
