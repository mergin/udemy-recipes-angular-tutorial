import { Directive, OnInit, Input, HostBinding, HostListener } from '@angular/core';

/**
 *  Highlights an element on hover
 */
@Directive({
    selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

    // tslint:disable-next-line:no-inferrable-types
    @Input() defaultColor: string = 'transparent';
    // tslint:disable-next-line:no-inferrable-types
    @Input('appBetterHighlight') highlightColor: string = 'pink';
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor() { }

    ngOnInit() {
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = this.defaultColor;
    }

}
