import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './features/book/components/book-list/book-list.component';
import { ReadingListComponent } from './features/book/components/reading-list/reading-list.component';
import { BookService } from './features/book/services/book.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookListComponent, ReadingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'library';

  constructor(private bookService: BookService) {}

  filterBooks(event: Event) {
    const optionValue = (event.target as HTMLSelectElement).value;
    console.log(optionValue);
    this.bookService.filterByGenre(optionValue);
  }
}
