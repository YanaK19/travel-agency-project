import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[nav-directive]'
})
export class NavbarDirective{

  constructor(private elementRef: ElementRef){
  }

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {
    console.log("Scroll Event");
  }
}
