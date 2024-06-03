import { Component, OnInit } from '@angular/core';
import { Book, LibraryItem } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  addBookToReadingList(book: Book) {
    this.bookService.moveBookToReadingList(book);
  }

  ngOnInit(): void {
    this.bookService.avaliableBooks$.subscribe((books) => (this.books = books));
  }
}
