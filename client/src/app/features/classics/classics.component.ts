import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
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
        NzToolTipModule
    ],
    templateUrl: './classics.component.html',
    styleUrl: './classics.component.scss'
})
export class ClassicsComponent implements OnInit {
    books: BookWithProgress[] = [];
    totalBooks = 0;
    currentPage = 1;
    pageSize = 10;
    loading = false;

    constructor(
        private bookService: BookService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadBooks();
    }

    loadBooks(): void {
        this.loading = true;
        this.bookService.getBooks(this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                this.books = response.books;
                this.totalBooks = response.total;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading books:', error);
                this.loading = false;
            }
        });
    }

    // onPageChange(page: number): void {
    //     this.currentPage = page;
    //     this.loadBooks();
    // }

    startBook(book: BookWithProgress): void {
        // Navigate to drill engine with book content and marathon type
        this.router.navigate(['/drill'], {
            queryParams: {
                type: 'marathon',
                bookId: book.id,
                source: 'classics'
            }
        });
    }

    resumeBook(book: BookWithProgress): void {
        // Navigate to drill engine with book content and marathon type
        this.router.navigate(['/drill'], {
            queryParams: {
                type: 'marathon',
                bookId: book.id,
                source: 'classics'
            }
        });
    }

    restartBook(book: BookWithProgress): void {
        // Navigate to drill engine with book content and marathon type
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
        if (!book.progress || !book.progress.isStarted) {
            return 0;
        }
        return Math.round((book.progress.typedWordCount / book.totalWordCount) * 100);
    }

    getBookCoverUrl(book: BookWithProgress): string {
        // For now, return a placeholder. In a real app, this would be the actual cover image
        return book.coverImage || `https://via.placeholder.com/150x200/4a90e2/ffffff?text=${encodeURIComponent(book.title.charAt(0))}`;
    }
}
