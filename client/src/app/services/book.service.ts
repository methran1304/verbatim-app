import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, BookProgress, BookWithProgress } from '../models/interfaces/book.interface';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private baseUrl = `${environment.apiBaseUrl}/books`;
    
    // Sample books data - in a real app, this would come from an API
    private sampleBooks: Book[] = [
        {
            id: '1',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            totalWordCount: 122189,
            content: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
            genre: 'Romance',
            publishedYear: 1813,
            description: 'A classic romance novel about the relationship between Elizabeth Bennet and Mr. Darcy.'
        },
        {
            id: '2',
            title: '1984',
            author: 'George Orwell',
            totalWordCount: 88742,
            content: 'It was a bright cold day in April, and the clocks were striking thirteen.\n\nWinston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.',
            genre: 'Dystopian',
            publishedYear: 1949,
            description: 'A dystopian social science fiction novel and cautionary tale.'
        },
        {
            id: '3',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            totalWordCount: 47094,
            content: 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since.\n\n"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven\'t had the advantages that you\'ve had."',
            genre: 'Classic',
            publishedYear: 1925,
            description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.'
        },
        {
            id: '4',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            totalWordCount: 100388,
            content: 'When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.\n\nWhen it healed, and Jem\'s fears of never being able to play football were assuaged, he was seldom self-conscious about his injury.',
            genre: 'Classic',
            publishedYear: 1960,
            description: 'A story of racial injustice and the loss of innocence in the American South.'
        },
        {
            id: '5',
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            totalWordCount: 73094,
            content: 'If you really want to hear about it, the first thing you\'ll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap.',
            genre: 'Coming-of-age',
            publishedYear: 1951,
            description: 'A novel about teenage alienation and loss of innocence in post-World War II America.'
        },
        {
            id: '6',
            title: 'Lord of the Flies',
            author: 'William Golding',
            totalWordCount: 59900,
            content: 'The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.\n\nThough he had taken off his school sweater and trailed it now from one hand, his grey shirt stuck to him and his hair was plastered to his forehead with sweat.',
            genre: 'Allegory',
            publishedYear: 1954,
            description: 'A novel about the dark side of human nature and the breakdown of civilization.'
        },
        {
            id: '7',
            title: 'Animal Farm',
            author: 'George Orwell',
            totalWordCount: 29966,
            content: 'Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the pop-holes.\n\nWith the ring of light from his lantern dancing from side to side, he lurched across the yard, kicked off his boots at the back door, drew himself a last glass of beer from the barrel in the scullery, and made his way up to bed.',
            genre: 'Allegory',
            publishedYear: 1945,
            description: 'A satirical allegory of the Russian Revolution and the rise of Stalinism.'
        },
        {
            id: '8',
            title: 'Brave New World',
            author: 'Aldous Huxley',
            totalWordCount: 64000,
            content: 'A squat grey building of only thirty-four stories.\n\nOver the main entrance the words, CENTRAL LONDON HATCHERY AND CONDITIONING CENTRE, and, in a shield, the World State\'s motto, COMMUNITY, IDENTITY, STABILITY.',
            genre: 'Dystopian',
            publishedYear: 1932,
            description: 'A dystopian novel about a futuristic society controlled by technology and conditioning.'
        },
        {
            id: '9',
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            totalWordCount: 95022,
            content: 'In a hole in the ground there lived a hobbit.\n\nNot a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
            genre: 'Fantasy',
            publishedYear: 1937,
            description: 'A fantasy novel about a hobbit\'s journey with thirteen dwarves to reclaim their homeland.'
        },
        {
            id: '10',
            title: 'Fahrenheit 451',
            author: 'Ray Bradbury',
            totalWordCount: 46707,
            content: 'It was a pleasure to burn.\n\nIt was a special pleasure to see things eaten, to see things blackened and changed.',
            genre: 'Dystopian',
            publishedYear: 1953,
            description: 'A dystopian novel about a future society where books are banned and burned.'
        },
        {
            id: '11',
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            totalWordCount: 35000,
            content: 'The boy\'s name was Santiago.\n\nDusk was falling as the boy arrived with his herd at an abandoned church.',
            genre: 'Adventure',
            publishedYear: 1988,
            description: 'A novel about a young Andalusian shepherd who dreams of finding a worldly treasure.'
        },
        {
            id: '12',
            title: 'The Little Prince',
            author: 'Antoine de Saint-Exupéry',
            totalWordCount: 17000,
            content: 'Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest.\n\nIt was a picture of a boa constrictor in the act of swallowing an animal.',
            genre: 'Fable',
            publishedYear: 1943,
            description: 'A poetic tale about a young prince who visits various planets in space.'
        },
        {
            id: '13',
            title: 'The Old Man and the Sea',
            author: 'Ernest Hemingway',
            totalWordCount: 27000,
            content: 'He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish.\n\nIn the first forty days a boy had been with him.',
            genre: 'Adventure',
            publishedYear: 1952,
            description: 'A short novel about an aging Cuban fisherman\'s struggle with a giant marlin.'
        },
        {
            id: '14',
            title: 'The Metamorphosis',
            author: 'Franz Kafka',
            totalWordCount: 22000,
            content: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.\n\nHe lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.',
            genre: 'Absurdist',
            publishedYear: 1915,
            description: 'A novella about a traveling salesman who wakes up one morning as a giant insect.'
        },
        {
            id: '15',
            title: 'The Stranger',
            author: 'Albert Camus',
            totalWordCount: 36000,
            content: 'Maman died today.\n\nOr yesterday maybe, I don\'t know.',
            genre: 'Philosophical',
            publishedYear: 1942,
            description: 'A novel about a French Algerian who is emotionally detached from the world around him.'
        },
        {
            id: '16',
            title: 'The Trial',
            author: 'Franz Kafka',
            totalWordCount: 45000,
            content: 'Someone must have been telling lies about Josef K., for without having done anything wrong he was arrested one fine morning.\n\nHis landlady, Frau Grubach, whose room was opposite his, came in.',
            genre: 'Absurdist',
            publishedYear: 1925,
            description: 'A novel about a man arrested and prosecuted by a remote, inaccessible authority.'
        },
        {
            id: '17',
            title: 'The Plague',
            author: 'Albert Camus',
            totalWordCount: 55000,
            content: 'The unusual events described in this chronicle occurred in 194- at Oran.\n\nEveryone agreed that, considering their somewhat extraordinary character, they were out of place there.',
            genre: 'Philosophical',
            publishedYear: 1947,
            description: 'A novel about a plague sweeping the French Algerian city of Oran.'
        },
        {
            id: '18',
            title: 'The Fall',
            author: 'Albert Camus',
            totalWordCount: 25000,
            content: 'May I, monsieur, offer my services without running the risk of intruding?\n\nI fear you may not be able to make yourself understood by the worthy ape who presides over the establishment.',
            genre: 'Philosophical',
            publishedYear: 1956,
            description: 'A novel about a successful Parisian lawyer who has abandoned his practice.'
        },
        {
            id: '19',
            title: 'The Myth of Sisyphus',
            author: 'Albert Camus',
            totalWordCount: 30000,
            content: 'There is but one truly serious philosophical question, and that is suicide.\n\nJudging whether life is or is not worth living amounts to answering the fundamental question of philosophy.',
            genre: 'Philosophy',
            publishedYear: 1942,
            description: 'A philosophical essay about the absurdity of human existence.'
        },
        {
            id: '20',
            title: 'The Rebel',
            author: 'Albert Camus',
            totalWordCount: 40000,
            content: 'What is a rebel?\n\nA man who says no, but whose refusal does not imply a renunciation.',
            genre: 'Philosophy',
            publishedYear: 1951,
            description: 'A philosophical essay about rebellion and revolution.'
        }
    ];

    constructor(private http: HttpClient) {}

    getBooks(page: number = 1, pageSize: number = 10): Observable<{ books: BookWithProgress[], total: number }> {
        // For now, return sample data. In a real app, this would be an API call
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedBooks = this.sampleBooks.slice(startIndex, endIndex);
        
        // Add mock progress data
        const booksWithProgress = paginatedBooks.map(book => ({
            ...book,
            progress: this.getMockProgress(book.id)
        }));

        return of({
            books: booksWithProgress,
            total: this.sampleBooks.length
        });
    }

    getBookById(id: string): Observable<Book | null> {
        const book = this.sampleBooks.find(b => b.id === id);
        return of(book || null);
    }

    getBookProgress(bookId: string): Observable<BookProgress | null> {
        return of(this.getMockProgress(bookId));
    }

    updateBookProgress(progress: BookProgress): Observable<BookProgress> {
        // Save to the backend
        return this.http.post<BookProgress>(`${this.baseUrl}/progress`, progress);
    }

    saveBookProgress(bookId: string, typedWordCount: number, totalWordCount: number, isCompleted: boolean = false): Observable<BookProgress> {
        const progress: BookProgress = {
            bookId,
            userId: 'current-user', // In a real app, get from auth service
            typedWordCount,
            totalWordCount,
            isStarted: true,
            isCompleted,
            lastAccessed: new Date(),
            startedAt: new Date(), // In a real app, get from existing progress
            completedAt: isCompleted ? new Date() : undefined
        };
        
        return this.updateBookProgress(progress);
    }

    private getMockProgress(bookId: string): BookProgress {
        const randomProgress = Math.random();
        return {
            bookId,
            userId: 'current-user',
            typedWordCount: Math.floor(randomProgress * 1000),
            totalWordCount: 1000,
            isStarted: randomProgress > 0.3,
            isCompleted: randomProgress > 0.8,
            lastAccessed: new Date(),
            startedAt: randomProgress > 0.3 ? new Date(Date.now() - Math.random() * 86400000) : undefined,
            completedAt: randomProgress > 0.8 ? new Date() : undefined
        };
    }


}
