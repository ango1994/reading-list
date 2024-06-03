import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, LibraryRespone } from '../interfaces/book';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url = 'assets/books.json';

  private avaliableBooks = new BehaviorSubject<Book[]>([]);
  avaliableBooks$ = this.avaliableBooks.asObservable();

  private readingListBooks = new BehaviorSubject<Book[]>([]);
  readingListBooks$ = this.readingListBooks.asObservable();

  private localReadingList = 'readingList';

  constructor(private readonly http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks() {
    this.getBooks().subscribe((response) => {
      const books = response.library.map((item) => item.book);

      const { libraryBooks, booksInLocalStorage } =
        this.filterBooksByReadingList(books);

      this.avaliableBooks.next(libraryBooks);
      this.readingListBooks.next(booksInLocalStorage);
    });
  }

  private getBooks(): Observable<LibraryRespone> {
    return this.http.get<LibraryRespone>(this.url);
  }

  //TODO: Review this filter
  private filterBooksByReadingList(books: Book[]) {
    const localStorageData = localStorage.getItem(this.localReadingList);
    const booksInLocalStorage = localStorageData
      ? JSON.parse(localStorageData)
      : [];

    const libraryBooks = books.filter(
      (item) =>
        !booksInLocalStorage.some((book: Book) => book.ISBN === item.ISBN)
    );

    return { libraryBooks, booksInLocalStorage };
  }

  moveBookToReadingList(book: Book) {
    const updatedAvailableBooks = this.avaliableBooks.value.filter(
      (item) => item.ISBN !== book.ISBN
    );

    this.avaliableBooks.next(updatedAvailableBooks);

    const localStorageData = localStorage.getItem(this.localReadingList);
    const booksInLocalStorage = localStorageData
      ? JSON.parse(localStorageData)
      : [];

    booksInLocalStorage.push(book);

    localStorage.setItem(
      this.localReadingList,
      JSON.stringify(booksInLocalStorage)
    );

    this.readingListBooks.next(booksInLocalStorage);
  }

  moveBookToAvaliable(book: Book) {
    const booksAvaliable = this.avaliableBooks.value;
    booksAvaliable.push(book);
    this.avaliableBooks.next(booksAvaliable);
    const booksInReadingList = this.readingListBooks.value.filter(
      (item) => item.ISBN != book.ISBN
    );
    this.readingListBooks.next(booksInReadingList);
    localStorage.setItem(
      this.localReadingList,
      JSON.stringify(booksInReadingList)
    );
  }

  //TODO: Review how to filter by genre
  filterByGenre(genre: string) {
    this.getBooks().subscribe((response) => {
      const books = response.library.map((item) => item.book);
      const { libraryBooks, booksInLocalStorage } =
        this.filterBooksByReadingList(books);
      if (!genre) {
        return this.avaliableBooks.next(libraryBooks);
      }

      const filteredBooks = libraryBooks.filter((book) => {
        return book.genre == genre;
      });
      this.avaliableBooks.next(filteredBooks);
    });
  }
}
