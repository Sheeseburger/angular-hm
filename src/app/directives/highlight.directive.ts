import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight!:string;
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  @HostListener('mouseenter') onMouseEnter(){
    this.highlight(this.appHighlight);
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.highlight(null)
  }
  private highlight(color:string | null): void{
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);

  }
}
