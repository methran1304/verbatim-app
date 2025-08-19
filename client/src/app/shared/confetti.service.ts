import { Injectable } from '@angular/core';
import { confetti } from '@tsparticles/confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  triggerConfetti() {
    const end = Date.now() + 2 * 1000;

    // application theme colors
    const colors = ["#FB4D4F", "#4D8CFF", "#5BBD7A", "#E0B04B"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }
}
