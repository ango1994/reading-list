import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, LibraryRespone } from '../interfaces/book';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url = 'assets/books.json';
  private bookTransfer = new Subject<Book>();
  bookTransfer$ = this.bookTransfer.asObservable();

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<LibraryRespone> {
    return this.http.get<LibraryRespone>(this.url);
  }

  addBookToReadingList(book: Book) {
    this.bookTransfer.next(book);
  }
}
