import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Book, BookProgress } from '../models/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = `${environment.apiBaseUrl}/book`;
  
  // subject to notify when progress is updated
  private progressUpdatedSubject = new Subject<void>();
  public progressUpdated$ = this.progressUpdatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, pageSize: number = 10): Observable<{ items: Book[], total: number, page: number, pageSize: number }> {
    return this.http.get<{ items: Book[], total: number, page: number, pageSize: number }>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  getAllBookProgress(): Observable<BookProgress[]> {
    return this.http.get<BookProgress[]>(`${environment.apiBaseUrl}/profile/book-progress`);
  }

  updateBookProgress(bookId: string, completedWords: number, isCompleted: boolean = false): Observable<any> {
    const payload = {
      bookId: bookId,
      completedWords: completedWords,
      isCompleted: isCompleted
    };
    
    return this.http.post(`${environment.apiBaseUrl}/profile/update-book-progress`, payload)
      .pipe(
        map(response => {
          // notify that progress was updated
          this.progressUpdatedSubject.next();
          return response;
        })
      );
  }

  saveBookProgress(bookId: string, completedWords: number, totalWords: number, isCompleted: boolean): Observable<any> {
    return this.updateBookProgress(bookId, completedWords, isCompleted);
  }

  // method to manually trigger progress refresh
  triggerProgressRefresh(): void {
    this.progressUpdatedSubject.next();
  }

  // method to get book by ID
  getBookById(id: string): Observable<Book | null> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching book by ID:', error);
        return of(null);
      })
    );
  }

  // method to start a book (creates initial progress entry)
  startBook(bookId: string, totalWords: number): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiBaseUrl}/profile/start-book`, {
      bookId,
      totalWords
    }).pipe(
      catchError(error => {
        console.error('Error starting book:', error);
        return of(false);
      })
    );
  }

  // method to reset book progress
  resetBook(bookId: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiBaseUrl}/profile/reset-book`, {
      bookId
    }).pipe(
      catchError(error => {
        console.error('Error resetting book:', error);
        return of(false);
      })
    );
  }
}
