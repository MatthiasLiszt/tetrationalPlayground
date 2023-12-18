import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-extension',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extension.component.html',
  styleUrl: './extension.component.css'
})
export class ExtensionComponent {
  e = Math.E;
  lmb = this.e**(1/this.e);
  bases = [1.5,1.49,1.48,1.47,1.46,1.45];
  nearE = [2.718, 2.618, 2.518, 2.418, 2.318];

  quadProx(base: number, h: number): number {
    let lB = Math.log(base);	  
    let part1 = (2 * lB / (1 + lB)) * (h-1);
    let part2 = ((1-lB)/(1+lB)) * (h-1) * (h-1);
    return base ** (1 + part1 - part2);	  
  }

  getLinear(base: number): number {
    let guess = 2;
    let step = 1;
    let diff = 2;
    let it = 0;
    let tolerance = 1e-3;
    do {
      let t = this.linTet(base, guess -1);
      diff = Math.abs(t - guess);
      guess = t < guess ? guess + step : guess;
      guess = t > guess ? guess - step : guess;
      step = t > guess ? step * 0.5 : step;
      ++it; 
    } while (diff > tolerance && it < 100);
    return guess;
  }
  
  getQuad(base: number): number {
    let guess = 2;
    let step = 1;
    let diff = 2;
    let it = 0;
    let tolerance = 1e-3;
    do {
      let t = this.quadTet(base, guess -1);
      diff = Math.abs(t - guess);
      guess = t < guess ? guess + step : guess;
      guess = t > guess ? guess - step : guess;
      step = t > guess ? step * 0.5 : step;
      ++it; 
    } while (diff > tolerance && it < 100);      
    return guess;
  }
  
  linTet(base: number, h: number) {
    const int = Math.floor(h);
    const fract = h%int;
    let c = base ** fract;
    let value = 0;
    for (let i = 0;i < int; ++i) {
      value = base ** c;
      c = value;
    } 
    return value;
  }
  
  quadTet(base: number, h: number): number {
    const int = Math.floor(h);
    const fract = h%int;
    let c = this.quadProx(base, fract);
    let value = 0;
    for (let i = 0;i < int; ++i) {
      value = base ** c;
      c = value;
    } 
    return value;
  }

  predict(base: number): number {
    const C = 3.238990951;
    const d = base - this.lmb;
    return ((1/d)**0.5)*C*((1-d)**0.5)-this.lmb**0.5;
  }

  round(x: number): number {
    return Math.floor(x * 1e4) / 1e4;
  }

  getHighLinear(base: number): number {
    let guess = 2;
    let step = 0.1;
    let diff = 2;
    let it = 0;
    let tolerance = 1e-9;
    do {
      let t = base ** (guess - 1);
      diff = Math.abs(t - guess);
      guess = t > guess ? guess - step : guess;
      step = t < guess ? step * 0.5 : step;
      guess = t < guess ? guess + 2 * step : guess;
      step = guess <= 1 ? step * 0.5 : step;
      guess = guess <= 1 ? guess + step : guess;
      ++it; 
    } while (diff > tolerance && it < 1e2); 
    console.log(`iterations ${it} step ${step}`);     
    return guess;
  }
  
  getHighQuad(base: number): number {
    let guess = 2;
    let step = 0.05;
    let diff = 2;
    let it = 0;
    let tolerance = 1e-9;
    do {
      let t = this.quadProx(base, guess - 1);
      diff = Math.abs(t - guess);
      guess = t > guess ? guess - step : guess;
      step = t < guess ? step * 0.5 : step;
      guess = t < guess ? guess + 2 * step : guess;
      step = guess <= 1 ? step * 0.5 : step;
      guess = guess <= 1 ? guess + step : guess;
      ++it; 
    } while (diff > tolerance && it < 100);      
    return guess;
  }
}
