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
    userId: string;
    typedWordCount: number;
    totalWordCount: number;
    isStarted: boolean;
    isCompleted: boolean;
    lastAccessed: Date;
    startedAt?: Date;
    completedAt?: Date;
}

export interface BookWithProgress extends Book {
    progress?: BookProgress;
}
