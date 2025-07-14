import { Component } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';

@Component({
    selector: 'app-drill-stats',
    imports: [],
    templateUrl: './drill-stats.component.html',
    styleUrl: './drill-stats.component.scss',
})
export class DrillStatsComponent {
    data: any[] = [];
    count = 1;

    subscription(subscriber: Subscriber<number>) {
        console.log('an observer has subscribed', subscriber);
        // subscriber.next([1, 2, 3, 4, 5]);

        const interval = setInterval(() => {
            subscriber.next(this.count++);

            if (this.count > 10) {
                subscriber.error('shit!');
                subscriber.complete();
                this.count = 0;
                clearInterval(interval);
            }

        }, 1000);
    }

    observerable = new Observable((s) => {
        this.subscription(s);
    });

    onSubscribe() {
        this.observerable.subscribe({
            next: (data) => {
                this.data.push(data);
                console.log('sub (next): ', data);
            },
            error: (error) => {
                console.log('sub (error): ', error);
            },
            complete: () => {
                console.log('sub (complete)');
            }
        }
        );
    }
}
