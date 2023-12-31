import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[appHighlight]",
    standalone: true
})
export class HighlightDirective {
    @Input() color: string = "lightgray";
    @HostBinding("style.backgroundColor") backgroundColor!: string;

    @HostListener("mouseenter") onMouseEnter() {
        this.backgroundColor = this.color;
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.backgroundColor = "";
    }
}