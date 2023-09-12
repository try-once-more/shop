/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ChangeStyleDirective } from "./change-style.directive";
import { Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
    template: '<div appChangeStyle>Click me to change style</div>'
})
class TestComponent { }

describe("Directive: ChangeStyle", () => {
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangeStyleDirective, TestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        element = fixture.nativeElement.querySelector('div');
        renderer = TestBed.inject(Renderer2);
        fixture.detectChanges();
    }));

    it('should create an instance', () => {
        const directive = new ChangeStyleDirective(new ElementRef(element), renderer);
        expect(directive).toBeTruthy();
    });
});
