import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equality',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equality.component.html',
  styleUrl: './equality.component.css'
})
export class EqualityComponent {
  solutions: Array<number> = [];

  e = Math.E;
  end = this.e ** (1/this.e); 

  constructor () {
    let max = 32;
    let N = 3;
    let tolerance = 1e-6;
    let minStep = 1e-9;
    let step = minStep;

    let i = this.end;
    let it = 0;
    do {
      i += step;
      let expR = i**N;
      let tetR = this.tet(i,N);
      let diff = Math.abs((i**N) - this.tet(i,N));
      if (diff < tolerance) {
        this.solutions.push(i);
        ++N;
        step = minStep;
        i = this.end;
      }
      i = tetR > expR ? i - step : i;
      step = tetR < expR ? step * 2 : step;
      step = tetR > expR ? step * 0.5 : step;
      ++it;
    } while (N<max && step > 1e-15 && it < (max*100));
  }

  tet(x: number, n: number): number {
    let h = x;	
    for(let j = 1;j < n; ++j)	{
      h = x ** h;
    } 
    return h;
  }

  predict(base: number): number {
    const C = 3.238990951;
    const lmb = this.end;
	  const d = base - lmb;
	  let predicted = ((1/d)**0.5)*C*((1-d)**0.5)-lmb**0.5;
	  predicted = Math.floor(predicted*1e4)/1e4;
    return predicted;
  }

  diff (x: number, y: number): number {
    return Math.floor( Math.abs(x/y - 1) *1e4 )/100;
  }
}
