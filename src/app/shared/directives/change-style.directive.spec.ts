import { TestBed, ComponentFixtureAutoDetect } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ChangeStyleDirective } from "./change-style.directive";

@Component({
    template: `
    <div appChangeStyle [border]="borderValue" #targetElement>Sample Element</div>
  `
})
class TestComponent { }

describe("ChangeStyleDirective", () => {
    let targetElement: DebugElement;
    let directive: ChangeStyleDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ChangeStyleDirective],
            declarations: [TestComponent],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        const fixture = TestBed.createComponent(TestComponent);
        targetElement = fixture.debugElement.query(By.css("[appChangeStyle]"));
        directive = targetElement.injector.get(ChangeStyleDirective);
    });

    it("should create an instance", () => {
        expect(directive).toBeTruthy();
    });

    it("should toggle border on Ctrl+click", () => {
        const initialBorder = targetElement.nativeElement.style.border;

        targetElement.triggerEventHandler("click", { ctrlKey: true });
        expect(targetElement.nativeElement.style.border).toBeFalsy();

        targetElement.triggerEventHandler("click", { ctrlKey: true });
        expect(targetElement.nativeElement.style.border).toBe(initialBorder);
    });

    it("should change font size on Ctrl+scroll", () => {
        const initialFontSize = parseInt(getComputedStyle(targetElement.nativeElement).fontSize, 10);

        targetElement.triggerEventHandler("wheel", { deltaMode: 0, deltaY: -1, ctrlKey: true, preventDefault: () => { } });
        const newFontSize = parseInt(getComputedStyle(targetElement.nativeElement).fontSize, 10);
        expect(newFontSize).toBe(initialFontSize + 2);

        targetElement.triggerEventHandler("wheel", { deltaMode: 0, deltaY: 1, ctrlKey: true, preventDefault: () => { } });
        const restoredFontSize = parseInt(getComputedStyle(targetElement.nativeElement).fontSize, 10);
        expect(restoredFontSize).toBe(initialFontSize);
    });

    it("should not change font size on scroll without Ctrl", () => {
        const initialFontSize = parseInt(getComputedStyle(targetElement.nativeElement).fontSize, 10);

        targetElement.triggerEventHandler("wheel", { deltaMode: 0, deltaY: -1, ctrlKey: false });
        const newFontSize = parseInt(getComputedStyle(targetElement.nativeElement).fontSize, 10);
        expect(newFontSize).toBe(initialFontSize);
    });
});
