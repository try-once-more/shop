import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    standalone: true,
    selector: "[appChangeStyle]"
})
export class ChangeStyleDirective {
    @Input() border: string = "1px solid red"

    constructor(private readonly el: ElementRef,
        private readonly renderer: Renderer2) { }

    @HostListener("click") onClick() {
        const currentBorder = this.el?.nativeElement.style.border;
        if (currentBorder) {
            this.renderer?.removeStyle(this.el.nativeElement, "border");
        } else {
            this.renderer?.setStyle(this.el.nativeElement, "border", this.border);
        }
        this.border = currentBorder;
    }

    @HostListener("wheel", ["$event"]) onScroll(event: WheelEvent) {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const currentFontSize = this.getCurrentFontSize();
            const delta = Math.sign(-event.deltaY);

            const newFontSize = currentFontSize + delta * 2;
            this.renderer.setStyle(this.el.nativeElement, "font-size", newFontSize + "px");
        }
    }

    private getCurrentFontSize(): number {
        const computedStyle = getComputedStyle(this.el.nativeElement);
        return parseInt(computedStyle.fontSize, 10);
    }
}
