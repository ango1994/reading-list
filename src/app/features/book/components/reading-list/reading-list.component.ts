import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent implements OnInit {
  readingList: Book[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.readingListBooks$.subscribe(
      (books) => (this.readingList = books)
    );
  }

  removeBook(book: Book) {
    this.bookService.moveBookToAvaliable(book);
  }
}
