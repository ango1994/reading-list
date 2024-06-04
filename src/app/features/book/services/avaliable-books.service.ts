import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book';
import { BookService } from './book.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AvaliableBooksService {
  private avaliableBooks = new BehaviorSubject<Book[]>([]);
  avaliableBooks$ = this.avaliableBooks.asObservable();

  private localReadingList = 'readingList';

  constructor(
    private readonly bookService: BookService,
    private readonly storageService: StorageService
  ) {
    this.loadAvaliableBooks();
  }

  private loadAvaliableBooks() {
    this.bookService.getBooks().subscribe((response) => {
      const books = response.library.map((item) => item.book);
      const filteredBooks = this.filterByReadingList(books);
      this.avaliableBooks.next(filteredBooks);
    });
  }

  addBook(book: Book) {
    const books = this.avaliableBooks.value;
    books.push(book);
    this.avaliableBooks.next(books);
  }

  removeBook(book: Book) {
    const books = this.avaliableBooks.value;
    const index = books.findIndex((item) => item.ISBN === book.ISBN);
    books.splice(index, 1);
    this.avaliableBooks.next(books);
  }

  private filterByReadingList(books: Book[]) {
    const localBooks = this.storageService.getItem(this.localReadingList);
    return books.filter(
      (item) => !localBooks.some((book: Book) => book.ISBN === item.ISBN)
    );
  }

  filterByGenre(genre: string) {
    this.bookService.getBooks().subscribe((response) => {
      const books = response.library.map((item) => item.book);
      const avaliableBooks = this.filterByReadingList(books);
      if (!genre) {
        return this.avaliableBooks.next(avaliableBooks);
      }

      const filteredBooks = avaliableBooks.filter((book) => {
        return book.genre == genre;
      });
      this.avaliableBooks.next(filteredBooks);
    });
  }
}
