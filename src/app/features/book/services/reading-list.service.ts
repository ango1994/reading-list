import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ReadingListService {
  private readingListBooks = new BehaviorSubject<Book[]>([]);
  readingListBooks$ = this.readingListBooks.asObservable();

  private localReadingList = 'readingList';

  constructor(private storageService: StorageService) {
    this.loadReadingList();
  }

  private loadReadingList() {
    const readingList =
      this.storageService.getItem(this.localReadingList) ?? [];
    this.readingListBooks.next(readingList);
  }

  addBook(book: Book) {
    const books = this.readingListBooks.value;
    books.push(book);
    this.readingListBooks.next(books);
    this.storageService.setItem(this.localReadingList, books);
  }

  removeBook(book: Book) {
    const books = this.readingListBooks.value;
    const index = books.findIndex((item) => item.ISBN === book.ISBN);
    books.splice(index, 1);
    this.readingListBooks.next(books);
    this.storageService.setItem(this.localReadingList, books);
  }
}
