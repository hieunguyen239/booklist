import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookViewComponent } from './BookView/book-view.component';
import { BookDetailComponent } from './BookDetail/book-detail.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';

const appRoutes: Routes = [
  // { path: '', component: BookViewComponent },
  { path: 'books', component: BookViewComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BookViewComponent,
    BookDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
