import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  @ViewChild('Real') private Real: ElementRef = {} as ElementRef;


  ngAfterViewInit(): void {
    let context = this.Real.nativeElement.getContext('2d');
    let maxX = 640;
    let maxY = 400;
    let midX = maxX*0.5;
    let midY = maxY*0.5;
    let e = Math.E;
    let  zoom = 50;
    let step = 0.01;

    // grid
    context.beginPath();   
    context.strokeStyle = "grey";  
    context.moveTo(midX,0);  
    context.lineTo(midX,maxY);
    context.stroke();  
    context.beginPath();   
    context.strokeStyle = "grey";  
    context.moveTo(0,midY);  
    context.lineTo(maxX,midY);
    context.stroke();

    //drawing exponential function 
    for(let i = -3; i < 3; i+=step){
      let r = e ** i;
      let x = i*zoom + midX;
      let y = r*zoom + midY;
      if(y < maxY) {
        context.beginPath();   
        context.strokeStyle = "orange";  
        context.moveTo(x-1,maxY - y);  
        context.lineTo(x,maxY - y);
        context.stroke();  
      }
    }
    
    //drawing tetrational function 
    for(let i = -3; i < 3; i+=step){
      let r = this.tetApprox(i);
      let x = i*zoom + midX;
      let y = r*zoom + midY;
      if(y < maxY) {
        context.beginPath();   
        context.strokeStyle = "blue";  
        context.moveTo(x-1,maxY - y);  
        context.lineTo(x,maxY - y);
        context.stroke();  
      }
    }
  }

  tetApprox(n: number): number {
    let v = 0;
    let e = Math.E;
    v = n >= -3 && n < -2 ? Math.log(Math.log(3+n)) : v;
    v = n >= -2 && n < -1 ? Math.log(2+n) : v;
    v = n >= -1 && n <=0 ? 1+n : v;
    v = n >= 0 && n <=1 ? e**n : v;
    v = n > 1 && n < 2 ? e**e**(n-1) : v;
    v = n > 2 && n < 3 ? e**e**e**(n-2) : v;
    return v;
  }
  
}
