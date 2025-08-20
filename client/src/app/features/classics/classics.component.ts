import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { BookWithProgress } from '../../models/interfaces/book.interface';

@Component({
  selector: 'app-classics',
  standalone: true,
  imports: [
        CommonModule,
        NzCardModule,
        NzButtonModule,
        NzIconModule,
        NzProgressModule,
        NzTagModule,
        NzToolTipModule,
        NzPaginationModule
    ],
    templateUrl: './classics.component.html',
    styleUrl: './classics.component.scss'
})
export class ClassicsComponent implements OnInit, OnDestroy {
    books: BookWithProgress[] = [];
    totalBooks = 0;
    currentPage = 1;
    pageSize = 12;
    loading = false;
    private progressSubscription: Subscription | undefined;

    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loadBooks();
        
        // listen for progress updates from the book service
        this.progressSubscription = this.bookService.progressUpdated$.subscribe(() => {
            // refresh progress data when progress is updated
            this.refreshProgressData();
        });

        // also listen for route activation as a backup
        this.route.data.subscribe(() => {
            // refresh progress when route becomes active
            setTimeout(() => {
                this.refreshProgressData();
            }, 100);
        });
    }

    ngOnDestroy(): void {
        this.progressSubscription?.unsubscribe();
    }

    loadBooks(): void {
        this.loading = true;
        
        // fetch books and progress in parallel
        forkJoin({
            books: this.bookService.getBooks(this.currentPage, this.pageSize),
            progress: this.bookService.getAllBookProgress()
        }).subscribe({
            next: (result) => {
                // merge books with their progress data
                this.books = result.books.items.map((book: any) => {
                    const bookProgress = result.progress.find((p: any) => p.bookId === book.id);
                    
                    const defaultProgress = {
                        bookId: book.id,
                        totalWords: book.totalWordCount,
                        isCompleted: false,
                        completedWords: 0
                    };
                    
                    return {
                        ...book,
                        progress: bookProgress || defaultProgress
                    };
                });
                
                this.totalBooks = result.books.total;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading books or progress:', error);
                this.loading = false;
            }
        });
    }

    // method to refresh only the progress data (keeps existing books)
    refreshProgressData(): void {
        if (this.books.length === 0) return;
        
        this.bookService.getAllBookProgress().subscribe({
            next: (progressList) => {
                // update existing books with fresh progress data
                this.books = this.books.map((book: any) => {
                    const bookProgress = progressList.find((p: any) => p.bookId === book.id);
                    return {
                        ...book,
                        progress: bookProgress || undefined
                    };
                });
                console.log('Progress data refreshed');
            },
            error: (error) => {
                console.error('Error refreshing progress data:', error);
            }
        });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadBooks();
    }

    startBook(book: BookWithProgress): void {
        // navigate to drill engine with book content and marathon type
        this.router.navigate(['/drill'], {
            queryParams: {
                type: 'marathon',
                bookId: book.id,
                source: 'classics'
            }
        });
    }

    resumeBook(book: BookWithProgress): void {
        // navigate to drill engine with book content and marathon type
        this.router.navigate(['/drill'], {
            queryParams: {
                type: 'marathon',
                bookId: book.id,
                source: 'classics'
            }
        });
    }

    restartBook(book: BookWithProgress): void {
        // navigate to drill engine with book content and marathon type
        this.router.navigate(['/drill'], {
            queryParams: {
                type: 'marathon',
                bookId: book.id,
                source: 'classics',
                restart: 'true'
            }
        });
    }

    getProgressPercentage(book: BookWithProgress): number {
        // if no progress exists (book hasn't been started), return 0%
        if (!book.progress) {
            return 0;
        }
        
        // calculate percentage based on completed words vs total words
        return Math.round((book.progress.completedWords / book.progress.totalWords) * 100);
    }

    getCompletedBooksCount(): number {
        return this.books.filter(book => book.progress?.isCompleted).length;
    }

    getInProgressBooksCount(): number {
        return this.books.filter(book => 
            book.progress && 
            !book.progress.isCompleted && 
            book.progress.completedWords > 0
        ).length;
    }

    getBookCoverUrl(book: BookWithProgress): string {
        // if book has a cover image from the database, use it
        if (book.coverImage && book.coverImage.startsWith('data:image/')) {
            return book.coverImage;
        }
        
        // fallback to placeholder with book title initial
        return `https://via.placeholder.com/150x200/4a90e2/ffffff?text=${encodeURIComponent(book.title.charAt(0))}`;
    }

    // manual refresh method that can be called from other components
    refreshProgress(): void {
        this.refreshProgressData();
    }
}
