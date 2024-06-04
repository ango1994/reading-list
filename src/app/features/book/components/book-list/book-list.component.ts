import { Component, OnInit } from '@angular/core';
import { Book, LibraryItem } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { AvaliableBooksService } from '../../services/avaliable-books.service';
import { ReadingListService } from '../../services/reading-list.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private avaliableBooksService: AvaliableBooksService,
    private readingListService: ReadingListService
  ) {}

  addBookToReadingList(book: Book): void {
    this.avaliableBooksService.removeBook(book);
    this.readingListService.addBook(book);
  }

  ngOnInit(): void {
    this.avaliableBooksService.avaliableBooks$.subscribe(
      (books) => (this.books = books)
    );
  }
}
