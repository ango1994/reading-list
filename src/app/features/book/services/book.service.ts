import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, LibraryRespone } from '../interfaces/book';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

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

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<LibraryRespone> {
    return this.http.get<LibraryRespone>(this.url);
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
}
