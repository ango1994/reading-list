import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookCardComponent } from '../book-card/book-card.component';
import { ReadingListService } from '../../services/reading-list.service';
import { AvaliableBooksService } from '../../services/avaliable-books.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent implements OnInit {
  readingList: Book[] = [];
  constructor(
    private readingListService: ReadingListService,
    private avaliableBooksService: AvaliableBooksService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.readingListService.readingListBooks$.subscribe((books) => {
      this.readingList = books;
    });
  }

  removeBookFromReadingList(book: Book) {
    this.readingListService.removeBook(book);
    this.avaliableBooksService.addBook(book);
    this.storageService.getItem;
  }
}
