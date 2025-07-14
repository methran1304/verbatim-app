import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrillEngineComponent } from './features/drill-engine/drill-engine.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'verbatim.app';
}
