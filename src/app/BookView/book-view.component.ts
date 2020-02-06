import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  providers: [BookService],
})

export class BookViewComponent implements OnInit {
  books: any = [];
  initBooks: any = [];
  sortState: string = '';
  filterState: string = '';
  showLoader: boolean = false;
  isError: boolean = false;

  constructor(private service: BookService) { }

  private fetchData() {
    this.showLoader = true;
    this.service.getBooks(40, 'Stephen King').subscribe((data) => {
      this.showLoader = false;
      this.books = data.items;
      this.initBooks = JSON.parse(JSON.stringify(data.items));
      this.isError = false;
    },
    (err) => {
      console.log(err);
      this.isError = true;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  private doSort(value) {
    switch (value) {
      case 'name-asc':
        this.books.sort((a, b) => {
          const textA = a.volumeInfo.title.toLowerCase();
          const textB = b.volumeInfo.title.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        break;

      case 'name-des':
        this.books.sort((a, b) => {
          const textA = a.volumeInfo.title.toLowerCase();
          const textB = b.volumeInfo.title.toLowerCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
        break;

      case 'price-asc':
        this.books.sort((a, b) => {
          const textA = (a.saleInfo.saleability !== 'NOT_FOR_SALE')
                          ?
                        +a.saleInfo.retailPrice.amount
                          :
                        0;
          const textB = (b.saleInfo.saleability !== 'NOT_FOR_SALE')
                          ?
                        +b.saleInfo.retailPrice.amount
                          :
                        0;
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        break;

      case 'price-des':
        this.books.sort((a, b) => {
          const textA = (a.saleInfo.saleability !== 'NOT_FOR_SALE')
                          ?
                        +a.saleInfo.retailPrice.amount
                          :
                        0;
          const textB = (b.saleInfo.saleability !== 'NOT_FOR_SALE')
                          ?
                        +b.saleInfo.retailPrice.amount
                          :
                        0;
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
        break;

      default:
        this.books = this.initBooks;
        break;
    }

    if (this.filterState && !this.sortState) {
      this.doFilter(this.filterState);
    }
  }

  private doFilter(value) {
    if (!value) {
      this.books = this.initBooks;
      if (this.sortState) {
        this.doSort(this.sortState);
      }
    } else {
      this.books = this.initBooks.filter((book) => {
        return book.volumeInfo.title.toLowerCase().search(value) !== -1;
      });
      if (this.sortState) {
        this.doSort(this.sortState);
      }
    }
  }

  handlerSort(event) {
    const value = event.target.value;
    this.sortState = value;
    this.doSort(value);
  }

  handlerFilter(event) {
    const value = event.target.value.toLowerCase();
    this.filterState = value;
    this.doFilter(value);
  }
}
