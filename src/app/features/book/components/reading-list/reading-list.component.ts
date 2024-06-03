import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent implements OnInit {
  readingList: Book[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.bookTransfer$.subscribe((book) =>
      this.readingList.push(book)
    );
  }
}
