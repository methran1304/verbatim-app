import { Component, AfterViewInit, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VirtualKeyboardComponent implements AfterViewInit, OnChanges {
  @ViewChild('keyboardContainer', { static: true }) keyboardContainer!: ElementRef;
  @Input() inputValue: string = '';
  @Input() isDarkTheme: boolean = false;
  keyboard!: Keyboard;
  isShiftPressed: boolean = false;

  highlightKeyBgLight = '#282640';
  highlightKeyTextLight = '#F4F0F0';

  highlightKeyBgDark = '#9F9999';
  highlightKeyTextDark = '#2D2E2E';

  layout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{space}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{space}"
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDarkTheme'] && this.keyboard) {
      this.updateKeyboardTheme();
    }
  }

  ngAfterViewInit(): void {
    this.keyboard = new Keyboard(this.keyboardContainer.nativeElement, {
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightBgColor: this.highlightKeyBgLight,
      physicalKeyboardHighlightTextColor: this.highlightKeyTextLight,
      layout: this.layout,
      theme: 'hg-theme-default hg-layout-default verbatim-kb',
      buttonTheme: [
        { class: 'green alphabet', buttons: '` 1 ~ ! q a z Q A Z p P 0 ) - _ = + { [ } ] \\ | ; : \' " ? /' },
        { class: 'dark-green alphabet', buttons: '2 @ w s x W S X 9 ( o l O L > .' },
        { class: 'yellow alphabet', buttons: '3 # e d c E D C 8 * i k I K < ,' },
        { class: 'blue alphabet', buttons: '4 5 $ % r t f g v b R T F G V B' },
        { class: 'pink alphabet', buttons: '6 7 ^ & y u h j n m Y U H J N M' },
        { class: 'greeen alphabet', buttons: '0 p ; / - = [ ] \' ' },
        // modifier
        { class: 'mod bksp', buttons: '{backspace}' },
        { class: 'mod tab', buttons: '{tab}' },
        { class: 'mod caps-enter', buttons: '{lock} {enter}' },
        { class: 'mod shift', buttons: '{shift}' },
        { class: 'space-bar', buttons: '{space}' },
        { class: 'backtick', buttons: '\\ |' }
      ],
      onKeyPress: (button: string) => {
        this.handleKeyPress(button);
      },
    });

    this.updateKeyboardTheme();

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private updateKeyboardTheme(): void {
    if (!this.keyboard) return;
    const container = this.keyboardContainer.nativeElement;
    if (this.isDarkTheme) {
      this.keyboard.setOptions({
        physicalKeyboardHighlightBgColor: this.highlightKeyBgDark,
        physicalKeyboardHighlightTextColor: this.highlightKeyTextDark,
      });
      container.classList.add('dark');
      container.classList.remove('light');
    } else {
      this.keyboard.setOptions({
        physicalKeyboardHighlightBgColor: this.highlightKeyBgLight,
        physicalKeyboardHighlightTextColor: this.highlightKeyTextLight,
      });
      container.classList.add('light');
      container.classList.remove('dark');
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Shift' && !this.isShiftPressed) {
      this.isShiftPressed = true;
      this.keyboard.setOptions({
        layoutName: 'shift'
      });
      this.updateKeyboardTheme();
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Shift' && this.isShiftPressed) {
      this.isShiftPressed = false;
      this.keyboard.setOptions({
        layoutName: 'default'
      });
      this.updateKeyboardTheme();
    }
  }

  private handleKeyPress(button: string): void {
    // handle shift key press from virtual keyboard
    if (button === '{shift}') {
      this.isShiftPressed = !this.isShiftPressed;
      this.keyboard.setOptions({
        layoutName: this.isShiftPressed ? 'shift' : 'default'
      });
      this.updateKeyboardTheme();
    }
  }
} 