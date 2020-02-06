import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  providers: [BookService],
})

export class BookDetailComponent  implements OnInit {
  book: object;
  showLoader: boolean = false;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: BookService,
  ) {}

  private fetchData() {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.showLoader = true;
      this.service.getBook(id).subscribe((data) => {
        this.showLoader = false;
        const [items] = data.items;
        this.book = items;
        this.isError = false;
      },
      (err) => {
        console.log(err);
        this.isError = true;
      });
    });
  }

  ngOnInit() {
    this.fetchData();
  }
}
