export interface Book {
    id: string;
    title: string;
    author: string;
    coverImage?: string;
    totalWordCount: number;
    content: string;
    genre?: string;
    publishedYear?: number;
    description?: string;
}

export interface BookProgress {
    bookId: string;
    completedWords: number;
    totalWords: number;
    isCompleted: boolean;
}

export interface BookWithProgress extends Book {
    progress?: BookProgress;
}
